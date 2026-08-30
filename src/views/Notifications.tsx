import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, CheckCheck, Info, AlertTriangle, ShieldAlert } from 'lucide-react';

export const Notifications: React.FC = () => {
  const { notifications, addToast } = useApp();

  const markAllRead = () => {
    notifications.forEach(n => n.read = true);
    addToast('All notifications marked as read', 'info');
  };

  const getStyle = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-50 border-emerald-100',
          iconBg: 'bg-emerald-500 text-white',
          text: 'text-emerald-950',
          icon: <CheckCheck size={14} className="stroke-[2.5]" />
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-100',
          iconBg: 'bg-amber-500 text-white',
          text: 'text-amber-950',
          icon: <AlertTriangle size={14} className="stroke-[2.5]" />
        };
      case 'critical':
        return {
          bg: 'bg-rose-50 border-rose-100',
          iconBg: 'bg-rose-500 text-white',
          text: 'text-rose-950',
          icon: <ShieldAlert size={14} className="stroke-[2.5]" />
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50 border-blue-100',
          iconBg: 'bg-blue-500 text-white',
          text: 'text-blue-950',
          icon: <Info size={14} className="stroke-[2.5]" />
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">Notifications</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Review alerts, reports, compliance alerts, and caregiver status changes.</p>
        </div>
        
        {notifications.some(n => !n.read) && (
          <button
            onClick={markAllRead}
            className="flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            <CheckCheck size={14} />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* List */}
      {notifications.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
          <Bell size={54} className="mx-auto mb-4 text-slate-300 stroke-[1.5]" />
          <h3 className="text-lg font-bold text-brand-navy">No alerts logged</h3>
          <p className="text-slate-500 text-sm mt-1">
            System notices and reminder logs will appear here when triggered.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((item) => {
            const style = getStyle(item.type);
            return (
              <div 
                key={item.id}
                onClick={() => item.read = true}
                className={`
                  p-5 border rounded-3xl transition-all flex items-start gap-4 cursor-pointer hover:shadow-sm
                  ${item.read ? 'bg-white border-slate-200' : `${style.bg} border`}
                `}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${style.iconBg}`}>
                  {style.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className={`font-bold text-xs sm:text-sm ${style.text} flex items-center gap-2`}>
                      <span>{item.title}</span>
                      {!item.read && (
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                      )}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium">{item.timestamp}</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-1.5 leading-relaxed font-medium">{item.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
