import { AnalysisResult } from '../types';

export function getMockAnalysisResult(): AnalysisResult {
  return {
    threatLevel: {
      malwareRisk: 'Low',
      codeSimilarity: 'Medium',
      permissionRisk: 'High',
    },
    codeAnalysis: {
      obfuscationDetected: true,
      apiCalls: 147,
      suspiciousPatterns: 3,
    },
    permissions: [
      'INTERNET',
      'ACCESS_NETWORK_STATE',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'READ_CONTACTS',
      'CAMERA',
      'ACCESS_FINE_LOCATION',
    ],
    similarApps: [
      {
        name: 'Suspicious App 1',
        similarity: 85,
        malicious: true,
      },
      {
        name: 'Safe App 1',
        similarity: 45,
        malicious: false,
      },
      {
        name: 'Suspicious App 2',
        similarity: 72,
        malicious: true,
      },
    ],
    executionTrace: {
      apiUsage: [
        { name: 'Network Calls', count: 45 },
        { name: 'File Operations', count: 23 },
        { name: 'Crypto Operations', count: 15 },
        { name: 'System Calls', count: 64 },
      ],
      suspiciousActivities: [
        'Attempting to access root',
        'Suspicious network calls',
        'Possible data exfiltration',
      ],
    },
  };
}