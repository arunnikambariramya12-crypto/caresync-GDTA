import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import type { Toast } from '../context/AppContext';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

interface ToastItemProps {
  toast: Toast;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const { removeToast } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const getStyle = (type: string) => {
    switch (type) {
      case 'success':
        return {
          border: 'border-emerald-200',
          bg: 'bg-white',
          text: 'text-emerald-800',
          icon: <CheckCircle size={18} className="text-emerald-500" />
        };
      case 'warning':
        return {
          border: 'border-amber-200',
          bg: 'bg-white',
          text: 'text-amber-800',
          icon: <AlertTriangle size={18} className="text-amber-500" />
        };
      case 'info':
      default:
        return {
          border: 'border-blue-200',
          bg: 'bg-white',
          text: 'text-blue-800',
          icon: <Info size={18} className="text-blue-500" />
        };
    }
  };

  const style = getStyle(toast.type);

  return (
    <div className={`
      flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-lg border ${style.border} ${style.bg} ${style.text}
      w-full max-w-sm overflow-hidden z-50 animate-in slide-in-from-bottom-5 fade-in duration-300
    `}>
      <div className="flex-shrink-0">{style.icon}</div>
      <p className="text-xs font-bold flex-1 leading-snug">{toast.message}</p>
      <button 
        onClick={() => removeToast(toast.id)}
        className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-lg hover:bg-slate-100/50"
        aria-label="Dismiss toast"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 w-full max-w-[calc(100vw-40px)] sm:max-w-sm">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
