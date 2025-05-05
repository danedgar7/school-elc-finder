import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { SchoolStatus } from '@/App'; // Import the status type

interface StatusBadgeProps {
  status: SchoolStatus | undefined;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  if (!status) {
    return null; // Don't render anything if status is undefined or 'None'
  }

  let badgeClass = '';

  switch (status) {
    case 'Prioritised':
      badgeClass = 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200';
      break;
    case 'Requested':
      badgeClass = 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200';
      break;
    case 'Availability':
      badgeClass = 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200';
      break;
    case 'No Availability':
      badgeClass = 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200';
      break;
    case 'None': // Explicitly handle 'None' to return null
        return null;
    default:
      badgeClass = 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'; // Default/fallback style
  }

  return (
    <Badge variant="outline" className={`text-xs font-medium ${badgeClass}`}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
