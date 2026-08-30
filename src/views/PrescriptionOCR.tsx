import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Upload, Cpu, Trash2, Edit2, Check, Sparkles, X, Plus } from 'lucide-react';

export const PrescriptionOCR: React.FC = () => {
  const { ocrLoading, ocrResults, simulateOCR, acceptOCRResults, clearOCRResults, updateOCRResults } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  
  // Inline edit state
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDosage, setEditDosage] = useState('');
  const [editFrequency, setEditFrequency] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editInstructions, setEditInstructions] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFileName(file.name);
      simulateOCR(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      simulateOCR(file);
    }
  };



  const startEdit = (idx: number, item: any) => {
    setEditingIndex(idx);
    setEditName(item.name);
    setEditDosage(item.dosage);
    setEditFrequency(item.frequency);
    setEditTime(item.time);
    setEditInstructions(item.instructions);
  };

  const saveEdit = (idx: number) => {
    if (!ocrResults) return;
    const updated = [...ocrResults];
    updated[idx] = {
      name: editName,
      dosage: editDosage,
      frequency: editFrequency,
      time: editTime,
      instructions: editInstructions,
      startDate: ocrResults[idx].startDate,
      endDate: ocrResults[idx].endDate,
    };
    updateOCRResults(updated);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">AI Prescription Scanner</h1>
        <p className="text-slate-500 font-medium text-sm mt-1">Upload a prescription and let CareSync AI automatically extract your medication details.</p>
      </div>

      {/* Main OCR box */}
      {!ocrLoading && !ocrResults && (
        <div className="max-w-xl mx-auto space-y-6 pt-6">
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-200 bg-white
              ${dragActive ? 'border-brand-500 bg-brand-50/20' : 'border-slate-300 hover:border-brand-400 hover:bg-slate-50/30'}
            `}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="hidden" 
            />
            
            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 mx-auto mb-4 shadow-sm">
              <Upload size={24} />
            </div>

            <h3 className="text-sm font-bold text-brand-navy">Drag and drop prescription image</h3>
            <p className="text-slate-500 text-xs mt-1.5 font-medium">Supports JPG, PNG, PDF up to 10MB</p>
            
            <div className="relative py-4 max-w-xs mx-auto">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-slate-400 font-semibold text-[10px]">Or</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Browse Files
              </button>
              
              <button
                type="button"
                id="test-ocr-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFileName("prescription_rx.png");
                  simulateOCR({ name: 'prescription_rx.png' });
                }}
                className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1"
              >
                <Sparkles size={12} />
                <span>Simulate AI OCR</span>
              </button>
            </div>
          </div>


        </div>
      )}

      {/* Loading Scanning State (Laser scan animation!) */}
      {ocrLoading && (
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
          
          {/* Laser Scan Line overlay on document mockup */}
          <div className="w-48 h-64 border border-slate-200 rounded-xl bg-slate-50 mx-auto relative overflow-hidden shadow-inner flex flex-col justify-between p-4 text-left select-none opacity-80">
            {/* Mock text lines inside prescription card */}
            <div className="space-y-2.5">
              <div className="w-2/3 h-3 bg-slate-300 rounded-md"></div>
              <div className="w-1/2 h-2.5 bg-slate-200 rounded-md"></div>
              <div className="h-px bg-slate-200 my-2"></div>
              <div className="w-5/6 h-2 bg-slate-200 rounded-md"></div>
              <div className="w-4/5 h-2 bg-slate-200 rounded-md"></div>
            </div>
            
            <div className="space-y-2">
              <div className="w-full h-3 bg-brand-100 rounded-md"></div>
              <div className="w-2/3 h-2.5 bg-slate-200 rounded-md"></div>
            </div>

            {/* Glowing Scan Line */}
            <div className="ocr-scanner-line"></div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-brand-navy flex items-center justify-center gap-2">
              <Cpu size={16} className="text-brand-500 animate-spin" />
              <span>Analyzing prescription with Gemini AI OCR...</span>
            </h3>
            <p className="text-slate-500 text-xs font-semibold">Extracting active substances, dosage sizes, and schedules</p>
          </div>
        </div>
      )}

      {/* Results State */}
      {!ocrLoading && ocrResults && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-5 rounded-2xl flex items-start gap-3">
            <Sparkles className="text-emerald-500 mt-0.5" size={18} />
            <div>
              <h4 className="font-bold text-xs">AI Extraction Completed</h4>
              <p className="text-xs leading-relaxed font-medium mt-0.5">
                CareSync AI has analyzed <strong>{selectedFileName || 'the prescription'}</strong> and successfully identified structured medication details. Review them below before adding to your schedule.
              </p>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="font-bold text-sm text-brand-navy">AI Extracted Medications</span>
              <button 
                onClick={clearOCRResults} 
                className="text-xs text-slate-400 hover:text-slate-600 font-bold flex items-center gap-1"
              >
                <X size={12} /> Clear Results
              </button>
            </div>

            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase">
                  <th className="px-6 py-4">Medicine</th>
                  <th className="px-6 py-4">Dosage</th>
                  <th className="px-6 py-4">Frequency</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Instructions</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ocrResults.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    {editingIndex === idx ? (
                      /* EDIT MODE ROW */
                      <>
                        <td className="px-6 py-3">
                          <input 
                            type="text" 
                            value={editName} 
                            onChange={(e) => setEditName(e.target.value)} 
                            className="px-2 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-brand-500 w-full"
                          />
                        </td>
                        <td className="px-6 py-3">
                          <input 
                            type="text" 
                            value={editDosage} 
                            onChange={(e) => setEditDosage(e.target.value)} 
                            className="px-2 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-brand-500 w-full"
                          />
                        </td>
                        <td className="px-6 py-3">
                          <input 
                            type="text" 
                            value={editFrequency} 
                            onChange={(e) => setEditFrequency(e.target.value)} 
                            className="px-2 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-brand-500 w-full"
                          />
                        </td>
                        <td className="px-6 py-3">
                          <input 
                            type="text" 
                            value={editTime} 
                            onChange={(e) => setEditTime(e.target.value)} 
                            className="px-2 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-brand-500 w-full"
                          />
                        </td>
                        <td className="px-6 py-3">
                          <input 
                            type="text" 
                            value={editInstructions} 
                            onChange={(e) => setEditInstructions(e.target.value)} 
                            className="px-2 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-brand-500 w-full"
                          />
                        </td>
                        <td className="px-6 py-3 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button 
                              onClick={() => {
                                // Save edit back to the context
                                saveEdit(idx);
                                setEditingIndex(null);
                              }}
                              className="p-1 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg"
                              title="Save"
                            >
                              <Check size={14} />
                            </button>
                            <button 
                              onClick={() => setEditingIndex(null)}
                              className="p-1 text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-lg"
                              title="Cancel"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      /* READ-ONLY MODE ROW */
                      <>
                        <td className="px-6 py-4 font-bold text-brand-navy">{item.name}</td>
                        <td className="px-6 py-4">
                          <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-md">{item.dosage}</span>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-slate-600">{item.frequency}</td>
                        <td className="px-6 py-4 text-xs text-slate-600 font-medium">{item.time}</td>
                        <td className="px-6 py-4 text-xs text-slate-500 font-medium">{item.instructions}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1">
                            <button 
                              onClick={() => startEdit(idx, item)} 
                              className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-all"
                              title="Edit extracted details"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                if (ocrResults) {
                                  const updated = ocrResults.filter((_, i) => i !== idx);
                                  updateOCRResults(updated.length > 0 ? updated : null);
                                }
                              }} 
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                              title="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={acceptOCRResults}
              className="px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-2xl shadow-xl shadow-brand-500/10 transition-all active:scale-95 flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Add All to My Medications</span>
            </button>
            
            <button
              onClick={clearOCRResults}
              className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-2xl transition-all"
            >
              Cancel and Discard
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
