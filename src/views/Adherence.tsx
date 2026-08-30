import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart, TrendingUp, CheckCircle2, AlertTriangle, Sparkles, FileSpreadsheet } from 'lucide-react';

export const Adherence: React.FC = () => {
  const { medications, stats, generateWeeklyReport } = useApp();

  const weeklyData = [
    { day: 'Mon', rate: 85 },
    { day: 'Tue', rate: 95 },
    { day: 'Wed', rate: 90 },
    { day: 'Thu', rate: 100 },
    { day: 'Fri', rate: 92 },
    { day: 'Sat', rate: 88 },
    { day: 'Sun', rate: 94 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">Medication Adherence</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Review statistical compliance, daily logs, and compliance trends.</p>
        </div>

        <button
          onClick={generateWeeklyReport}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-2xl shadow-lg transition-all active:scale-95 self-start sm:self-auto"
        >
          <FileSpreadsheet size={16} />
          <span>Generate Weekly Summary</span>
        </button>
      </div>

      {/* Overview stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Overall card */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm relative overflow-hidden flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overall Compliance</span>
            <p className="text-3xl font-extrabold text-brand-navy mt-1">{stats.overallAdherence}%</p>
            <p className="text-xs text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
              <TrendingUp size={12} />
              <span>Above target (90%)</span>
            </p>
          </div>
          <div className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center bg-slate-50 text-brand-500 flex-shrink-0 font-extrabold text-base">
            {stats.overallAdherence}%
          </div>
        </div>

        {/* Taken doses card */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Taken Doses</span>
            <p className="text-2xl font-extrabold text-brand-navy mt-0.5">27 Doses</p>
            <p className="text-[10px] text-slate-500 mt-1 font-semibold">Scheduled: 29 total this week</p>
          </div>
        </div>

        {/* Missed doses card */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Missed Doses</span>
            <p className="text-2xl font-extrabold text-brand-navy mt-0.5">{stats.missedDoses} Doses</p>
            <p className="text-[10px] text-rose-500 mt-1 font-bold">Needs attention / caregiver alerted</p>
          </div>
        </div>

      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Adherence (SVG Bar Chart) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-6">
          <div>
            <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">Weekly Adherence Trend</h3>
            <p className="text-slate-500 text-xs mt-0.5 font-medium">Daily compliance percentages across the current week.</p>
          </div>

          {/* Custom SVG Bar Chart */}
          <div className="h-60 flex items-end justify-between gap-2.5 pt-4">
            {weeklyData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                
                {/* Tooltip on hover */}
                <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 scale-90 mb-1 select-none">
                  {item.rate}%
                </div>
                
                {/* Bar */}
                <div className="w-full bg-slate-100 rounded-lg relative h-full flex items-end overflow-hidden max-w-[40px]">
                  <div 
                    className="bg-brand-500 hover:bg-brand-600 rounded-lg transition-all duration-500 w-full"
                    style={{ height: `${item.rate}%` }}
                  />
                </div>
                
                {/* Label */}
                <span className="text-xs font-semibold text-slate-500">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dose Status breakdown (Progress Bars) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">Adherence Distribution</h3>
            <p className="text-slate-500 text-xs font-medium">Breakdown of scheduled dose status classifications.</p>
          </div>

          <div className="space-y-4">
            {/* Taken progress */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600">Taken Doses</span>
                <span className="text-emerald-600">27 (93%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '93%' }} />
              </div>
            </div>

            {/* Missed progress */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600">Missed Doses</span>
                <span className="text-rose-600">1 (3%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '3%' }} />
              </div>
            </div>

            {/* Upcoming progress */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600">Upcoming Doses</span>
                <span className="text-blue-600">1 (4%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '4%' }} />
              </div>
            </div>
          </div>

          {/* AI Advisor Insight */}
          <div className="bg-brand-50/50 border border-brand-100 p-4 rounded-2xl flex items-start gap-2.5">
            <Sparkles size={14} className="text-brand-500 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-600 font-semibold leading-relaxed">
              AI Insight: Compliance is stable. Missing Metformin yesterday was your only break in schedule. Maintain consistency for maximum health benefits.
            </p>
          </div>
        </div>

      </div>

      {/* Medication Performance Table */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">Individual Medication Performance</h3>
          <p className="text-slate-500 text-xs mt-0.5 font-medium">Adherence rates for each active therapeutic plan.</p>
        </div>

        <div className="space-y-3">
          {medications.map((med) => (
            <div 
              key={med.id} 
              className="flex items-center justify-between p-3.5 border border-slate-100 rounded-2xl hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
                  <BarChart size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-navy leading-none">{med.name}</h4>
                  <span className="text-[10px] text-slate-400 mt-1 font-semibold block">{med.dosage} • {med.frequency}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`text-xs font-bold ${med.adherenceRate >= 95 ? 'text-emerald-600' : med.adherenceRate >= 90 ? 'text-brand-600' : 'text-amber-600'}`}>
                  {med.adherenceRate}% adherence
                </span>
                <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                  <div 
                    className={`h-full rounded-full ${med.adherenceRate >= 95 ? 'bg-emerald-500' : med.adherenceRate >= 90 ? 'bg-brand-500' : 'bg-amber-500'}`}
                    style={{ width: `${med.adherenceRate}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
