'use client';

import { useRef, useState } from 'react';
import { agents as agentDefs } from '@/lib/agents';
import { AgentResult, CredibilityReport } from '@/lib/types';
import InputSection from '@/components/InputSection';
import AgentCard from '@/components/AgentCard';
import CredibilityReportComponent from '@/components/CredibilityReport';

type Phase = 'input' | 'analyzing' | 'done';

interface Progress {
  label: string;
  pct: number;
}

const initialAgents = (): AgentResult[] =>
  agentDefs.map((a) => ({
    agentKey: a.key,
    name: a.name,
    emoji: a.emoji,
    color: a.color,
    tailwindBorder: a.tailwindBorder,
    tailwindText: a.tailwindText,
    critique: '',
    status: 'thinking' as const,
  }));

export default function Home() {
  const [phase, setPhase]         = useState<Phase>('input');
  const [agentResults, setAgents] = useState<AgentResult[]>(initialAgents());
  const [debate, setDebate]       = useState('');
  const [report, setReport]       = useState<CredibilityReport | null>(null);
  const [progress, setProgress]   = useState<Progress>({ label: '', pct: 0 });
  const [doneCount, setDoneCount] = useState(0);

  const agentsRef = useRef<HTMLDivElement>(null);
  const debateRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) =>
    setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);

  const handleAnalyze = async (content: string) => {
    setPhase('analyzing');
    setDebate('');
    setReport(null);
    setDoneCount(0);
    setAgents(initialAgents());
    setProgress({ label: 'Agents mobilising…', pct: 2 });
    scrollTo(agentsRef);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (!res.body) throw new Error('No response body');

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer    = '';
      let agentsDone = 0;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() ?? '';

        for (const chunk of lines) {
          const line = chunk.trim();
          if (!line.startsWith('data: ')) continue;

          let event: { type: string; data?: unknown };
          try { event = JSON.parse(line.slice(6)); }
          catch { continue; }

          if (event.type === 'agent') {
            const agentData = event.data as AgentResult;
            agentsDone += 1;
            setDoneCount(agentsDone);
            setProgress({ label: `Agent ${agentsDone}/4 complete`, pct: agentsDone * 20 });
            setAgents((prev) =>
              prev.map((a) => a.agentKey === agentData.agentKey
                ? { ...agentData, status: 'done' }
                : a)
            );
          }

          if (event.type === 'debate') {
            setProgress({ label: 'Debate in progress…', pct: 85 });
            setDebate(event.data as string);
            scrollTo(debateRef);
          }

          if (event.type === 'report') {
            setProgress({ label: 'Generating verdict…', pct: 95 });
            setReport(event.data as CredibilityReport);
          }

          if (event.type === 'done') {
            setProgress({ label: 'Analysis complete', pct: 100 });
            setPhase('done');
            scrollTo(reportRef);
          }

          if (event.type === 'error') break;
        }
      }
    } catch (err) {
      console.error(err);
      setAgents((prev) =>
        prev.map((a) => ({ ...a, status: 'done', critique: 'Error: failed to fetch analysis.' }))
      );
    }
  };

  const handleReset = () => {
    setPhase('input');
    setAgents(initialAgents());
    setDebate('');
    setReport(null);
    setDoneCount(0);
    setProgress({ label: '', pct: 0 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAnalyzing = phase === 'analyzing';

  return (
    <>
      {/* ── Thin top progress bar ─────────────────────────────── */}
      {phase !== 'input' && (
        <div className="fixed top-0 left-0 right-0 z-[9998] h-0.5 bg-[#1a1a1a]">
          <div
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${progress.pct}%`, boxShadow: '0 0 8px rgba(239,68,68,0.8)' }}
          />
        </div>
      )}

      {/* ── Floating "Powered by Claude" badge ───────────────── */}
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center gap-2 bg-[#111] border border-[#2a2a2a] rounded-full px-3 py-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-[10px] font-mono text-gray-400 tracking-wider whitespace-nowrap">
            Powered by Claude AI
          </span>
        </div>
      </div>

      <main className="min-h-screen bg-[#080808] text-white selection:bg-red-500/30">

        {/* Phase 1 — Input */}
        <InputSection onAnalyze={handleAnalyze} isLoading={isAnalyzing} />

        {/* Phase 2 — Agent analysis */}
        {phase !== 'input' && (
          <section ref={agentsRef} className="w-full max-w-5xl mx-auto px-4 pb-16">

            {/* Progress label */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {doneCount < 4
                  ? <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  : <span className="w-2 h-2 rounded-full bg-green-500" />}
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-red-400">
                  {progress.label || 'Agents mobilising…'}
                </span>
              </div>
              <span className="text-xs font-mono text-gray-600">{progress.pct}%</span>
            </div>

            {/* Agent cards — 1 col mobile, 2 col desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {agentResults.map((agent) => (
                <AgentCard key={agent.agentKey} agent={agent} />
              ))}
            </div>

            {/* Debate */}
            {debate && (
              <div ref={debateRef} className="mt-10 border border-[#222] rounded-xl overflow-hidden animate-fadeIn">
                <div className="flex flex-wrap items-center gap-3 px-4 sm:px-5 py-4 bg-[#0f0f0f] border-b border-[#1e1e1e]">
                  <span className="text-lg">⚔️</span>
                  <h3 className="font-black text-xs sm:text-sm uppercase tracking-widest text-gray-200">
                    Senior Editor Debate
                  </h3>
                  <span className="ml-auto text-xs text-gray-600 font-mono">Cross-agent synthesis</span>
                </div>
                <div className="p-4 sm:p-6 bg-[#0a0a0a]">
                  <p className="font-mono text-xs sm:text-sm text-gray-300 leading-loose whitespace-pre-wrap">
                    {debate}
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Phase 3 — Credibility report */}
        {phase === 'done' && report && (
          <div ref={reportRef}>
            <div className="w-full max-w-3xl mx-auto px-4 mb-10">
              <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            </div>
            <CredibilityReportComponent report={report} onReset={handleReset} />
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-[#1a1a1a] mt-8 py-6 px-4 text-center">
          <p className="text-xs font-mono text-gray-600 tracking-widest">
            TruthLens &nbsp;•&nbsp; Built at IMPACT AI 3.0 &nbsp;•&nbsp; Powered by 4 adversarial agents
          </p>
        </footer>
      </main>
    </>
  );
}
