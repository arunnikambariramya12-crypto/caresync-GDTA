import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Bell, Lock, LogOut, Check } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user, logout, addToast } = useApp();

  // Profile forms
  const [name, setName] = useState(user?.name || 'Arjun Kumar');
  const [email, setEmail] = useState(user?.email || 'arjun@caresync.com');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 019-2834');

  // Password fields
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  // Toggles
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [reportsEnabled, setReportsEnabled] = useState(true);
  const [caregiverSync, setCaregiverSync] = useState(true);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      user.name = name;
      user.email = email;
      user.phone = phone;
    }
    addToast('Profile settings saved successfully!', 'success');
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPass || !newPass) {
      addToast('Please fill all password fields', 'warning');
      return;
    }
    addToast('Password updated successfully!', 'success');
    setOldPass('');
    setNewPass('');
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">Settings</h1>
        <p className="text-slate-500 font-medium text-sm mt-1">Configure profile details, notification paths, and account settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Profile Settings (Col-span 7) */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider flex items-center gap-2">
              <User size={16} className="text-brand-500" />
              <span>Personal Profile</span>
            </h3>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email address</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone number</label>
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium text-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Check size={12} />
                <span>Save Changes</span>
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider flex items-center gap-2">
              <Lock size={16} className="text-brand-500" />
              <span>Security & Password</span>
            </h3>

            <form onSubmit={handlePasswordSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Password</label>
                  <input 
                    type="password" 
                    value={oldPass} 
                    onChange={(e) => setOldPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">New Password</label>
                  <input 
                    type="password" 
                    value={newPass} 
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    placeholder="Min 6 characters"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>Change Password</span>
              </button>
            </form>
          </div>
        </div>

        {/* Preferences Toggles (Col-span 5) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider flex items-center gap-2">
              <Bell size={16} className="text-brand-500" />
              <span>Notification Settings</span>
            </h3>

            <div className="space-y-4">
              {/* Reminder Alarm Toggle */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-xs text-brand-navy leading-none">Medication Reminders</h4>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">Alert me when dose is scheduled.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRemindersEnabled(!remindersEnabled)}
                  className={`w-10 h-5.5 rounded-full p-0.5 transition-colors focus:outline-none flex items-center ${remindersEnabled ? 'bg-brand-500 justify-end' : 'bg-slate-300 justify-start'}`}
                >
                  <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
                </button>
              </div>

              {/* Missed dose alert caregiver */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-xs text-brand-navy leading-none">Missed Dose Alerts</h4>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">Trigger alert log on missed doses.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAlertsEnabled(!alertsEnabled)}
                  className={`w-10 h-5.5 rounded-full p-0.5 transition-colors focus:outline-none flex items-center ${alertsEnabled ? 'bg-brand-500 justify-end' : 'bg-slate-300 justify-start'}`}
                >
                  <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
                </button>
              </div>

              {/* Weekly Reports reports */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-xs text-brand-navy leading-none">Weekly Reports</h4>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">Email PDF adherence analyses.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setReportsEnabled(!reportsEnabled)}
                  className={`w-10 h-5.5 rounded-full p-0.5 transition-colors focus:outline-none flex items-center ${reportsEnabled ? 'bg-brand-500 justify-end' : 'bg-slate-300 justify-start'}`}
                >
                  <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
                </button>
              </div>

              {/* Caregiver notifications */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-xs text-brand-navy leading-none">Caregiver Sync</h4>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">Send logs to connected caregiver.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCaregiverSync(!caregiverSync)}
                  className={`w-10 h-5.5 rounded-full p-0.5 transition-colors focus:outline-none flex items-center ${caregiverSync ? 'bg-brand-500 justify-end' : 'bg-slate-300 justify-start'}`}
                >
                  <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 border border-slate-200 p-6 rounded-3xl text-center space-y-4">
            <h4 className="font-bold text-xs text-brand-navy uppercase tracking-wider leading-none">End Demo Session</h4>
            <button
              onClick={logout}
              className="w-full py-3 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <LogOut size={14} />
              <span>Log Out & Reset Demo</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
