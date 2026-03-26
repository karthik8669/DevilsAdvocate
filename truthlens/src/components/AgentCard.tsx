'use client';

import { AgentResult } from '@/lib/types';

interface Props {
  agent: AgentResult;
}

const colorMap: Record<string, string> = {
  red: 'border-red-500',
  orange: 'border-orange-500',
  purple: 'border-purple-500',
  yellow: 'border-yellow-500',
};

const textColorMap: Record<string, string> = {
  red: 'text-red-400',
  orange: 'text-orange-400',
  purple: 'text-purple-400',
  yellow: 'text-yellow-400',
};

const glowMap: Record<string, string> = {
  red: 'shadow-[0_0_15px_rgba(239,68,68,0.25)]',
  orange: 'shadow-[0_0_15px_rgba(249,115,22,0.25)]',
  purple: 'shadow-[0_0_15px_rgba(168,85,247,0.25)]',
  yellow: 'shadow-[0_0_15px_rgba(234,179,8,0.25)]',
};

export default function AgentCard({ agent }: Props) {
  const borderClass = colorMap[agent.color] ?? 'border-gray-500';
  const textClass = textColorMap[agent.color] ?? 'text-gray-400';
  const glowClass = glowMap[agent.color] ?? '';

  const isPending = agent.status === 'pending';
  const isThinking = agent.status === 'thinking';
  const isDone = agent.status === 'done';

  // Split numbered critique lines into individual items
  const lines = agent.critique
    ? agent.critique
        .split(/\n/)
        .map((l) => l.trim())
        .filter(Boolean)
    : [];

  return (
    <div
      className={`
        relative bg-[#111] rounded-xl border-l-4 p-5 flex flex-col gap-3 transition-all duration-500
        ${borderClass}
        ${isPending ? 'opacity-30' : 'opacity-100'}
        ${isThinking ? `animate-pulse ${glowClass}` : ''}
        ${isDone ? glowClass : ''}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-[#1e1e1e]">
        <span className="text-2xl">{agent.emoji}</span>
        <div>
          <h3 className={`font-black text-sm tracking-widest uppercase ${textClass}`}>
            {agent.name}
          </h3>
          <p className="text-xs text-gray-600 font-mono mt-0.5 uppercase tracking-widest">
            {agent.status}
          </p>
        </div>

        {/* Status indicator */}
        <div className="ml-auto">
          {isPending && <span className="w-2 h-2 rounded-full bg-gray-700 block" />}
          {isThinking && <span className="w-2 h-2 rounded-full bg-red-500 block animate-ping" />}
          {isDone && <span className="w-2 h-2 rounded-full bg-green-500 block" />}
        </div>
      </div>

      {/* Body */}
      {isPending && (
        <p className="text-gray-600 font-mono text-sm">Waiting...</p>
      )}

      {isThinking && (
        <div className="flex items-center gap-2 text-sm font-mono text-gray-400">
          Analyzing
          <span className="inline-flex gap-0.5">
            <span className="animate-bounce [animation-delay:0ms]">.</span>
            <span className="animate-bounce [animation-delay:150ms]">.</span>
            <span className="animate-bounce [animation-delay:300ms]">.</span>
          </span>
        </div>
      )}

      {isDone && (
        <ul className="space-y-2 animate-fadeIn">
          {lines.map((line, i) => (
            <li
              key={i}
              className="font-mono text-xs text-gray-300 leading-relaxed border-l border-[#2a2a2a] pl-3"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {line}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
