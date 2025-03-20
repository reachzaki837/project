export interface AnalysisResult {
  threatLevel: {
    malwareRisk: 'Low' | 'Medium' | 'High';
    codeSimilarity: 'Low' | 'Medium' | 'High';
    permissionRisk: 'Low' | 'Medium' | 'High';
  };
  codeAnalysis: {
    obfuscationDetected: boolean;
    apiCalls: number;
    suspiciousPatterns: number;
  };
  permissions: string[];
  similarApps: Array<{
    name: string;
    similarity: number;
    malicious: boolean;
  }>;
  executionTrace: {
    apiUsage: Array<{
      name: string;
      count: number;
    }>;
    suspiciousActivities: string[];
  };
}