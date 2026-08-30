import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, User, HelpCircle } from 'lucide-react';

export const GeneralChat: React.FC = () => {
  const { generalChat, sendGeneralMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [generalChat, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendGeneralMessage(inputText);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestionClick = (prompt: string) => {
    setInputText(prompt);
  };

  const suggestionPrompts = [
    "Help me plan my day",
    "Explain something simply",
    "Create a wellness checklist",
    "Help me write a message to my caregiver"
  ];

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col gap-4 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">General AI Assistant</h1>
        <p className="text-slate-500 font-medium text-sm mt-1">Ask me anything. Explore planning, writing messages, or creating schedules.</p>
      </div>

      {/* Main chat body */}
      <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col overflow-hidden relative">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-4">
          {generalChat.map((msg) => (
            <div 
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border select-none
                ${msg.sender === 'user' 
                  ? 'bg-slate-100 border-slate-200 text-slate-700' 
                  : 'bg-cyan-50 border-cyan-100 text-cyan-600'
                }
              `}>
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>

              {/* Message text */}
              <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed font-medium
                ${msg.sender === 'user' 
                  ? 'bg-cyan-600 text-white rounded-tr-none shadow-md shadow-cyan-600/10' 
                  : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
                }
              `}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className={`text-[9px] block mt-1.5 text-right font-semibold ${msg.sender === 'user' ? 'text-cyan-100' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 flex-shrink-0">
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

        {/* Suggested prompts list */}
        {generalChat.length <= 2 && (
          <div className="border-t border-slate-100 pt-4 pb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 mb-2.5">
              <HelpCircle size={12} /> Starter Prompts
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestionPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(p)}
                  className="px-3.5 py-2 border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/20 text-slate-600 hover:text-cyan-600 font-bold text-xs rounded-xl transition-all"
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
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-cyan-500 focus:bg-white transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="w-12 h-12 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl shadow-lg shadow-cyan-600/10 flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
          >
            <Send size={16} />
          </button>
        </form>

      </div>

    </div>
  );
};
