import React from 'react';
import { Shield, ShieldAlert } from 'lucide-react';
import { cn } from '../utils/cn';

interface PermissionListProps {
  permissions: string[];
}

const dangerousPermissions = [
  'READ_CONTACTS',
  'CAMERA',
  'RECORD_AUDIO',
  'ACCESS_FINE_LOCATION',
  'READ_SMS',
  'SEND_SMS',
];

export function PermissionList({ permissions }: PermissionListProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Required Permissions</h3>
      <div className="space-y-2">
        {permissions.map((permission, index) => {
          const isDangerous = dangerousPermissions.includes(permission);
          return (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-2 p-2 rounded",
                isDangerous ? "bg-red-400/10" : "bg-gray-700/50"
              )}
            >
              {isDangerous ? (
                <ShieldAlert className="text-red-400" />
              ) : (
                <Shield className="text-green-400" />
              )}
              <span className={isDangerous ? "text-red-400" : "text-green-400"}>
                {permission}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}