import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface SimilarApp {
  name: string;
  similarity: number;
  malicious: boolean;
}

interface SimilarAppsProps {
  apps: SimilarApp[];
}

export function SimilarApps({ apps }: SimilarAppsProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Similar Applications</h3>
      <div className="space-y-4">
        {apps.map((app, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {app.malicious ? (
                <AlertTriangle className="text-red-400" />
              ) : (
                <CheckCircle className="text-green-400" />
              )}
              <span>{app.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`px-2 py-1 rounded ${
                  app.similarity > 80
                    ? 'bg-red-400/20 text-red-400'
                    : app.similarity > 50
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'bg-green-400/20 text-green-400'
                }`}
              >
                {app.similarity}% Similar
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}