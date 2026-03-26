export interface Agent {
  key: string;
  name: string;
  emoji: string;
  color: string;
  tailwindBorder: string;
  tailwindText: string;
  systemPrompt: string;
}

export interface AgentResult {
  agentKey: string;
  name: string;
  emoji: string;
  color: string;
  tailwindBorder: string;
  tailwindText: string;
  critique: string;
  status: 'pending' | 'thinking' | 'done';
}

export interface CredibilityIssue {
  issue: string;
  explanation: string;
}

export interface CredibilityReport {
  score: number;
  likelyFalse: CredibilityIssue[];
  misleading: CredibilityIssue[];
  unverified: CredibilityIssue[];
  appearsCredible: CredibilityIssue[];
  verdict: string;
}

export interface AnalysisResult {
  agents: AgentResult[];
  debate: string;
  report: CredibilityReport;
}
