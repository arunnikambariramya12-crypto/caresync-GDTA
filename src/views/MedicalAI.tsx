import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, User, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

export const MedicalAI: React.FC = () => {
  const { medicalChat, sendMedicalMessage, medications } = useApp();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [medicalChat, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMedicalMessage(inputText);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (prompt: string) => {
    setInputText(prompt);
  };

  const suggestionPrompts = [
    "Can I take Vitamin D3 after dinner?",
    "What is the schedule for Amoxicillin?",
    "Instructions for taking Metformin?",
    "Any warnings for Paracetamol?"
  ];

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col gap-4 animate-in fade-in duration-300">
      
      {/* Context Banner */}
      <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-brand-500 animate-pulse" size={16} />
          <div>
            <h3 className="text-xs font-bold text-brand-navy uppercase tracking-wider">AI Medical Context Loaded</h3>
            <p className="text-[10px] text-slate-500 font-semibold">Assistant is aware of your current schedule.</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {medications.map(med => (
            <span key={med.id} className="bg-brand-50 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-brand-100/50">
              {med.name} {med.dosage}
            </span>
          ))}
        </div>
      </div>

      {/* Main chat body */}
      <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col overflow-hidden relative">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-4">
          {medicalChat.map((msg) => (
            <div 
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border select-none
                ${msg.sender === 'user' 
                  ? 'bg-slate-100 border-slate-200 text-slate-700' 
                  : 'bg-brand-50 border-brand-100 text-brand-600'
                }
              `}>
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>

              {/* Message text */}
              <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed font-medium
                ${msg.sender === 'user' 
                  ? 'bg-brand-500 text-white rounded-tr-none shadow-md shadow-brand-500/10' 
                  : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
                }
              `}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className={`text-[9px] block mt-1.5 text-right font-semibold ${msg.sender === 'user' ? 'text-brand-100' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 flex-shrink-0">
                <Bot size={14} />
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></span>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Suggested prompts list (Only shown if chat is brief) */}
        {medicalChat.length <= 2 && (
          <div className="border-t border-slate-100 pt-4 pb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 mb-2.5">
              <HelpCircle size={12} /> Suggested Questions
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestionPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(p)}
                  className="px-3.5 py-2 border border-slate-200 hover:border-brand-300 hover:bg-brand-50/20 text-slate-600 hover:text-brand-600 font-bold text-xs rounded-xl transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input box */}
        <form onSubmit={handleSend} className="border-t border-slate-100 pt-4 flex gap-2.5">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
            placeholder="Ask a question about your medication schedule..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-brand-500 focus:bg-white transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="w-12 h-12 bg-brand-500 hover:bg-brand-600 text-white rounded-xl shadow-lg shadow-brand-500/10 flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
          >
            <Send size={16} />
          </button>
        </form>

      </div>

      {/* Medical advice disclaimer */}
      <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-2xl flex items-start gap-2.5 text-slate-500">
        <AlertCircle size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
        <p className="text-[10px] leading-relaxed font-semibold">
          Disclaimer: This assistant provides general educational information and does not replace professional medical advice, diagnosis, or treatment. Always consult with a doctor or certified healthcare practitioner before adjusting your medication plans.
        </p>
      </div>

    </div>
  );
};
