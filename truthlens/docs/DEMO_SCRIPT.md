# TruthLens — Demo Script
### IMPACT AI 3.0

---

## Opening Line

> *"Every day, millions of people share content they haven't verified. Not because they're stupid — but because verification is hard, slow, and boring. TruthLens makes it instant, brutal, and impossible to ignore."*

---

## Demo Inputs & Expected Outcomes

### 🔴 Input 1 — The Obvious Hoax
**Use this first. It's the most dramatic.**

```
BREAKING: Scientists at Harvard confirm that drinking warm lemon water every 
morning on an empty stomach boosts metabolism by 47% and reverses early-stage 
diabetes in 83% of patients studied. The study followed 12,000 participants 
over 6 months and was funded by the WHO. Share this before it gets taken down!
```

**Expected score:** ~0–15 / 100 — HIGH RISK  
**Talking point:** *"Notice the agents didn't just say 'this is false.' The Fact Hound quotes the exact '47%' claim and explains why it's physically impossible. The Source Assassin flags 'Share before it gets taken down' as a classic viral suppression trick."*

---

### 🟠 Input 2 — The Subtle Misleader
**Use this second. Shows nuance.**

```
The government's new tax policy will destroy the middle class. Taxes are 
increasing by 40% for families earning above 5 lakhs per year, according to 
sources close to the Finance Ministry. Several unnamed economists have warned 
this could trigger a recession within months.
```

**Expected score:** ~5–25 / 100 — HIGH RISK / SUSPICIOUS  
**Talking point:** *"This is more dangerous than Input 1 — it sounds like journalism. The Bias Detector catches 'destroy the middle class' as fear-mongering. The Source Assassin eviscerates 'sources close to' and 'unnamed economists' — these are journalistic red flags most readers miss."*

---

### 🟡 Input 3 — The Mostly Credible Claim
**Use this last. Demonstrates the tool isn't just a yes/no machine.**

```
The Reserve Bank of India kept the repo rate unchanged at 6.5% in its latest 
monetary policy meeting, citing stable inflation and moderate GDP growth of 
6.8% in the last quarter.
```

**Expected score:** ~20–45 / 100 — SUSPICIOUS / UNVERIFIED  
**Talking point:** *"Even a mostly true statement gets attacked — and that's the point. The agents ask: where's the source link? What does 'stable inflation' mean exactly? This isn't about calling everything false. It's about demanding proof."*

---

## UI Talking Points — Phase by Phase

### Phase 1: Input
> *"Any text. Any language. Paste a WhatsApp forward, a tweet, a news headline — and hit Analyze."*

### Phase 2: Agents Activating
> *"Watch the cards light up one by one as each agent finishes — they're running simultaneously. This whole analysis takes under 30 seconds."*

### Phase 3: Debate Section
> *"This is where it gets interesting. A 'senior editor' model reads all 4 critiques and finds the pattern they reveal together — something none of them caught alone."*

### Phase 4: Credibility Report
> *"A structured verdict. Not just a score — but categorised findings you can act on. Share it. Copy it. Send it back to whoever forwarded you the content."*

---

## Judge Q&A

**Q1: How is this different from existing fact checkers like Snopes or AFP?**
> Traditional fact checkers are human-curated, cover only viral/high-profile claims, and take days. TruthLens works on *any* content in under 30 seconds, and instead of a binary true/false, it gives you a multi-dimensional credibility breakdown. We don't replace human fact-checkers — we democratise the process for everyday users.

**Q2: What's the role of each agent, and why 4?**
> Each agent is a specialist, not a generalist. One attack angle produces blind spots — a fact-checker might miss emotional manipulation; a bias detector might miss missing context. By running 4 adversarial agents simultaneously and then having them debate, we surface things that any single model would miss. The adversarial structure is the core innovation.

**Q3: How accurate is the credibility score?**
> The score is a model-generated heuristic, not ground truth. It's calibrated to reflect the severity of issues found — but it's designed to make you *think harder*, not replace your judgment. In testing, clearly false content consistently scores below 20, and verifiable factual claims score above 60. The score is a starting point; the categorised findings are the real value.

**Q4: How would you scale this?**
> Three directions: (1) a browser extension that runs TruthLens on any highlighted text, (2) a WhatsApp/Telegram bot for the 500M+ users in India who get news primarily through messaging apps, and (3) an API for newsrooms and social platforms to integrate at the content-ingestion layer. The streaming architecture already supports high concurrency.

**Q5: What's the business model?**
> Freemium API: free tier for consumers, paid tier for enterprises (newsrooms, fact-checking orgs, social platforms). Secondary: a white-label SDK for media companies who want to embed credibility scoring into their CMS. India's digital news market alone processes 400M+ daily article reads — a 0.1% API attach rate is a significant business.

---

## Closing Line

> *"We can't eliminate misinformation. But we can make it harder to spread unnoticed. TruthLens puts 4 AI critics in every pocket — so the next time someone forwards you something that sounds too outrageous to be true, you have a weapon. Thank you."*
