# DevilsAdvocate
4 adversarial AI agents that brutally attack your startup idea before the market does.
# 🪞 Devil's Advocate

> Every AI helps you build faster. This one asks if you should be building at all.

## What It Does

Devil's Advocate spins up 4 adversarial AI agents that ruthlessly attack 
your startup idea, product spec, or pitch deck from every angle — before 
your users, competitors, or investors do.

No encouragement. No sugarcoating. Pure brutality.

## The 4 Agents

| Agent | Role |
|---|---|
| 😤 The Angry User | Destroys your UX assumptions |
| 🗡️ The Competitor | Explains how they'll crush you |
| 📉 The Skeptical Investor | Tears apart your business model |
| 💀 The Hacker | Finds every security assumption you made |

After individual attacks, the agents **debate each other** — escalating 
the most dangerous findings and surfacing insights no single agent 
would catch alone.

## The Output
```
🔴 CRITICAL   — kills your product in 90 days
🟠 SEVERE     — kills it in 12 months
🟡 MODERATE   — significantly slows growth
🟢 MINOR      — worth fixing eventually
```

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **AI:** Groq API (llama-3.3-70b-versatile)
- **Architecture:** Multi-agent orchestration with debate round + synthesis

## How To Run
```bash
git clone https://github.com/yourusername/devils-advocate
cd devils-advocate
npm install
```

Add your API key to `.env.local`:
```bash
GROQ_API_KEY=your_key_here
```
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How It Works
```
Your idea
    ↓
4 agents attack in parallel
    ↓
Agents read each other + debate
    ↓
Synthesis → Brutality Report
```

## Built At

IMPACT AI 3.0 — 24 Hour Hackathon
```

---

**Topics/tags to add on GitHub:**
```
ai, multi-agent, nextjs, groq, llama, startup, productivity, 
developer-tools, hackathon, adversarial-ai
