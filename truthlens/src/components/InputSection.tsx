'use client';

import { useState } from 'react';

const EXAMPLE_CONTENT = `BREAKING: Scientists at Harvard confirm that drinking warm lemon water every morning on an empty stomach boosts metabolism by 47% and reverses early-stage diabetes in 83% of patients studied. The study followed 12,000 participants over 6 months and was funded by the WHO. Share this before it gets taken down!`;

const TITLE = 'TRUTHLENS';

interface Props {
  onAnalyze: (content: string) => void;
  isLoading: boolean;
}

export default function InputSection({ onAnalyze, isLoading }: Props) {
  const [content, setContent]     = useState('');
  const [charging, setCharging]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isLoading || charging) return;

    // 500 ms charge animation before firing
    setCharging(true);
    await new Promise((r) => setTimeout(r, 500));
    setCharging(false);
    onAnalyze(content.trim());
  };

  const btnLabel = charging ? 'CHARGING...' : isLoading ? 'RUNNING AGENTS...' : 'ANALYZE CONTENT 🔍';
  const btnDisabled = !content.trim() || isLoading || charging;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">

      {/* Letter-by-letter title */}
      <div className="mb-6 text-center">
        <h1
          className="glitch text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white uppercase select-none"
          data-text={TITLE}
          aria-label={TITLE}
        >
          {TITLE.split('').map((char, i) => (
            <span
              key={i}
              className="letter"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p
          className="letter mt-4 text-base sm:text-lg md:text-xl text-red-400 font-mono tracking-widest uppercase"
          style={{ animationDelay: `${TITLE.length * 80 + 100}ms` }}
        >
          4 AI agents.&nbsp; 1 verdict.&nbsp; No mercy.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-8 flex flex-col gap-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading || charging}
          rows={7}
          placeholder="Paste any news article, WhatsApp forward, tweet, or claim..."
          className="w-full bg-[#111] text-gray-200 placeholder-gray-600 border border-[#2a2a2a] rounded-lg p-4 sm:p-5 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:opacity-50"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={btnDisabled}
            className={`flex-1 py-4 text-white font-black text-base sm:text-lg rounded-lg tracking-wide transition-all transform active:translate-y-0
              ${charging
                ? 'btn-charging hover:shadow-[0_0_40px_rgba(239,68,68,0.7)]'
                : 'bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)] hover:-translate-y-0.5'
              }`}
          >
            {btnLabel}
          </button>
          <button
            type="button"
            onClick={() => setContent(EXAMPLE_CONTENT)}
            disabled={isLoading || charging}
            className="sm:w-40 py-4 bg-[#1a1a1a] hover:bg-[#252525] disabled:opacity-40 text-gray-400 hover:text-gray-200 font-mono text-sm rounded-lg border border-[#333] transition-all"
          >
            Try an Example
          </button>
        </div>

        <p className="text-center text-xs text-gray-600 font-mono mt-1">
          Works on news articles · viral forwards · social posts · claims
        </p>
      </form>
    </section>
  );
}
