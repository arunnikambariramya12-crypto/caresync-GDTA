import React from 'react';
import { Check, AlertCircle, Clock } from 'lucide-react';

interface DoseStatusBadgeProps {
  status: 'upcoming' | 'taken' | 'missed';
}

export const DoseStatusBadge: React.FC<DoseStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'taken':
      return (
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
          <Check size={12} className="stroke-[3]" />
          <span>Taken</span>
        </span>
      );
    case 'missed':
      return (
        <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
          <AlertCircle size={12} className="stroke-[3]" />
          <span>Missed</span>
        </span>
      );
    case 'upcoming':
    default:
      return (
        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
          <Clock size={12} className="stroke-[3]" />
          <span>Upcoming</span>
        </span>
      );
  }
};
