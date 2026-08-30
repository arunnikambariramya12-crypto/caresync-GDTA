import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Search, Calendar, CheckCheck, Inbox, ShieldAlert } from 'lucide-react';

interface TopNavigationProps {
  onTabChange: (tabId: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ onTabChange }) => {
  const { user, notifications, addToast } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications.filter(n => !n.read);
  const hasUnread = unreadNotifications.length > 0;

  // Handle clicking outside notifications dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format today's date
  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    addToast(`Searching for "${searchQuery}"...`, 'info');
  };

  const getNotifIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'warning': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'critical': return 'bg-rose-50 text-rose-600 border-rose-200';
      default: return 'bg-blue-50 text-blue-600 border-blue-200';
    }
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      
      {/* Search Input (Left) */}
      <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2.5 bg-slate-100/80 hover:bg-slate-100 border border-transparent focus-within:border-slate-200 focus-within:bg-white rounded-xl px-3.5 py-2 w-80 transition-all duration-200">
        <Search size={16} className="text-slate-400" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search medications, alerts..." 
          className="bg-transparent border-none outline-none text-slate-800 text-sm w-full placeholder:text-slate-400"
        />
      </form>
      <div className="md:hidden w-10"></div> {/* Spacer for mobile hamburger */}

      {/* Date & Action Panel (Right) */}
      <div className="flex items-center gap-4">
        
        {/* Date Display */}
        <div className="hidden xl:flex items-center gap-2 text-slate-500 font-medium text-xs bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl">
          <Calendar size={14} className="text-brand-500" />
          <span>{getFormattedDate()}</span>
        </div>

        {/* Notifications Icon with Dropdown */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`
              p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all relative
              ${showNotifications ? 'bg-slate-50' : ''}
            `}
            aria-label="View notifications"
          >
            <Bell size={18} />
            {hasUnread && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="font-bold text-sm text-brand-navy">Recent Notifications</span>
                {hasUnread && (
                  <span className="bg-brand-100 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {unreadNotifications.length} Unread
                  </span>
                )}
              </div>

              {/* Notification list */}
              <div className="max-h-[360px] overflow-y-auto custom-scrollbar division-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-400">
                    <Inbox size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => {
                        item.read = true; // Mark as read locally
                        setShowNotifications(false);
                        onTabChange('notifications');
                      }}
                      className={`
                        p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 border-b border-slate-100
                        ${!item.read ? 'bg-brand-50/20' : ''}
                      `}
                    >
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${getNotifIconColor(item.type)}`}>
                        {item.type === 'critical' ? (
                          <ShieldAlert size={14} />
                        ) : (
                          <CheckCheck size={14} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-xs text-brand-navy truncate">{item.title}</p>
                          <span className="text-[10px] text-slate-400 flex-shrink-0">{item.timestamp}</span>
                        </div>
                        <p className="text-slate-600 text-xs mt-1 line-clamp-2 leading-relaxed">{item.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <button 
                  onClick={() => {
                    setShowNotifications(false);
                    onTabChange('notifications');
                  }} 
                  className="text-xs text-brand-500 hover:text-brand-600 font-bold"
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200"></div>

        {/* User Card */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="font-bold text-sm text-brand-navy">{user.name}</p>
              <span className="text-[10px] text-brand-500 font-semibold capitalize tracking-wide">{user.role} Portal</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-100 border border-brand-200 flex items-center justify-center font-bold text-brand-700 shadow-inner select-none cursor-pointer">
              {user.name.charAt(0)}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
