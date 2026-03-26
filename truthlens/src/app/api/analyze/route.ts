import Groq from 'groq-sdk';
import { agents } from '@/lib/agents';
import { AgentResult, CredibilityReport } from '@/lib/types';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = 'llama-3.3-70b-versatile';

const FALLBACK_REPORT: CredibilityReport = {
  score: 50,
  verdict: 'Analysis could not be completed due to a processing error.',
  likelyFalse: [],
  misleading: [],
  unverified: [{ issue: 'Full analysis unavailable', explanation: 'The synthesis step failed. Please try again.' }],
  appearsCredible: [],
};

function encode(obj: unknown): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(obj)}\n\n`);
}

async function chat(system: string, user: string, maxTokens = 800): Promise<string> {
  const response = await groq.chat.completions.create({
    model: MODEL,
    max_tokens: maxTokens,
    messages: [
      { role: 'system', content: system },
      { role: 'user',   content: user   },
    ],
  });
  return response.choices[0]?.message?.content ?? '';
}

export async function POST(req: Request) {
  let content: string;

  try {
    const body = await req.json();
    content = body?.content;
    if (!content || typeof content !== 'string') {
      return Response.json({ error: 'content is required' }, { status: 400 });
    }
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // ── Stage 1: Staggered parallel agents (200ms apart) to avoid rate limits ─
        const agentPromises = agents.map(async (agent, idx) => {
          // Small stagger so all 4 don't hit Groq at the exact same millisecond
          await new Promise((r) => setTimeout(r, idx * 200));

          const critique = await chat(
            agent.systemPrompt,
            `Attack the credibility of this content mercilessly: ${content}`
          );

          const result: AgentResult = {
            agentKey: agent.key,
            name: agent.name,
            emoji: agent.emoji,
            color: agent.color,
            tailwindBorder: agent.tailwindBorder,
            tailwindText: agent.tailwindText,
            critique,
            status: 'done',
          };

          controller.enqueue(encode({ type: 'agent', data: result }));
          return result;
        });

        const agentResults = await Promise.all(agentPromises);


        // ── Stage 2: Debate ───────────────────────────────────────────────────
        const combinedCritiques = agentResults
          .map((r) => `### ${r.name}\n${r.critique}`)
          .join('\n\n');

        const debate = await chat(
          `You are a senior editor watching 4 critics attack a piece of content. Read all their critiques carefully and provide:
1. The single most damning finding and why it is the most dangerous
2. Two critiques that COMBINE to reveal a bigger deception pattern
3. One critical credibility issue ALL agents missed
Be specific. Reference exact claims from the content.`,
          combinedCritiques
        );

        controller.enqueue(encode({ type: 'debate', data: debate }));

        // ── Stage 3: Synthesis → JSON ─────────────────────────────────────────
        const synthesisRaw = await chat(
          `You are producing a final credibility verdict. Based on all agent critiques and the debate, return ONLY a JSON object. No markdown. No explanation. No backticks. Pure JSON only.`,
          `Original content:\n${content}\n\nAgent critiques:\n${combinedCritiques}\n\nDebate:\n${debate}\n\nReturn a JSON object with exactly these keys:
{
  "score": <integer 0-100, where 0=completely fabricated and 100=fully credible>,
  "verdict": "<one sentence overall verdict>",
  "likelyFalse": [{"issue": "<short title>", "explanation": "<1-2 sentence explanation>"}],
  "misleading": [{"issue": "<short title>", "explanation": "<1-2 sentence explanation>"}],
  "unverified": [{"issue": "<short title>", "explanation": "<1-2 sentence explanation>"}],
  "appearsCredible": [{"issue": "<short title>", "explanation": "<1-2 sentence explanation>"}]
}`,
          1200
        );

        let report: CredibilityReport = FALLBACK_REPORT;
        try {
          // Strip any accidental markdown fences
          const cleaned = synthesisRaw
            .replace(/^```(?:json)?\s*/im, '')
            .replace(/```\s*$/m, '')
            .trim();
          // Extract just the JSON object if there's extra text
          const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            report = JSON.parse(jsonMatch[0]) as CredibilityReport;
          } else {
            report = JSON.parse(cleaned) as CredibilityReport;
          }
        } catch (parseErr) {
          console.error('Synthesis JSON parse failed:', parseErr, '\nRaw:', synthesisRaw);
          report = {
            ...FALLBACK_REPORT,
            verdict: 'Synthesis parsing failed — but agent critiques and debate are available above.',
          };
        }

        controller.enqueue(encode({ type: 'report', data: report }));
        controller.enqueue(encode({ type: 'done' }));
      } catch (err) {
        console.error('Stream error:', err);
        controller.enqueue(encode({ type: 'error', data: String(err) }));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
