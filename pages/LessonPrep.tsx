
import React, { useState } from 'react';
import { useData } from '../App';
import { INITIAL_TOPICS } from '../constants';
import { 
  Copy, 
  CheckCircle2, 
  Target, 
  Users, 
  Monitor,
  Zap
} from 'lucide-react';

const LessonPrep: React.FC = () => {
  const { data } = useData();
  const [selectedTopicId, setSelectedTopicId] = useState(INITIAL_TOPICS[0].id);
  const [selectedSPKod, setSelectedSPKod] = useState(INITIAL_TOPICS[0].sps[0].kod);
  const [copied, setCopied] = useState(false);

  // Fallback to avoid crashes if topic/sp not found
  const selectedTopic = INITIAL_TOPICS.find(t => t.id === selectedTopicId) || INITIAL_TOPICS[0];
  const selectedSP = selectedTopic.sps.find(s => s.kod === selectedSPKod) || selectedTopic.sps[0];

  const handleCopy = () => {
    const rphText = `
RANCANGAN PENGAJARAN HARIAN (RPH) RBT F1
========================================
GURU: ${data.userProfile.teacherName}
SEKOLAH: ${data.userProfile.schoolName}
SUBJEK: REKA BENTUK DAN TEKNOLOGI

TOPIK: ${selectedTopic.id} ${selectedTopic.title}
SP: ${selectedSP.kod} ${selectedSP.deskripsi}

1. SET INDUKSI:
   ${selectedTopic.induksi}

2. OBJEKTIF: 
   ${selectedTopic.rphTemplate}

3. AKTIVITI UTAMA (PAK-21):
   - Umum: ${selectedTopic.aktivitiUtama.umum}
   - Murid Lelaki: ${selectedTopic.aktivitiUtama.lelaki}
   - Murid Perempuan: ${selectedTopic.aktivitiUtama.perempuan}

4. ELEMEN 5C + 1C:
   ${selectedTopic.aktivitiUtama.elemen5C.join(", ")}

5. CADANGAN AKTIVITI PdP:
   ${selectedTopic.activities}
    `;
    navigator.clipboard.writeText(rphText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Selection Column */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 sticky top-32">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Target size={20} />
              </div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Konfigurasi RPH</h3>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Bab / Unit Utama</label>
                <select 
                  className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-bold text-slate-700 transition-all"
                  value={selectedTopicId}
                  onChange={(e) => {
                    const topicId = e.target.value;
                    setSelectedTopicId(topicId);
                    const t = INITIAL_TOPICS.find(x => x.id === topicId);
                    if(t) setSelectedSPKod(t.sps[0].kod);
                  }}
                >
                  {INITIAL_TOPICS.map(t => (
                    <option key={t.id} value={t.id}>BAB {t.id}: {t.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Standard Pembelajaran (SP)</label>
                <select 
                  className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-bold text-slate-700 transition-all"
                  value={selectedSPKod}
                  onChange={(e) => setSelectedSPKod(e.target.value)}
                >
                  {selectedTopic.sps.map(s => (
                    <option key={s.kod} value={s.kod}>{s.kod}: {s.deskripsi}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleCopy}
                className={`w-full py-6 rounded-2xl flex items-center justify-center gap-3 font-black transition-all shadow-xl text-xs tracking-widest ${
                  copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-indigo-600'
                }`}
              >
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                {copied ? 'BERJAYA DISALIN' : 'SALIN RPH LENGKAP'}
              </button>
            </div>
          </div>
        </div>

        {/* Display Column */}
        <div className="xl:col-span-8 space-y-8">
          <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-200 relative overflow-hidden">
            {/* Header Plate */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-8 border-b border-slate-100">
               <div>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-3">
                    Strategi PAK-21 Bersepadu
                  </span>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">Rancangan Pengajaran Harian</h3>
                  <p className="text-slate-400 font-medium text-sm mt-1 uppercase tracking-wider italic">RBT Tingkatan 1 • Sesi PdP 2026</p>
               </div>
               <div className="hidden md:block">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300">
                     <Monitor size={32} />
                  </div>
               </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-12">
              {/* Section 1: Induction */}
              <section className="group">
                <div className="flex items-center gap-3 mb-5">
                   <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xs transition-transform group-hover:scale-110">1</div>
                   <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Set Induksi (3 Minit)</h4>
                </div>
                <div className="p-6 rounded-3xl bg-amber-50/30 border border-amber-100/50">
                  <p className="text-slate-700 leading-relaxed font-medium italic">"{selectedTopic.induksi}"</p>
                </div>
              </section>

              {/* Section 2: Main Activities with Gender Split */}
              <section className="group">
                <div className="flex items-center gap-3 mb-5">
                   <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs transition-transform group-hover:scale-110">2</div>
                   <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Aktiviti Utama & Pembahagian Tugas</h4>
                </div>
                <div className="space-y-4">
                   <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Langkah 1: Umum</p>
                      <p className="text-slate-700 font-semibold">{selectedTopic.aktivitiUtama.umum}</p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                           <Users size={14} className="text-blue-600" />
                           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Kumpulan Lelaki</p>
                        </div>
                        <p className="text-xs text-blue-900 font-bold leading-relaxed">{selectedTopic.aktivitiUtama.lelaki}</p>
                      </div>
                      <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-100">
                        <div className="flex items-center gap-2 mb-3">
                           <Users size={14} className="text-rose-600" />
                           <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Kumpulan Perempuan</p>
                        </div>
                        <p className="text-xs text-rose-900 font-bold leading-relaxed">{selectedTopic.aktivitiUtama.perempuan}</p>
                      </div>
                   </div>
                </div>
              </section>

              {/* Section 3: 5C + 1C Elements */}
              <section className="group">
                <div className="flex items-center gap-3 mb-5">
                   <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs transition-transform group-hover:scale-110">3</div>
                   <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Elemen PAK-21 (5C + 1C)</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                   {selectedTopic.aktivitiUtama.elemen5C.map((el, i) => (
                     <span key={i} className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-[10px] font-black text-slate-600 uppercase tracking-wider hover:border-emerald-500 hover:text-emerald-600 transition-all cursor-default">
                        {el}
                     </span>
                   ))}
                </div>
              </section>

              {/* Section 4: Activities Summary */}
              <section className="group">
                <div className="flex items-center gap-3 mb-5">
                   <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs transition-transform group-hover:scale-110">4</div>
                   <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Cadangan Aktiviti Pengukuhan</h4>
                </div>
                <div className="p-8 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6"><Zap size={24} /></div>
                    <p className="text-slate-700 font-bold leading-relaxed">{selectedTopic.activities}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPrep;
