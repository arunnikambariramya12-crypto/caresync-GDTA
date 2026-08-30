import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Reminder } from '../context/AppContext';
import { Modal } from '../components/Modal';
import { Bell, Plus, Edit2, Trash2, Clock } from 'lucide-react';

export const Reminders: React.FC = () => {
  const { reminders, toggleReminder, addReminder, editReminder, deleteReminder } = useApp();
  
  // Modal toggle state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('08:00 AM');
  const [frequency, setFrequency] = useState('Once daily');
  const [instructions, setInstructions] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Medication name is required';
    if (!dosage.trim()) errs.dosage = 'Dosage is required';
    if (!time.trim()) errs.time = 'Time is required';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addReminder({
        medicationId: `custom-rem-${Date.now()}`,
        name,
        dosage,
        time,
        frequency,
        instructions,
        enabled: true,
      });
      resetForm();
      setIsAddOpen(false);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedReminder && validateForm()) {
      editReminder(selectedReminder.id, {
        name,
        dosage,
        time,
        frequency,
        instructions,
      });
      resetForm();
      setIsEditOpen(false);
    }
  };

  const openEditModal = (rem: Reminder) => {
    setSelectedReminder(rem);
    setName(rem.name);
    setDosage(rem.dosage);
    setTime(rem.time);
    setFrequency(rem.frequency);
    setInstructions(rem.instructions);
    setErrors({});
    setIsEditOpen(true);
  };

  const resetForm = () => {
    setName('');
    setDosage('');
    setTime('08:00 AM');
    setFrequency('Once daily');
    setInstructions('');
    setSelectedReminder(null);
    setErrors({});
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">Medication Reminders</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Manage notifications and alarm schedules for your dosage plans.</p>
        </div>
        
        <button
          onClick={() => { resetForm(); setIsAddOpen(true); }}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-2xl shadow-lg transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* Reminders List */}
      {reminders.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
          <Bell size={54} className="mx-auto mb-4 text-slate-300 stroke-[1.5]" />
          <h3 className="text-lg font-bold text-brand-navy">No reminders configured</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
            Enable medication alarms to receive desktop alerts and caregiver notifications.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reminders.map((item) => (
            <div 
              key={item.id}
              className={`
                bg-white border p-6 rounded-3xl shadow-sm transition-all duration-200 flex flex-col justify-between gap-4 hover:shadow-md
                ${item.enabled ? 'border-slate-200' : 'border-slate-200 opacity-60 bg-slate-50/50'}
              `}
            >
              
              {/* Header inside card */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${item.enabled ? 'bg-brand-50 border-brand-100 text-brand-600' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                    <Bell size={18} className={item.enabled ? 'animate-bounce' : ''} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-brand-navy">{item.name}</span>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{item.dosage}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-semibold capitalize tracking-wide">{item.frequency}</p>
                  </div>
                </div>

                {/* Enable toggle switch */}
                <button
                  onClick={() => toggleReminder(item.id)}
                  className={`
                    w-12 h-6.5 rounded-full p-1 transition-colors duration-200 focus:outline-none flex items-center
                    ${item.enabled ? 'bg-brand-500 justify-end' : 'bg-slate-300 justify-start'}
                  `}
                  aria-label={`Toggle reminder for ${item.name}`}
                >
                  <span className="w-4.5 h-4.5 bg-white rounded-full shadow-md"></span>
                </button>
              </div>

              {/* Time & instructions detail */}
              <div className="text-xs text-slate-500 font-medium bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-brand-500 font-bold">
                  <Clock size={14} />
                  <span>{item.time}</span>
                </div>
                <div className="truncate max-w-[200px] text-slate-500">{item.instructions || "No special instructions"}</div>
              </div>

              {/* Actions footer */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="text-[9px] text-slate-400 font-semibold tracking-wide">CAREGIVER SYNC ENABLED</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-all"
                    title="Edit timer"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => deleteReminder(item.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                    title="Delete timer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Modal Add Reminder */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Create Reminder Timer">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Medication Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              placeholder="e.g. Paracetamol" 
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
                placeholder="e.g. 650 mg" 
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
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Alert Time</label>
            <input 
              type="text" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              placeholder="e.g. 08:00 AM" 
            />
            {errors.time && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.time}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Special Instructions</label>
            <input 
              type="text" 
              value={instructions} 
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              placeholder="e.g. Take after breakfast" 
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
          >
            Create Alarm
          </button>
        </form>
      </Modal>

      {/* Modal Edit Reminder */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Update Alarm Timer">
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
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Alert Time</label>
            <input 
              type="text" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
            {errors.time && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.time}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Special Instructions</label>
            <input 
              type="text" 
              value={instructions} 
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
          >
            Save Alarm Details
          </button>
        </form>
      </Modal>

    </div>
  );
};
