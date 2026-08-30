import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color: 'blue' | 'emerald' | 'rose' | 'amber';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color 
}) => {
  
  const colorsMap = {
    blue: {
      bg: 'bg-blue-50 border-blue-100 text-blue-600',
      badge: 'bg-blue-100 text-blue-800'
    },
    emerald: {
      bg: 'bg-emerald-50 border-emerald-100 text-emerald-600',
      badge: 'bg-emerald-100 text-emerald-800'
    },
    rose: {
      bg: 'bg-rose-50 border-rose-100 text-rose-600',
      badge: 'bg-rose-100 text-rose-800'
    },
    amber: {
      bg: 'bg-amber-50 border-amber-100 text-amber-600',
      badge: 'bg-amber-100 text-amber-800'
    }
  };

  const selectedColor = colorsMap[color];

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${selectedColor.bg}`}>
        <Icon size={22} />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-slate-500 font-semibold text-xs uppercase tracking-wider">{title}</p>
        <p className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1 tracking-tight">{value}</p>
        <p className="text-slate-600 text-xs mt-1.5 flex items-center gap-1.5 font-medium">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${selectedColor.badge}`}>
            {subtitle}
          </span>
        </p>
      </div>
    </div>
  );
};
