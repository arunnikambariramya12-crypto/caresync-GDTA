import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Cpu, 
  Calendar, 
  Bell, 
  Users, 
  TrendingUp, 
  Bot, 
  Heart,
  ChevronRight,
  ShieldCheck,
  Zap,
  CheckCircle
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { login, navigateTo } = useApp();

  const features = [
    {
      title: "AI Prescription OCR",
      desc: "Turn messy handwritten or printed prescription images into structured, digital medication schedules in seconds.",
      icon: FileText,
      color: "text-blue-500 bg-blue-50 border-blue-100"
    },
    {
      title: "Smart Reminders",
      desc: "Receive timely, customizable reminders on your devices. Enable or disable reminders with a single tap.",
      icon: Bell,
      color: "text-indigo-500 bg-indigo-50 border-indigo-100"
    },
    {
      title: "Caregiver Alerts",
      desc: "Bridge the gap between patient and caregiver. Missed doses trigger automated, instant email notifications.",
      icon: Users,
      color: "text-rose-500 bg-rose-50 border-rose-100"
    },
    {
      title: "Adherence Insights",
      desc: "Understand medication habits with interactive weekly reports, compliance metrics, and charts.",
      icon: TrendingUp,
      color: "text-emerald-500 bg-emerald-50 border-emerald-100"
    },
    {
      title: "AI Medical Assistant",
      desc: "Get medication-aware information based directly on your current care schedule and specific instructions.",
      icon: Bot,
      color: "text-cyan-500 bg-cyan-50 border-cyan-100"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Prescription",
      desc: "Patient uploads prescription image",
      icon: FileText,
      activeColor: "border-blue-500 text-blue-500 bg-blue-50/50"
    },
    {
      step: "02",
      title: "AI OCR",
      desc: "AI extracts medicines & frequency",
      icon: Cpu,
      activeColor: "border-cyan-500 text-cyan-500 bg-cyan-50/50"
    },
    {
      step: "03",
      title: "Schedule",
      desc: "System creates medication plan",
      icon: Calendar,
      activeColor: "border-emerald-500 text-emerald-500 bg-emerald-50/50"
    },
    {
      step: "04",
      title: "Smart Reminder",
      desc: "Toggles alerts for schedules",
      icon: Bell,
      activeColor: "border-indigo-500 text-indigo-500 bg-indigo-50/50"
    },
    {
      step: "05",
      title: "Dose Taken/Missed",
      desc: "Action logged dynamically in app",
      icon: CheckCircle,
      activeColor: "border-purple-500 text-purple-500 bg-purple-50/50"
    },
    {
      step: "06",
      title: "Caregiver Alert",
      desc: "Missed dose alerts caregiver",
      icon: Users,
      activeColor: "border-rose-500 text-rose-500 bg-rose-50/50"
    },
    {
      step: "07",
      title: "Analytics",
      desc: "Tracks compliance trends",
      icon: TrendingUp,
      activeColor: "border-teal-500 text-teal-500 bg-teal-50/50"
    },
    {
      step: "08",
      title: "AI Assistance",
      desc: "Asks medical AI queries",
      icon: Bot,
      activeColor: "border-brand-500 text-brand-500 bg-brand-50/50"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-brand-navy flex flex-col font-sans overflow-x-hidden selection:bg-brand-100 selection:text-brand-800">
      
      {/* Top Navbar */}
      <nav className="h-20 max-w-7xl mx-auto w-full px-6 flex items-center justify-between border-b border-slate-200/60">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-cyan-400 flex items-center justify-center shadow-md shadow-brand-500/20">
            <Heart size={18} className="text-white fill-current animate-pulse" />
          </div>
          <span className="font-extrabold text-lg text-brand-navy tracking-tight">CareSync</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigateTo('login')}
            className="text-xs sm:text-sm font-bold text-slate-600 hover:text-brand-navy px-4 py-2 rounded-xl transition-all"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigateTo('signup')}
            className="text-xs sm:text-sm font-bold bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-xl shadow-md shadow-brand-500/10 hover:shadow-brand-500/20 transition-all active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto w-full px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column Text */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold rounded-full">
            <ShieldCheck size={14} className="text-brand-500" />
            <span>Hackathon Presentation Edition</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-brand-navy tracking-tight leading-[1.1]">
            Never Miss a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyan-500">Dose</span> Again.
          </h1>
          
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            CareSync bridges the gap between prescription and protection. An AI-powered tracking platform that extracts schedules, prompts reminders, alerts caregivers, and guides patients with intelligent context.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button 
              onClick={() => navigateTo('signup')}
              className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/20 hover:shadow-brand-500/30 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get Started Now</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => login('patient', 'arjun@caresync.com')}
              className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl shadow-sm transition-all"
            >
              Quick Patient Demo
            </button>
          </div>
          
          <div className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-slate-400 text-xs font-semibold">
            <span className="flex items-center gap-1"><Zap size={14} className="text-amber-500 fill-current" /> AI prescription OCR</span>
            <span className="flex items-center gap-1"><CheckCircle size={14} className="text-emerald-500 fill-current" /> Caregiver SMS alerts</span>
          </div>
        </div>

        {/* Right Column Dashboard Mockup Preview */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl relative select-none">
            
            {/* Header bar mock */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center font-bold text-brand-700">A</div>
                <div>
                  <h4 className="font-bold text-xs text-brand-navy">Arjun Kumar</h4>
                  <p className="text-[10px] text-slate-400">Patient Dashboard</p>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded-lg font-semibold">Compliance: 94%</div>
            </div>

            {/* Med List Mock */}
            <div className="space-y-3">
              <div className="p-3.5 bg-brand-50/30 border border-brand-100 rounded-2xl flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-brand-navy">Amoxicillin 500 mg</h5>
                  <p className="text-[10px] text-slate-500 mt-0.5">08:00 AM • After breakfast</p>
                </div>
                <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Taken ✓</span>
              </div>
              
              <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-brand-navy">Vitamin D3 1000 IU</h5>
                  <p className="text-[10px] text-slate-500 mt-0.5">08:00 PM • With dinner</p>
                </div>
                <span className="bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Upcoming</span>
              </div>
              
              <div className="p-3.5 bg-rose-50/20 border border-rose-100 rounded-2xl flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-rose-950">Metformin 500 mg</h5>
                  <p className="text-[10px] text-rose-900 mt-0.5">09:00 PM • At night</p>
                </div>
                <span className="bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Missed ⚠️</span>
              </div>
            </div>

            {/* Caregiver mock panel overlay */}
            <div className="mt-4 p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></div>
                <div>
                  <p className="font-bold text-[10px] text-rose-400">CAREGIVER ALERT SENT</p>
                  <p className="text-[9px] text-slate-300">Priya Kumar notified of Metformin missed dose</p>
                </div>
              </div>
              <Users size={16} className="text-rose-400" />
            </div>

          </div>
        </div>

      </header>

      {/* Interactive Core Workflow / Journey Map Section */}
      <section className="bg-white border-t border-b border-slate-200/80 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy">The CareSync Care Cycle</h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">
              We connect every critical step of medication compliance, using intelligence to guarantee patient safety.
            </p>
          </div>

          {/* Steps Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 relative"
                >
                  {/* Step bubble */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Step {item.step}</span>
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${item.activeColor}`}>
                      <Icon size={16} />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-sm text-brand-navy leading-none mb-1.5">{item.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{item.desc}</p>
                  
                  {/* Connect arrow lines (except last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden xl:block absolute top-1/2 -right-4 translate-x-1.5 z-10 text-slate-300">
                      <ChevronRight size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy">Designed to Empower Health</h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">
            Combining the absolute ease-of-use needed for elder care with the dynamic, intelligent capabilities of AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div 
                key={index} 
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${feat.color}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-base text-brand-navy mb-2">{feat.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-medium">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Heart size={16} className="text-white fill-current" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-slate-100">CareSync</span>
          </div>
          
          <p className="text-slate-500 text-[10px] font-medium max-w-md text-center md:text-right">
            CareSync is a demonstration UI prototype created for presentation evaluation. This tool does not diagnose diseases or provide certified treatment schedules. Always consult a healthcare professional.
          </p>
        </div>
      </footer>

    </div>
  );
};
