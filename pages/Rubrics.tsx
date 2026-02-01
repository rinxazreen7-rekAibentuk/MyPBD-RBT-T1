
import React, { useState } from 'react';
import { useData } from '../App';
import { INITIAL_TOPICS } from '../constants';
import { Edit3, RotateCcw, Save, Search } from 'lucide-react';

const Rubrics: React.FC = () => {
  const { data, saveData } = useData();
  const [selectedTopicId, setSelectedTopicId] = useState(INITIAL_TOPICS[0].id);
  const [localRubrics, setLocalRubrics] = useState(data.customRubrics[selectedTopicId]);

  const handleTopicChange = (id: string) => {
    setSelectedTopicId(id);
    setLocalRubrics(data.customRubrics[id]);
  };

  const handleUpdate = (tp: number, text: string) => {
    const updated = localRubrics.map(r => r.tp === tp ? { ...r, deskripsi: text } : r);
    setLocalRubrics(updated);
  };

  const handleSave = () => {
    const newCustomRubrics = { ...data.customRubrics, [selectedTopicId]: localRubrics };
    saveData({ ...data, customRubrics: newCustomRubrics });
    alert("Rubrik berjaya dikemaskini!");
  };

  const handleReset = () => {
    const defaultTopic = INITIAL_TOPICS.find(t => t.id === selectedTopicId)!;
    setLocalRubrics(defaultTopic.tps);
    const newCustomRubrics = { ...data.customRubrics, [selectedTopicId]: defaultTopic.tps };
    saveData({ ...data, customRubrics: newCustomRubrics });
    alert("Rubrik telah dikembalikan ke tetapan asal DSKP.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Kriteria PBD</h3>
            <p className="text-slate-500 mt-1">Kemaskini Standard Prestasi (Rubrik) mengikut keperluan kelas.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition-all border border-rose-100"
            >
              <RotateCcw size={18} />
              RESET DEFAULT
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-xl transition-all"
            >
              <Save size={18} />
              SIMPAN SEMUA
            </button>
          </div>
        </div>

        <div className="mb-10">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3">Pilih Bab RBT</label>
          <div className="flex flex-wrap gap-3">
            {INITIAL_TOPICS.map(topic => (
              <button
                key={topic.id}
                onClick={() => handleTopicChange(topic.id)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all border ${
                  selectedTopicId === topic.id 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
                    : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-white hover:border-indigo-200'
                }`}
              >
                Bab {topic.id}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localRubrics.map((rubric) => (
            <div key={rubric.tp} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4 group">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-indigo-600 shadow-sm border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {rubric.tp}
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Tahap Penguasaan {rubric.tp}</span>
                </div>
                <Edit3 size={16} className="text-slate-300" />
              </div>
              <textarea 
                className="w-full p-6 rounded-3xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700 leading-relaxed min-h-[120px]"
                value={rubric.deskripsi}
                onChange={(e) => handleUpdate(rubric.tp, e.target.value)}
                placeholder={`Deskripsi untuk TP ${rubric.tp}...`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rubrics;
