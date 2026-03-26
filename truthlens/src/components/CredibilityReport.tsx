'use client';

import { useState } from 'react';
import { CredibilityReport, CredibilityIssue } from '@/lib/types';

interface Props {
  report: CredibilityReport;
  onReset: () => void;
}

function scoreLabel(score: number) {
  if (score <= 30) return { label: 'HIGH RISK',       color: 'text-red-500',    ring: 'border-red-500',    from: 'from-red-500/20'    };
  if (score <= 60) return { label: 'SUSPICIOUS',      color: 'text-orange-400', ring: 'border-orange-400', from: 'from-orange-400/20' };
  if (score <= 80) return { label: 'UNVERIFIED',      color: 'text-yellow-400', ring: 'border-yellow-400', from: 'from-yellow-400/20' };
  return              { label: 'APPEARS CREDIBLE', color: 'text-green-400',  ring: 'border-green-500',  from: 'from-green-500/20'  };
}

interface SectionProps {
  badge: string;
  title: string;
  issues: CredibilityIssue[];
  borderColor: string;
  textColor: string;
  delay: number;
}

function IssueSection({ badge, title, issues, borderColor, textColor, delay }: SectionProps) {
  const [open, setOpen] = useState(true);
  if (!issues?.length) return null;

  return (
    <div
      className="border border-[#1e1e1e] rounded-xl overflow-hidden animate-fadeIn"
      style={{ animationDelay: `${delay}ms` }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 sm:px-5 py-4 bg-[#111] hover:bg-[#161616] transition-colors text-left"
      >
        <span className="text-xl">{badge}</span>
        <span className={`font-black text-xs sm:text-sm uppercase tracking-widest ${textColor}`}>{title}</span>
        <span className="ml-auto text-gray-600 font-mono text-xs">{issues.length} finding{issues.length > 1 ? 's' : ''}</span>
        <span className="text-gray-500 ml-2 text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="divide-y divide-[#1a1a1a]">
          {issues.map((issue, i) => (
            <div key={i} className={`px-4 sm:px-5 py-4 bg-[#0d0d0d] border-l-2 ${borderColor}`}>
              <p className="text-sm font-bold text-white mb-1">{issue.issue}</p>
              <p className="text-xs font-mono text-gray-400 leading-relaxed">{issue.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CredibilityReportComponent({ report, onReset }: Props) {
  const [copied, setCopied] = useState(false);
  const { label, color, ring, from } = scoreLabel(report.score);

  const buildSummaryText = () => {
    const lines: string[] = [
      `TRUTHLENS CREDIBILITY REPORT`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Score: ${report.score}/100 — ${label}`,
      `Verdict: ${report.verdict}`,
      '',
    ];
    const appendSection = (t: string, items: CredibilityIssue[]) => {
      if (!items?.length) return;
      lines.push(t);
      items.forEach((i) => lines.push(`  • ${i.issue}: ${i.explanation}`));
      lines.push('');
    };
    appendSection('🔴 LIKELY FALSE',     report.likelyFalse);
    appendSection('🟠 MISLEADING',       report.misleading);
    appendSection('🟡 UNVERIFIED',       report.unverified);
    appendSection('🟢 APPEARS CREDIBLE', report.appearsCredible);
    return lines.join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `I analyzed this content with TruthLens. Credibility Score: ${report.score}/100. Verdict: ${report.verdict} Built with adversarial AI agents. #TruthLens`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 pb-24 animate-fadeIn">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-black tracking-widest uppercase text-white mb-1">
          CREDIBILITY REPORT
        </h2>
        <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mt-3" />
      </div>

      {/* Score circle */}
      <div className="flex flex-col items-center mb-12">
        <div className={`relative w-40 h-40 sm:w-44 sm:h-44 rounded-full border-8 ${ring} flex flex-col items-center justify-center bg-gradient-radial ${from} to-transparent`}>
          <span className={`text-5xl font-black ${color}`}>{report.score}</span>
          <span className="text-xs text-gray-500 font-mono mt-1">/ 100</span>
        </div>
        <p className={`mt-4 text-lg sm:text-xl font-black tracking-widest uppercase ${color}`}>{label}</p>
        <p className="mt-3 text-sm font-mono text-gray-400 text-center max-w-lg leading-relaxed italic px-4">
          &ldquo;{report.verdict}&rdquo;
        </p>
      </div>

      {/* Issue sections */}
      <div className="flex flex-col gap-4 mb-10">
        <IssueSection badge="🔴" title="Likely False"     issues={report.likelyFalse}    borderColor="border-red-500"    textColor="text-red-400"    delay={0}   />
        <IssueSection badge="🟠" title="Misleading"       issues={report.misleading}      borderColor="border-orange-500" textColor="text-orange-400" delay={150} />
        <IssueSection badge="🟡" title="Unverified"       issues={report.unverified}      borderColor="border-yellow-500" textColor="text-yellow-400" delay={300} />
        <IssueSection badge="🟢" title="Appears Credible" issues={report.appearsCredible} borderColor="border-green-500"  textColor="text-green-400"  delay={450} />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={handleShare}
          className="py-3 bg-[#1a1a1a] hover:bg-[#222] text-gray-300 font-mono text-sm rounded-lg border border-[#333] transition-all hover:text-white hover:border-red-500/50"
        >
          {copied ? '✓ Copied!' : '🔗 Share Report'}
        </button>
        <button
          onClick={handleCopy}
          className="py-3 bg-[#1a1a1a] hover:bg-[#222] text-gray-300 font-mono text-sm rounded-lg border border-[#333] transition-all hover:text-white"
        >
          📋 Copy Full Report
        </button>
        <button
          onClick={onReset}
          className="py-3 bg-red-600 hover:bg-red-500 text-white font-black text-sm rounded-lg transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
        >
          ↩ Analyze Another
        </button>
      </div>
    </section>
  );
}
