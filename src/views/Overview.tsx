import React from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { DoseStatusBadge } from '../components/DoseStatusBadge';
import { 
  CheckSquare, 
  TrendingUp, 
  AlertTriangle, 
  Pill, 
  Activity,
  FileText,
  Bell,
  Users,
  Bot
} from 'lucide-react';

export const Overview: React.FC = () => {
  const { user, schedule, stats, markDoseTaken, markDoseMissed } = useApp();

  const activeDoseRate = stats.todayTotal > 0 
    ? Math.round((stats.todayTaken / stats.todayTotal) * 100) 
    : 100;

  const journeySteps = [
    { name: "Prescription OCR", icon: FileText, desc: "Scan files" },
    { name: "Med Schedule", icon: Pill, desc: "Build course" },
    { name: "Smart Reminders", icon: Bell, desc: "Set timers" },
    { name: "Caregiver Alerts", icon: Users, desc: "Notify missed" },
    { name: "Medical AI Support", icon: Bot, desc: "Ask questions" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">Good morning, {user?.name || 'Arjun'}</h1>
        <p className="text-slate-500 font-medium text-sm mt-1">Stay on track with your medications today.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Today's Doses"
          value={`${stats.todayTaken} / ${stats.todayTotal}`}
          subtitle={`${activeDoseRate}% completed`}
          icon={CheckSquare}
          color="blue"
        />
        <StatCard 
          title="Adherence"
          value={`${stats.overallAdherence}%`}
          subtitle="This week"
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard 
          title="Missed Doses"
          value={stats.missedDoses}
          subtitle={stats.missedDoses > 0 ? "Needs attention" : "Excellent tracking"}
          icon={AlertTriangle}
          color={stats.missedDoses > 0 ? "rose" : "emerald"}
        />
        <StatCard 
          title="Active Medications"
          value={stats.todayTotal}
          subtitle="Currently scheduled"
          icon={Pill}
          color="amber"
        />
      </div>

      {/* Today's Schedule and Journey Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Today's Schedule */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
              <Activity size={18} className="text-brand-500" />
              <span>Today's Medication Checklist</span>
            </h3>

            {schedule.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Pill size={48} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm font-semibold">No medications scheduled for today.</p>
                <p className="text-xs mt-1">Go to My Medications or Prescription OCR to add some.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {schedule.map((item) => (
                  <div 
                    key={item.id}
                    className={`
                      p-5 border rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4
                      ${item.status === 'taken' ? 'bg-emerald-50/20 border-emerald-100' : ''}
                      ${item.status === 'missed' ? 'bg-rose-50/20 border-rose-100' : ''}
                      ${item.status === 'upcoming' ? 'bg-white border-slate-200 hover:border-slate-300' : ''}
                    `}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-extrabold text-sm sm:text-base text-brand-navy">{item.name}</span>
                        <span className="text-[10px] sm:text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{item.dosage}</span>
                      </div>
                      
                      <div className="text-xs text-slate-500 font-medium flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
                        <span className="text-brand-500 font-bold">{item.time}</span>
                        <span>{item.instructions}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <DoseStatusBadge status={item.status} />
                      
                      {item.status === 'upcoming' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => markDoseTaken(item.id)}
                            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all active:scale-95"
                          >
                            Mark Taken
                          </button>
                          <button
                            onClick={() => markDoseMissed(item.id)}
                            className="px-3 py-1.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-bold text-[11px] rounded-xl transition-all"
                          >
                            Missed
                          </button>
                        </div>
                      )}

                      {item.status === 'taken' && item.timeMarked && (
                        <span className="text-[10px] text-emerald-600 font-bold italic">
                          Logged at {item.timeMarked}
                        </span>
                      )}

                      {item.status === 'missed' && (
                        <span className="text-[10px] text-rose-500 font-bold italic">
                          Caregiver notified
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Care Journey Presentation Pathway Map */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
            <div>
              <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">AI Care Workflow Pathway</h3>
              <p className="text-slate-500 text-[11px] font-medium mt-1">Presentation guide mapping the application story line.</p>
            </div>
            
            <div className="relative border-l-2 border-dashed border-slate-200 ml-3 pl-6 space-y-6">
              {journeySteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="relative group">
                    {/* Circle timeline dot */}
                    <div className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full border bg-white border-slate-300 text-slate-500 flex items-center justify-center group-hover:border-brand-500 group-hover:text-brand-500 transition-colors">
                      <Icon size={12} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-brand-navy leading-none">{step.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
