
import React, { useState } from 'react';
import { useData } from '../App';
import { INITIAL_TOPICS } from '../constants';
import { 
  BookOpen, 
  Target, 
  Zap, 
  Printer, 
  Copy,
  CheckCircle,
  HelpCircle,
  FileEdit,
  Mic2,
  Eye,
  School,
  ClipboardList,
  Layers,
  Sparkles,
  RefreshCw,
  Box,
  Fingerprint,
  ChevronDown,
  ChevronUp,
  Filter,
  Info
} from 'lucide-react';
import { ReinforcementTask } from '../types';

interface TaskCardProps {
  task: ReinforcementTask;
  idx: number;
  viewMode: 'standard' | 'differentiation';
  getTPColor: (tp: number) => string;
  getTaskIcon: (type: string) => React.ReactNode;
  getLevelBadge: (level?: string) => React.ReactNode;
  handleCopyTask: (task: string, id: string) => void;
  copied: string | null;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  idx, 
  viewMode, 
  getTPColor, 
  getTaskIcon, 
  getLevelBadge, 
  handleCopyTask, 
  copied 
}) => {
  const [isExpanded, setIsExpanded] = useState(viewMode === 'differentiation');

  return (
    <div className={`group relative rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${
      isExpanded ? 'bg-white border-indigo-500 shadow-2xl' : 'bg-slate-50 border-slate-100 hover:border-indigo-200'
    }`}>
      {/* Card Header - Always Visible */}
      <div 
        className="p-8 cursor-pointer flex flex-col md:flex-row items-start md:items-center gap-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`w-14 h-14 ${getTPColor(task.tpLevel)} text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shrink-0 transition-transform group-hover:scale-105`}>
          {task.tpLevel}
        </div>
        
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-indigo-600 flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              {getTaskIcon(task.type)}
              <span className="text-[9px] font-black uppercase tracking-widest">{task.type}</span>
            </span>
            {viewMode === 'differentiation' && getLevelBadge(task.diff?.level)}
          </div>
          <h4 className={`text-xl font-black tracking-tight leading-tight transition-colors ${isExpanded ? 'text-indigo-600' : 'text-slate-800'}`}>
            {task.question}
          </h4>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleCopyTask(`${task.question}\n${task.instruction}`, `task-${idx}`);
            }}
            className={`p-3 rounded-xl transition-all ${
              copied === `task-${idx}` 
                ? 'bg-emerald-500 text-white' 
                : 'bg-white text-slate-400 hover:bg-indigo-600 hover:text-white border border-slate-100 shadow-sm'
            }`}
          >
            {copied === `task-${idx}` ? <CheckCircle size={18} /> : <Copy size={18} />}
          </button>
          <div className={`p-2 rounded-lg ${isExpanded ? 'bg-indigo-50 text-indigo-600' : 'text-slate-300'}`}>
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
      </div>

      {/* Card Body - Expandable Content */}
      <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-8 pb-10 space-y-8 animate-in fade-in slide-in-from-top-2 duration-500">
          {/* Instruction Section */}
          <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100">
            <div className="flex items-center gap-2 mb-3 text-slate-400">
              <Info size={14} />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Arahan Terperinci</span>
            </div>
            <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
              "{task.instruction}"
            </p>
          </div>

          {/* Differentiated Strategies Section */}
          {task.diff && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-indigo-50/50 rounded-[2rem] border border-indigo-100/50 space-y-4 flex flex-col items-start group/strat hover:bg-indigo-50 transition-colors">
                <div className="flex items-center gap-3 text-indigo-600">
                  <RefreshCw size={18} className="animate-spin-slow" />
                  <h5 className="text-[10px] font-black uppercase tracking-[0.2em]">Beza Proses</h5>
                </div>
                <p className="text-xs font-bold text-slate-600 leading-relaxed flex-1">
                  {task.diff.process}
                </p>
                <div className="flex items-center gap-2 text-[8px] font-black text-indigo-400 uppercase tracking-widest mt-2 bg-white px-3 py-1 rounded-full border border-indigo-50">
                  <Fingerprint size={10} /> Kaedah Pengajaran
                </div>
              </div>

              <div className="p-8 bg-emerald-50/50 rounded-[2rem] border border-emerald-100/50 space-y-4 flex flex-col items-start group/strat hover:bg-emerald-50 transition-colors">
                <div className="flex items-center gap-3 text-emerald-600">
                  <Box size={18} />
                  <h5 className="text-[10px] font-black uppercase tracking-[0.2em]">Beza Produk</h5>
                </div>
                <p className="text-xs font-bold text-slate-600 leading-relaxed flex-1">
                  {task.diff.product}
                </p>
                <div className="flex items-center gap-2 text-[8px] font-black text-emerald-400 uppercase tracking-widest mt-2 bg-white px-3 py-1 rounded-full border border-emerald-50">
                  <Sparkles size={10} /> Hasil Murid
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ModuleDSKP: React.FC = () => {
  const { data } = useData();
  const [selectedTopicId, setSelectedTopicId] = useState(INITIAL_TOPICS[0].id);
  const [selectedSPKod, setSelectedSPKod] = useState(INITIAL_TOPICS[0].sps[0].kod);
  const [viewMode, setViewMode] = useState<'standard' | 'differentiation'>('differentiation');
  const [levelFilter, setLevelFilter] = useState<'Semua' | 'Rendah' | 'Sederhana' | 'Tinggi'>('Semua');
  const [copied, setCopied] = useState<string | null>(null);

  const selectedTopic = INITIAL_TOPICS.find(t => t.id === selectedTopicId)!;
  const selectedSP = selectedTopic.sps.find(s => s.kod === selectedSPKod)!;

  const filteredTasks = selectedSP.tasks.filter(task => 
    levelFilter === 'Semua' || task.diff?.level === levelFilter
  );

  const handleCopyTask = (task: string, id: string) => {
    navigator.clipboard.writeText(task);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handlePrintModule = () => {
    const element = document.getElementById('printable-module');
    const opt = {
      margin: 10,
      filename: `MODUL_TERBEZA_RBT_F1_SP_${selectedSPKod}_${levelFilter}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // @ts-ignore
    window.html2pdf().from(element).set(opt).save();
  };

  const getTaskIcon = (type: string) => {
    switch(type) {
      case 'Bertulis': return <FileEdit size={16} />;
      case 'Lisan': return <Mic2 size={16} />;
      case 'Pemerhatian': return <Eye size={16} />;
      default: return <HelpCircle size={16} />;
    }
  };

  const getLevelBadge = (level?: string) => {
    switch(level) {
      case 'Rendah': return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-blue-200 shadow-sm">Sokongan</span>;
      case 'Sederhana': return <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-indigo-200 shadow-sm">Pengukuhan</span>;
      case 'Tinggi': return <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-purple-200 shadow-sm">Pengayaan</span>;
      default: return null;
    }
  };

  const getTPColor = (tp: number) => {
    if (tp <= 2) return 'bg-amber-500';
    if (tp <= 4) return 'bg-indigo-600';
    return 'bg-emerald-600';
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">PdP <span className="text-indigo-600">Terbeza</span> RBT</h1>
          <p className="text-slate-500 font-medium mt-2 uppercase tracking-widest text-xs flex items-center gap-2">
            <School size={14} className="text-indigo-400" />
            Integrasi Standard Pembelajaran & Strategi Beza Produk-Proses
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
             <button 
                onClick={() => setViewMode('standard')}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'standard' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
             >
               Standard
             </button>
             <button 
                onClick={() => setViewMode('differentiation')}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'differentiation' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
             >
               Terbeza
             </button>
          </div>
          <button 
            onClick={handlePrintModule}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase transition-all flex items-center gap-3 hover:bg-indigo-600 shadow-xl active:scale-95"
          >
            <Printer size={16} />
            Cetak Lembaran
          </button>
        </div>
      </div>

      {/* Navigation Matrix */}
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
        <div className="flex flex-wrap gap-4 border-b border-slate-100 pb-8">
          {INITIAL_TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopicId(topic.id);
                setSelectedSPKod(topic.sps[0].kod);
              }}
              className={`px-8 py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase transition-all flex items-center gap-3 ${
                selectedTopicId === topic.id 
                  ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/20 translate-y-[-4px]' 
                  : 'bg-slate-50 text-slate-400 hover:text-slate-600 border border-slate-100'
              }`}
            >
              Unit {topic.id}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6">
           <div className="flex flex-wrap gap-3">
             {selectedTopic.sps.map(sp => (
               <button
                 key={sp.kod}
                 onClick={() => setSelectedSPKod(sp.kod)}
                 className={`px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all border ${
                   selectedSPKod === sp.kod 
                     ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                     : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-300'
                 }`}
               >
                 SP {sp.kod}
               </button>
             ))}
           </div>

           {viewMode === 'differentiation' && (
              <div className="flex items-center gap-3 bg-slate-100/50 p-2 rounded-2xl border border-slate-100">
                 <Filter size={14} className="text-slate-400 ml-2" />
                 <div className="flex gap-1">
                    {['Semua', 'Rendah', 'Sederhana', 'Tinggi'].map((lvl) => (
                       <button
                          key={lvl}
                          onClick={() => setLevelFilter(lvl as any)}
                          className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                             levelFilter === lvl ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                          }`}
                       >
                          {lvl}
                       </button>
                    ))}
                 </div>
              </div>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Left: Context Info */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full translate-x-16 -translate-y-16"></div>
            <div className="space-y-12 relative z-10">
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Kandungan DSKP</h3>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] block mb-2">Unit Utama {selectedTopic.id}</span>
                  <p className="font-extrabold text-slate-800 leading-tight text-xl">{selectedTopic.title}</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                    <Target size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Objektif SP</h3>
                </div>
                <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] block mb-2">Standard {selectedSP.kod}</span>
                  <p className="text-sm font-bold text-slate-700 leading-relaxed italic">"{selectedSP.deskripsi}"</p>
                </div>
              </section>

              <div className="p-10 bg-amber-50 rounded-[3rem] border border-amber-100 relative group cursor-default">
                 <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg border border-amber-100 flex items-center justify-center text-amber-500 animate-bounce">
                    <Sparkles size={24} />
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-800 mb-3 flex items-center gap-2">
                    Panduan Terbeza
                 </h4>
                 <p className="text-xs font-bold text-amber-700 leading-relaxed">
                   Strategi **Aktiviti Terbeza** menyasarkan kepelbagaian aras murid. Gunakan **Beza Proses** untuk menyesuaikan kaedah penyampaian and **Beza Produk** untuk mempelbagaikan evidens penguasaan.
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Tasks List - Enhanced with Interactive Cards */}
        <div className="xl:col-span-8">
          <div className="bg-white p-12 rounded-[4.5rem] shadow-sm border border-slate-100 min-h-[600px]">
            <div className="flex items-center justify-between mb-12 border-b border-slate-50 pb-8">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-indigo-600 rounded-[1.2rem] flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <Zap size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Senarai Tugasan</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Latihan Pengukuhan & Aktiviti Amali</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-6 py-2 rounded-full border border-slate-100">
                <Layers size={14} className="text-slate-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{filteredTasks.length} Tugasan Ditemui</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, idx) => (
                  <TaskCard 
                    key={`${selectedSPKod}-${idx}`}
                    task={task}
                    idx={idx}
                    viewMode={viewMode}
                    getTPColor={getTPColor}
                    getTaskIcon={getTaskIcon}
                    getLevelBadge={getLevelBadge}
                    handleCopyTask={handleCopyTask}
                    copied={copied}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-40 text-center bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-100">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-slate-200 mb-8 shadow-inner">
                    <HelpCircle size={48} />
                  </div>
                  <h4 className="text-xl font-black text-slate-400 uppercase tracking-widest">Tiada Tugasan Tersedia</h4>
                  <p className="text-xs font-bold text-slate-300 uppercase mt-2">Sila tukar aras tapisan atau pilih Standard Pembelajaran lain.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Printable Module */}
      <div className="hidden">
        <div id="printable-module" className="p-20 bg-white text-slate-950 font-sans min-h-[1100px]">
          <div className="flex justify-between items-center border-b-8 border-slate-900 pb-12 mb-16">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter">Lembaran Kerja Terbeza RBT</h1>
              <div className="flex items-center gap-4 mt-3">
                 <span className="bg-slate-900 text-white px-4 py-1 rounded text-[10px] font-black uppercase">DOKUMEN RASMI</span>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em]">MyPBD Edisi Eksklusif • 2026/2027</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-xl uppercase tracking-tighter">{data.userProfile.schoolName}</p>
              <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest mt-1">Silibus KSSM • Tingkatan 1</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 mb-16 border-b-2 border-slate-100 pb-12 text-[12px] font-black uppercase">
             <div className="space-y-4">
               <p>Nama Murid: _________________________________________</p>
               <p>Kelas: _________________</p>
             </div>
             <div className="space-y-4">
               <p>Tarikh: _________________</p>
               <p>Aras: {levelFilter === 'Semua' ? 'Kepelbagaian Aras' : levelFilter}</p>
             </div>
          </div>

          <div className="mb-16 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200">
            <p className="text-[10px] font-black uppercase text-indigo-600 mb-3 tracking-widest">Maklumat Standard Kurikulum</p>
            <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Bab {selectedTopic.id}: {selectedTopic.title}</h2>
            <p className="font-bold text-sm italic">Standard Pembelajaran: {selectedSP.kod} {selectedSP.deskripsi}</p>
          </div>

          <div className="space-y-20">
             {filteredTasks.map((task, i) => (
               <div key={i} className="space-y-8 page-break-inside-avoid relative">
                  <div className="flex items-start gap-6">
                    <span className="w-12 h-12 bg-slate-950 text-white rounded-xl flex items-center justify-center font-black text-xl shrink-0">TP{task.tpLevel}</span>
                    <div className="space-y-4 flex-1">
                      <h3 className="font-black text-2xl leading-tight">{task.question}</h3>
                      <div className="flex items-center gap-4">
                         <span className="text-[10px] font-black uppercase bg-indigo-50 px-4 py-1 rounded text-indigo-600">ARAHAN: {task.instruction}</span>
                         {task.diff && (
                           <span className="text-[10px] font-black uppercase bg-emerald-50 px-4 py-1 rounded text-emerald-600">ARAS: {task.diff.level}</span>
                         )}
                      </div>
                    </div>
                  </div>
                  
                  {task.diff && (
                    <div className="ml-16 p-6 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex gap-12 italic">
                       <span>PROSES: {task.diff.process}</span>
                       <span>PRODUK: {task.diff.product}</span>
                    </div>
                  )}

                  <div className="ml-16 h-80 border-2 border-slate-200 rounded-[2rem] relative bg-slate-50/10">
                    <div className="absolute top-6 left-6 text-[9px] font-black text-slate-200 uppercase tracking-[0.5em] transform -rotate-90 origin-left">
                       Ruangan Jawapan / Lakaran Produk
                    </div>
                    <div className="absolute bottom-6 right-8">
                       <div className="w-48 border-b border-slate-200 mb-2"></div>
                       <p className="text-[9px] text-slate-300 font-black text-center">PENGESAHAN GURU</p>
                    </div>
                  </div>
               </div>
             ))}
          </div>

          <div className="mt-40 pt-16 border-t-4 border-slate-900 flex justify-between items-end">
             <div className="text-center">
               <div className="w-64 border-b-2 border-slate-900 mb-3"></div>
               <p className="text-[11px] font-black uppercase tracking-widest">Tandatangan Murid</p>
             </div>
             <div className="text-center">
                <div className="w-32 h-32 border-4 border-slate-100 rounded-full flex items-center justify-center mb-6">
                   <p className="text-[10px] font-black text-slate-200 uppercase">CAP SEKOLAH</p>
                </div>
             </div>
             <div className="text-center">
               <div className="w-64 border-b-2 border-slate-900 mb-3"></div>
               <p className="text-[11px] font-black uppercase tracking-widest">{data.userProfile.teacherName}</p>
               <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">GURU MATA PELAJARAN RBT</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDSKP;
