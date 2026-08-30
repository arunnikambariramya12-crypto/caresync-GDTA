import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Medication } from '../context/AppContext';
import { Modal } from '../components/Modal';
import { Pill, Plus, Edit2, Trash2, Eye, Calendar, Clock, Sparkles } from 'lucide-react';

export const MedicationManagerView: React.FC = () => {
  const { medications, addMedication, editMedication, deleteMedication } = useApp();
  
  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Once daily');
  const [time, setTime] = useState('08:00 AM');
  const [instructions, setInstructions] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Medication name is required';
    if (!dosage.trim()) errs.dosage = 'Dosage is required (e.g. 500 mg)';
    if (!time.trim()) errs.time = 'Time is required (e.g. 08:00 AM)';
    if (!startDate) errs.startDate = 'Start date is required';
    if (!endDate) errs.endDate = 'End date is required';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addMedication({
        name,
        dosage,
        frequency,
        time,
        instructions,
        startDate,
        endDate,
      });
      resetForm();
      setIsAddOpen(false);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMed && validateForm()) {
      editMedication(selectedMed.id, {
        name,
        dosage,
        frequency,
        time,
        instructions,
        startDate,
        endDate,
      });
      resetForm();
      setIsEditOpen(false);
    }
  };

  const openEditModal = (med: Medication) => {
    setSelectedMed(med);
    setName(med.name);
    setDosage(med.dosage);
    setFrequency(med.frequency);
    setTime(med.time);
    setInstructions(med.instructions);
    setStartDate(med.startDate);
    setEndDate(med.endDate);
    setErrors({});
    setIsEditOpen(true);
  };

  const openDetailModal = (med: Medication) => {
    setSelectedMed(med);
    setIsDetailOpen(true);
  };

  const resetForm = () => {
    setName('');
    setDosage('');
    setFrequency('Once daily');
    setTime('08:00 AM');
    setInstructions('');
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    setSelectedMed(null);
    setErrors({});
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">Medication Manager</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Review, modify, or schedule your therapeutic treatments.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsAddOpen(true); }}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Medication</span>
        </button>
      </div>

      {/* Main List */}
      {medications.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
          <Pill size={54} className="mx-auto mb-4 text-slate-300 stroke-[1.5]" />
          <h3 className="text-lg font-bold text-brand-navy">No medications configured</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
            You don't have any medications scheduled yet. Add one manually or upload a prescription to scan using AI.
          </p>
          <button
            onClick={() => setIsAddOpen(true)}
            className="mt-5 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
          >
            Create Medication Card
          </button>
        </div>
      ) : (
        <>
          {/* Table for Desktop layout */}
          <div className="hidden lg:block bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Medicine</th>
                  <th className="px-6 py-4">Dosage</th>
                  <th className="px-6 py-4">Schedule</th>
                  <th className="px-6 py-4">Frequency</th>
                  <th className="px-6 py-4">Start / End Date</th>
                  <th className="px-6 py-4">Adherence</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {medications.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
                          <Pill size={16} />
                        </div>
                        <span className="font-bold text-brand-navy">{med.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-md">
                        {med.dosage}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-400" />
                        <span>{med.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-600">{med.frequency}</td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-slate-400" />
                        <span>{med.startDate} to {med.endDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full" 
                            style={{ width: `${med.adherenceRate}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-emerald-600">{med.adherenceRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => openDetailModal(med)} 
                          className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-all"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => openEditModal(med)} 
                          className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => deleteMedication(med.id)} 
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards layout for Mobile/Tablet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {medications.map((med) => (
              <div 
                key={med.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
                      <Pill size={14} />
                    </div>
                    <span className="font-extrabold text-sm text-brand-navy">{med.name}</span>
                  </div>
                  <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-md">
                    {med.dosage}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-slate-100 py-3 font-medium">
                  <div>
                    <p className="text-slate-400">Schedule</p>
                    <p className="text-slate-800 mt-0.5">{med.time}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Frequency</p>
                    <p className="text-slate-800 mt-0.5">{med.frequency}</p>
                  </div>
                  <div className="col-span-2 mt-2">
                    <p className="text-slate-400">Compliance</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full" 
                          style={{ width: `${med.adherenceRate}%` }}
                        />
                      </div>
                      <span className="font-bold text-emerald-600 flex-shrink-0">{med.adherenceRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-semibold">{med.startDate} to {med.endDate}</span>
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => openDetailModal(med)} 
                      className="px-2 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs rounded-xl flex items-center gap-1 transition-all"
                    >
                      <Eye size={12} />
                      <span>Details</span>
                    </button>
                    <button 
                      onClick={() => openEditModal(med)} 
                      className="p-1.5 text-slate-500 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button 
                      onClick={() => deleteMedication(med.id)} 
                      className="p-1.5 text-rose-500 border border-rose-100 bg-rose-50/50 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal Add Medication */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Medication">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Medication Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              placeholder="e.g. Amoxicillin" 
            />
            {errors.name && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Dosage</label>
              <input 
                type="text" 
                value={dosage} 
                onChange={(e) => setDosage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                placeholder="e.g. 500 mg" 
              />
              {errors.dosage && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.dosage}</p>}
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Frequency</label>
              <select 
                value={frequency} 
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              >
                <option value="Once daily">Once daily</option>
                <option value="2x daily">2x daily</option>
                <option value="3x daily">3x daily</option>
                <option value="As needed">As needed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Scheduled Time(s)</label>
            <input 
              type="text" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              placeholder="e.g. 08:00 AM, 08:00 PM" 
            />
            <p className="text-[10px] text-slate-400 mt-1">Separate multiple times with a comma</p>
            {errors.time && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.time}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Instructions</label>
            <textarea 
              value={instructions} 
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all h-20 resize-none"
              placeholder="e.g. Take after breakfast with water"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Start Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
              {errors.startDate && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">End Date</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
              {errors.endDate && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.endDate}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
          >
            Create Schedule
          </button>
        </form>
      </Modal>

      {/* Modal Edit Medication */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Medication Details">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Medication Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
            {errors.name && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Dosage</label>
              <input 
                type="text" 
                value={dosage} 
                onChange={(e) => setDosage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
              {errors.dosage && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.dosage}</p>}
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Frequency</label>
              <select 
                value={frequency} 
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              >
                <option value="Once daily">Once daily</option>
                <option value="2x daily">2x daily</option>
                <option value="3x daily">3x daily</option>
                <option value="As needed">As needed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Scheduled Time(s)</label>
            <input 
              type="text" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
            {errors.time && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.time}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Instructions</label>
            <textarea 
              value={instructions} 
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all h-20 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Start Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">End Date</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
          >
            Save Changes
          </button>
        </form>
      </Modal>

      {/* Modal View Medication Details */}
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Medication Context Summary">
        {selectedMed && (
          <div className="space-y-5 text-sm">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
                <Pill size={20} />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-brand-navy">{selectedMed.name}</h4>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">{selectedMed.dosage}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-2 font-medium">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Frequency</span>
                <span className="text-slate-800 text-xs mt-0.5 block">{selectedMed.frequency}</span>
              </div>
              
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Timing slots</span>
                <span className="text-slate-800 text-xs mt-0.5 block">{selectedMed.time}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Start Date</span>
                <span className="text-slate-800 text-xs mt-0.5 block">{selectedMed.startDate}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">End Date</span>
                <span className="text-slate-800 text-xs mt-0.5 block">{selectedMed.endDate}</span>
              </div>
              
              <div className="col-span-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Instructions</span>
                <p className="text-slate-800 text-xs mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedMed.instructions || "No special instructions provided."}
                </p>
              </div>

              <div className="col-span-2 p-3.5 bg-emerald-50/30 border border-emerald-100 rounded-2xl flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-800">Compliance Rate</span>
                </div>
                <span className="font-extrabold text-emerald-600 text-base">{selectedMed.adherenceRate}%</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
