import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  Search,
  Shield,
  Activity,
  AlertTriangle,
  FileCode2,
  Database,
  Brain,
  XCircle,
} from 'lucide-react';
import { AnalysisChart } from './components/AnalysisChart';
import { SimilarApps } from './components/SimilarApps';
import { PermissionList } from './components/PermissionList';
import { getMockAnalysisResult } from './utils/mockAnalysis';
import type { AnalysisResult } from './types';

function App() {
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'analyzing' | 'complete' | 'error'>('idle');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.name.endsWith('.apk')) {
      setAnalysisStatus('analyzing');
      // Simulate API call
      setTimeout(() => {
        const result = getMockAnalysisResult();
        setAnalysisResult(result);
        setAnalysisStatus('complete');
      }, 2000);
    } else {
      setAnalysisStatus('error');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.android.package-archive': ['.apk'],
    },
    maxFiles: 1,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold">AppGuard AI</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-blue-400 transition">Dashboard</a>
              <a href="#" className="hover:text-blue-400 transition">Documentation</a>
              <a href="#" className="hover:text-blue-400 transition">API</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Upload Section */}
        <div
          {...getRootProps()}
          className={`mt-8 p-8 border-2 border-dashed rounded-lg text-center transition-colors cursor-pointer
            ${isDragActive ? 'border-blue-400 bg-blue-400/10' : 'border-gray-600 hover:border-gray-500'}
            ${analysisStatus === 'error' ? 'border-red-400 bg-red-400/10' : ''}
            ${analysisStatus === 'complete' ? 'border-green-400 bg-green-400/10' : ''}`}
        >
          <input {...getInputProps()} />
          {analysisStatus === 'error' ? (
            <>
              <XCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-red-400">Invalid File</h2>
              <p className="text-gray-400">Please upload an APK file</p>
            </>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">
                {analysisStatus === 'complete' ? 'Analysis Complete!' : 'Drop APK File Here'}
              </h2>
              <p className="text-gray-400">
                {analysisStatus === 'analyzing' ? 'Analyzing...' : 'or click to select APK file for analysis'}
              </p>
            </>
          )}
        </div>

        {/* Analysis Status */}
        {analysisStatus === 'analyzing' && (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Analysis in Progress</h3>
              <Activity className="animate-pulse text-blue-400" />
            </div>
            <div className="space-y-4">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-3/4 animate-pulse rounded-full"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Extracting features...</span>
                <span>75%</span>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysisStatus === 'complete' && analysisResult && (
          <>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Threat Analysis</h3>
                  <AlertTriangle className="text-yellow-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Malware Risk</span>
                    <span className={`text-${analysisResult.threatLevel.malwareRisk === 'Low' ? 'green' : analysisResult.threatLevel.malwareRisk === 'Medium' ? 'yellow' : 'red'}-400`}>
                      {analysisResult.threatLevel.malwareRisk}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Code Similarity</span>
                    <span className={`text-${analysisResult.threatLevel.codeSimilarity === 'Low' ? 'green' : analysisResult.threatLevel.codeSimilarity === 'Medium' ? 'yellow' : 'red'}-400`}>
                      {analysisResult.threatLevel.codeSimilarity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Permission Risk</span>
                    <span className={`text-${analysisResult.threatLevel.permissionRisk === 'Low' ? 'green' : analysisResult.threatLevel.permissionRisk === 'Medium' ? 'yellow' : 'red'}-400`}>
                      {analysisResult.threatLevel.permissionRisk}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Code Analysis</h3>
                  <FileCode2 className="text-blue-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Obfuscation Detected</span>
                    <span className="text-yellow-400">
                      {analysisResult.codeAnalysis.obfuscationDetected ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>API Calls</span>
                    <span>{analysisResult.codeAnalysis.apiCalls}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Suspicious Patterns</span>
                    <span className="text-red-400">
                      {analysisResult.codeAnalysis.suspiciousPatterns} found
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">API Usage Analysis</h3>
                <AnalysisChart apiUsage={analysisResult.executionTrace.apiUsage} />
              </div>
              <PermissionList permissions={analysisResult.permissions} />
            </div>

            <div className="mt-8">
              <SimilarApps apps={analysisResult.similarApps} />
            </div>

            {analysisResult.executionTrace.suspiciousActivities.length > 0 && (
              <div className="mt-8 bg-red-400/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-400">Suspicious Activities Detected</h3>
                <ul className="space-y-2">
                  {analysisResult.executionTrace.suspiciousActivities.map((activity, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <AlertTriangle className="text-red-400" />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <Search className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">APK Analysis</h3>
            <p className="text-gray-400">Advanced code structure analysis and similarity detection using machine learning.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <Database className="h-8 w-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Execution Trace</h3>
            <p className="text-gray-400">Sophisticated Smali bytecode simulation for behavioral analysis.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <Brain className="h-8 w-8 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">ML Integration</h3>
            <p className="text-gray-400">State-of-the-art AI models for accurate classification and detection.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;