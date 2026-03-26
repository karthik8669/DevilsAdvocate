# TruthLens

> **4 adversarial AI agents that attack content credibility from every angle**

---

## The Problem

Misinformation spreads 6x faster than the truth. Existing fact-checkers are slow, manually curated, and only cover high-profile claims. Meanwhile, WhatsApp forwards, viral tweets, and AI-generated news are eroding public trust at scale — and there's no tool that gives an ordinary person a *fast, multi-angle attack* on any piece of content.

---

## How It Works

TruthLens runs every piece of content through a 3-stage adversarial pipeline:

### Stage 1 — 4 Agents Attack in Parallel

| Agent | Role |
|---|---|
| 🔍 **The Fact Hound** | Attacks every statistic, date, name, and number. Quotes exact claims and demolishes them with fact-checking precision. |
| 🎭 **The Bias Detector** | Exposes emotional manipulation, loaded language, propaganda techniques, and agenda-driven framing. |
| 🗡️ **The Source Assassin** | Forensically investigates origin credibility — anonymous sources, missing attribution, suspicious publication context. |
| ✂️ **The Context Killer** | Reveals what the content deliberately omits — missing base rates, suppressed counterpoints, selective framing. |

All 4 run simultaneously. Results stream to the UI the moment each agent finishes.

### Stage 2 — Debate Round

A "Senior Editor" model reads all 4 critiques and surfaces:
- The single most damning finding
- Two critiques that combine to reveal a bigger deception pattern
- One credibility issue all agents missed

### Stage 3 — Synthesis

A final model pass produces a structured `CredibilityReport` with:
- A **credibility score (0–100)**
- A one-sentence verdict
- Findings categorised as: Likely False / Misleading / Unverified / Appears Credible

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI / LLM | Claude API (Anthropic) |
| Streaming | Server-Sent Events (ReadableStream) |
| Deployment | Vercel-ready |

---

## Running Locally

```bash
# 1. Clone and install
cd truthlens
npm install

# 2. Add your API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Team

| Name | Role |
|---|---|
| | |
| | |
| | |
