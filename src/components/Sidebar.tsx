import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Pill, 
  ScanLine, 
  Bell, 
  TrendingUp, 
  Users, 
  Bot, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Heart,
  Activity
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  highlight?: boolean;
  badge?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout, notifications } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const patientNavItems: NavItem[] = [
    { id: 'overview', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'medications', name: 'My Medications', icon: Pill },
    { id: 'ocr', name: 'Prescription OCR', icon: ScanLine, highlight: true },
    { id: 'reminders', name: 'Reminders', icon: Bell },
    { id: 'adherence', name: 'Adherence', icon: TrendingUp },
    { id: 'caregiver', name: 'Caregiver', icon: Users },
    { id: 'medical-ai', name: 'Medical AI', icon: Bot, highlight: true },
    { id: 'general-chat', name: 'General Chat', icon: MessageSquare },
    { id: 'notifications', name: 'Notifications', icon: Bell, badge: unreadNotifs },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const caregiverNavItems: NavItem[] = [
    { id: 'caregiver-overview', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'notifications', name: 'Notifications', icon: Bell, badge: unreadNotifs },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const navItems = user?.role === 'caregiver' ? caregiverNavItems : patientNavItems;

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 bg-white rounded-lg shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-slate-200 bg-white flex flex-col justify-between transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Section / Brand Logo */}
        <div>
          <div className="h-20 px-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Heart size={20} className="text-white fill-current animate-pulse-slow" />
            </div>
            <div>
              <span className="font-bold text-xl text-brand-navy tracking-tight">CareSync</span>
              <div className="text-[10px] text-brand-500 font-semibold uppercase tracking-widest flex items-center gap-1">
                <Activity size={8} /> AI Healthcare
              </div>
            </div>
          </div>

          {/* Nav Items List */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
                    ${isActive 
                      ? 'bg-brand-50 text-brand-600 shadow-sm shadow-brand-500/5' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-950'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon 
                      size={18} 
                      className={`
                        transition-colors duration-200
                        ${isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}
                        ${item.highlight ? 'text-brand-500 animate-pulse' : ''}
                      `} 
                    />
                    <span>{item.name}</span>
                  </div>

                  {/* Badges/Highlights */}
                  {item.badge ? (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  ) : null}

                  {item.highlight && !isActive ? (
                    <span className="bg-brand-100 text-brand-700 text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider scale-90">
                      AI
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User / Logout Section */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center font-bold text-brand-700 shadow-inner">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-brand-navy truncate">{user.name}</p>
                <p className="text-[11px] text-slate-500 capitalize">{user.role}</p>
              </div>
            </div>
          )}

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200"
          >
            <LogOut size={18} className="text-slate-400 group-hover:text-rose-600" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
