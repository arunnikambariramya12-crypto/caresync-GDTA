import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Mail, Phone, ShieldAlert, CheckCircle, AlertTriangle, Sparkles, Send } from 'lucide-react';

export const Caregiver: React.FC = () => {
  const { user, caregiver, inviteCaregiver, stats, addToast } = useApp();
  
  // Invitation form states
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePhone, setInvitePhone] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateInviteForm = () => {
    const errs: { [key: string]: string } = {};
    if (!inviteName.trim()) errs.name = 'Caregiver name is required';
    if (!inviteEmail) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(inviteEmail)) errs.email = 'Email is invalid';
    if (!invitePhone) errs.phone = 'Phone number is required';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInviteForm()) {
      inviteCaregiver(inviteName, inviteEmail, invitePhone);
      setInviteName('');
      setInviteEmail('');
      setInvitePhone('');
      setErrors({});
    }
  };

  const handleSMSAlert = () => {
    addToast('SMS check-in sent to Arjun Kumar.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {user?.role === 'patient' ? (
        /* ================= PATIENT VIEW ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Connected Caregiver Card (Left) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">Your Caregiver</h1>
              <p className="text-slate-500 font-medium text-sm mt-1">Caregivers monitor your schedule compliance and receive alerts for missed doses.</p>
            </div>

            {caregiver.status === 'None' ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center">
                <Users size={48} className="mx-auto mb-3 text-slate-300 stroke-[1.5]" />
                <h4 className="font-bold text-sm text-brand-navy">No Caregiver Connected</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Invite a trusted relative, partner, or doctor to monitor your medication schedule.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center font-extrabold text-brand-700 shadow-sm text-base select-none">
                    {caregiver.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-brand-navy">{caregiver.name}</h4>
                    <span className={`inline-block text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 ${caregiver.status === 'Connected' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {caregiver.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 font-medium border-t border-b border-slate-100 py-4">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-slate-400" />
                    <span>{caregiver.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-slate-400" />
                    <span>{caregiver.phone}</span>
                  </div>
                </div>

                <div className="bg-brand-50/50 border border-brand-100 p-3.5 rounded-2xl flex items-start gap-2.5">
                  <Sparkles size={14} className="text-brand-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-600 font-semibold leading-relaxed">
                    SMS & Email alerts will be automatically routed to {caregiver.name} if you miss any scheduled doses.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Invitation Form (Right) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">Invite New Caregiver</h3>
              
              <form onSubmit={handleInviteSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={inviteName} 
                    onChange={(e) => setInviteName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    placeholder="e.g. Priya Kumar" 
                  />
                  {errors.name && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email address</label>
                  <input 
                    type="email" 
                    value={inviteEmail} 
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    placeholder="name@domain.com" 
                  />
                  {errors.email && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone number</label>
                  <input 
                    type="tel" 
                    value={invitePhone} 
                    onChange={(e) => setInvitePhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    placeholder="+1 (555) 000-0000" 
                  />
                  {errors.phone && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.phone}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
                >
                  Send Connection Invite
                </button>
              </form>
            </div>
          </div>

        </div>
      ) : (
        /* ================= CAREGIVER VIEW ================= */
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">Caregiver Portal</h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Review activity reports, compliance logs, and warnings for connected patients.</p>
          </div>

          {/* Missed Dose Alert Header Widget (Present ONLY when missed doses exist!) */}
          {stats.missedDoses > 0 && (
            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 shadow-sm flex items-start gap-4 animate-bounce">
              <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-rose-500/10">
                <ShieldAlert size={22} className="stroke-[2.5]" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-extrabold text-sm sm:text-base text-rose-950">⚠️ Critical Warning: Missed medication detected</h3>
                <p className="text-rose-900 text-xs font-semibold leading-relaxed">
                  Patient Arjun Kumar missed his Metformin 500 mg dose scheduled at 09:00 PM yesterday. Automatic email and SMS notifications have been completed.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button 
                    onClick={handleSMSAlert}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Send size={10} /> Send SMS Check-in
                  </button>
                  <button 
                    onClick={() => addToast('Calling Arjun Kumar...', 'info')}
                    className="px-3.5 py-1.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 font-bold text-[10px] rounded-xl transition-all"
                  >
                    Call Patient
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Patient Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Connected Patients Summary (Left) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">Connected Patient</h3>
              
              <div className="p-4 border border-slate-200 rounded-2xl space-y-4 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-extrabold">A</div>
                  <div>
                    <h4 className="font-extrabold text-sm text-brand-navy">Arjun Kumar</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Compliance target: 90%</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold block">Compliance</span>
                    <span className="text-xs font-bold text-brand-600 mt-0.5 block">{stats.overallAdherence}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold block">Doses today</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{stats.todayTaken} / {stats.todayTotal}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold block">Alerts</span>
                    <span className={`text-xs font-extrabold mt-0.5 block ${stats.missedDoses > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {stats.missedDoses > 0 ? `${stats.missedDoses} missed` : 'Clear'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Activity log (Right) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">Recent Activity Timeline</h3>

              <div className="relative border-l-2 border-slate-100 ml-3 pl-6 space-y-5">
                {/* Metformin Missed */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border bg-white border-rose-500 text-rose-500 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={8} className="stroke-[3]" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-brand-navy">Metformin 500 mg</span>
                      <span className="text-[9px] text-slate-400">Yesterday, 09:30 PM</span>
                    </div>
                    <p className="text-[10px] text-rose-600 mt-0.5 font-bold">Marked as Missed — Caregiver notified via Email & SMS</p>
                  </div>
                </div>

                {/* Paracetamol Taken */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border bg-white border-emerald-500 text-emerald-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={8} className="stroke-[3]" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-brand-navy">Paracetamol 650 mg</span>
                      <span className="text-[9px] text-slate-400">Today, 01:15 PM</span>
                    </div>
                    <p className="text-[10px] text-emerald-600 mt-0.5 font-semibold">Marked as Taken — Compliance logged</p>
                  </div>
                </div>

                {/* Amoxicillin Taken */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border bg-white border-emerald-500 text-emerald-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={8} className="stroke-[3]" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-brand-navy">Amoxicillin 500 mg</span>
                      <span className="text-[9px] text-slate-400">Today, 08:05 AM</span>
                    </div>
                    <p className="text-[10px] text-emerald-600 mt-0.5 font-semibold">Marked as Taken — Compliance logged</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
