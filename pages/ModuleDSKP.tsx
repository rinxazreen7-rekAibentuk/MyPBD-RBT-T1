
import React, { useState, useEffect } from 'react';
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
  Layers,
  Sparkles,
  RefreshCw,
  Box,
  Fingerprint,
  ChevronDown,
  ChevronUp,
  Filter,
  Info,
  Maximize2,
  Minimize2
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
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync expanded state with viewMode but allow manual toggle
  useEffect(() => {
    setIsExpanded(viewMode === 'differentiation');
  }, [viewMode]);

  return (
    <div className={`group relative rounded-[2rem] border-2 transition-all duration-500 ease-out overflow-hidden ${
      isExpanded 
        ? 'bg-white border-indigo-500 shadow-[0_20px_50px_rgba(79,70,229,0.15)] ring-1 ring-indigo-500/10' 
        : 'bg-slate-50/50 border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-xl'
    }`}>
      {/* Top Progress-like Bar for TP */}
      <div className={`h-1.5 w-full ${getTPColor(task.tpLevel)} opacity-80`} />

      {/* Card Header */}
      <div 
        className="p-6 md:p-8 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* TP Avatar */}
          <div className={`w-16 h-16 ${getTPColor(task.tpLevel)} text-white rounded-[1.25rem] flex flex-col items-center justify-center shadow-lg shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2`}>
            <span className="text-[10px] font-black opacity-60 leading-none mb-1">TP</span>
            <span className="text-3xl font-black leading-none">{task.tpLevel}</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                <span className="text-indigo-600">{getTaskIcon(task.type)}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{task.type}</span>
              </div>
              {getLevelBadge(task.diff?.level)}
            </div>
            
            <h4 className={`text-xl md:text-2xl font-black tracking-tight leading-tight transition-colors duration-300 ${
              isExpanded ? 'text-slate-900' : 'text-slate-700'
            }`}>
              {task.question}
            </h4>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center ml-auto">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleCopyTask(`${task.question}\n${task.instruction}`, `task-${idx}`);
              }}
              className={`p-3.5 rounded-2xl transition-all duration-300 ${
                copied === `task-${idx}` 
                  ? 'bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-200' 
                  : 'bg-white text-slate-400 hover:bg-indigo-600 hover:text-white border border-slate-100 shadow-sm active:scale-90'
              }`}
              title="Salin Tugasan"
            >
              {copied === `task-${idx}` ? <CheckCircle size={20} /> : <Copy size={20} />}
            </button>
            <div className={`p-3 rounded-2xl transition-all duration-300 ${
              isExpanded ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
            }`}>
              {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Content Area */}
      <div className={`grid transition-all duration-500 ease-in-out ${
        isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}>
        <div className="overflow-hidden">
          <div className="p-6 md:p-8 pt-0 space-y-8">
            <div className="h-px bg-slate-100 w-full" />
            
            {/* Instruction Detail */}
            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 relative group/instruction">
              <div className="absolute -top-3 left-8 bg-white px-4 py-1 rounded-full border border-slate-100 shadow-sm flex items-center gap-2">
                <Info size={12} className="text-indigo-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Arahan Guru</span>
              </div>
              <p className="text-base font-bold text-slate-600 leading-relaxed italic">
                "{task.instruction}"
              </p>
            </div>

            {/* Differentiated Cards */}
            {task.diff && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Process Card */}
                <div className="relative p-8 bg-gradient-to-br from-indigo-50/50 to-white rounded-[2.5rem] border border-indigo-100/50 flex flex-col items-start hover:shadow-lg transition-all duration-500 group/process">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover/process:animate-pulse">
                      <RefreshCw size={22} />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Beza Proses</h5>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Strategi Penyampaian</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-600 leading-relaxed flex-1">
                    {task.diff.process}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[8px] font-black text-indigo-400 uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border border-indigo-50 shadow-sm">
                    <Fingerprint size={12} /> Personalized Learning
                  </div>
                </div>

                {/* Product Card */}
                <div className="relative p-8 bg-gradient-to-br from-emerald-50/50 to-white rounded-[2.5rem] border border-emerald-100/50 flex flex-col items-start hover:shadow-lg transition-all duration-500 group/product">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover/product:scale-110 transition-transform">
                      <Box size={22} />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Beza Produk</h5>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Hasil Pembelajaran</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-600 leading-relaxed flex-1">
                    {task.diff.product}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[8px] font-black text-emerald-400 uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border border-emerald-50 shadow-sm">
                    <Sparkles size={12} /> Student Choice
                  </div>
                </div>
              </div>
            )}
          </div>
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
      case 'Rendah': return <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-blue-100 shadow-sm">Aras Rendah</span>;
      case 'Sederhana': return <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-indigo-100 shadow-sm">Aras Sederhana</span>;
      case 'Tinggi': return <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-purple-100 shadow-sm">Aras Tinggi</span>;
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">PdP <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Terbeza</span> RBT</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
            <School size={14} className="text-indigo-400" />
            Strategi Differentiated Instruction (DI) • Edisi 2026
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex bg-white p-2 rounded-[1.5rem] border border-slate-200 shadow-sm">
             <button 
                onClick={() => setViewMode('standard')}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${viewMode === 'standard' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
             >
               Standard
             </button>
             <button 
                onClick={() => setViewMode('differentiation')}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${viewMode === 'differentiation' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
             >
               Terbeza
             </button>
          </div>
          <button 
            onClick={handlePrintModule}
            className="px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-[10px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-3 hover:bg-indigo-600 hover:shadow-2xl shadow-xl active:scale-95"
          >
            <Printer size={18} />
            Cetak Modul
          </button>
        </div>
      </div>

      {/* Navigation Matrix */}
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-10">
        <div className="flex flex-wrap gap-4 border-b border-slate-100 pb-10">
          {INITIAL_TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopicId(topic.id);
                setSelectedSPKod(topic.sps[0].kod);
              }}
              className={`px-10 py-5 rounded-[1.75rem] font-black text-[10px] tracking-[0.2em] uppercase transition-all duration-500 flex items-center gap-3 ${
                selectedTopicId === topic.id 
                  ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 -translate-y-1' 
                  : 'bg-slate-50 text-slate-400 hover:text-slate-600 border border-slate-100'
              }`}
            >
              Unit {topic.id}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
           <div className="flex flex-wrap gap-3">
             {selectedTopic.sps.map(sp => (
               <button
                 key={sp.kod}
                 onClick={() => setSelectedSPKod(sp.kod)}
                 className={`px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 border ${
                   selectedSPKod === sp.kod 
                     ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                     : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-300 hover:text-indigo-600'
                 }`}
               >
                 SP {sp.kod}
               </button>
             ))}
           </div>

           {viewMode === 'differentiation' && (
              <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-[1.5rem] border border-slate-100">
                 <div className="flex items-center gap-2 text-slate-400 ml-4">
                    <Filter size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Filter Aras:</span>
                 </div>
                 <div className="flex gap-2">
                    {['Semua', 'Rendah', 'Sederhana', 'Tinggi'].map((lvl) => (
                       <button
                          key={lvl}
                          onClick={() => setLevelFilter(lvl as any)}
                          className={`px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                             levelFilter === lvl 
                                ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-200' 
                                : 'text-slate-400 hover:text-slate-600'
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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        
        {/* Left: Context Info Area */}
        <div className="xl:col-span-4 space-y-10">
          <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/50 rounded-full translate-x-24 -translate-y-24 blur-2xl"></div>
            <div className="space-y-16 relative z-10">
              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                    <BookOpen size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight leading-none">Standard Kandungan</h3>
                </div>
                <div className="p-10 bg-slate-50/80 rounded-[3rem] border border-slate-100 shadow-inner group cursor-default transition-all duration-500 hover:bg-white hover:shadow-xl">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] block mb-4">Unit {selectedTopic.id} • KSSM</span>
                  <p className="font-extrabold text-slate-900 leading-tight text-2xl group-hover:text-indigo-600 transition-colors">{selectedTopic.title}</p>
                </div>
              </section>

              <section className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-100">
                    <Target size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight leading-none">Objektif SP</h3>
                </div>
                <div className="p-10 bg-emerald-50/30 rounded-[3rem] border border-emerald-100/50 hover:bg-emerald-50/50 transition-all duration-500">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] block mb-4">Standard {selectedSP.kod}</span>
                  <p className="text-base font-bold text-slate-700 leading-relaxed italic">"{selectedSP.deskripsi}"</p>
                </div>
              </section>

              <div className="p-10 bg-amber-50/80 rounded-[3rem] border border-amber-100 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles size={120} className="text-amber-800" />
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-800 mb-4 flex items-center gap-2 relative z-10">
                    <Info size={14} className="animate-bounce" /> 
                    Pedagogi Terbeza
                 </h4>
                 <p className="text-xs font-bold text-amber-700 leading-relaxed relative z-10">
                   Sesuaikan **Proses** pembelajaran (aktiviti) dan **Produk** (hasil) bagi menyantuni kepelbagaian tahap kesediaan murid di dalam satu kelas yang sama.
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Task List */}
        <div className="xl:col-span-8">
          <div className="bg-white p-12 rounded-[4.5rem] shadow-sm border border-slate-100 min-h-[700px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6 border-b border-slate-50 pb-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-950 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl">
                  <Zap size={32} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Koleksi Tugasan</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Sokongan Pentaksiran Bilik Darjah (PBD)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-8 py-3 rounded-full border border-slate-100">
                <Layers size={16} className="text-indigo-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{filteredTasks.length} Tugasan Relevan</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
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
                <div className="flex flex-col items-center justify-center py-48 text-center bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-100">
                  <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center text-slate-200 mb-10 shadow-inner">
                    <HelpCircle size={56} />
                  </div>
                  <h4 className="text-2xl font-black text-slate-400 uppercase tracking-widest">Data Tidak Ditemui</h4>
                  <p className="text-xs font-bold text-slate-300 uppercase mt-3 tracking-widest">Sila ubah aras tapisan atau tukar Standard Pembelajaran.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Printable Module Section */}
      <div className="hidden">
        <div id="printable-module" className="p-20 bg-white text-slate-950 font-sans min-h-[1100px]">
          <div className="flex justify-between items-center border-b-[10px] border-slate-900 pb-14 mb-20">
            <div>
              <h1 className="text-5xl font-black uppercase tracking-tighter">Lembaran Kerja Terbeza</h1>
              <div className="flex items-center gap-4 mt-4">
                 <span className="bg-slate-900 text-white px-5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">DOKUMEN PBD RASMI</span>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em]">MyPBD Edisi Terbeza • RBT Tingkatan 1</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-2xl uppercase tracking-tighter">{data.userProfile.schoolName}</p>
              <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest mt-2">Penyelarasan DSKP & DI Strategi</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-16 mb-20 border-b-2 border-slate-100 pb-16 text-[14px] font-black uppercase">
             <div className="space-y-6">
               <p>Nama Murid: _________________________________________</p>
               <p>Kelas: _________________</p>
             </div>
             <div className="space-y-6">
               <p>Tarikh: _________________</p>
               <p>Status Aras: {levelFilter === 'Semua' ? 'Kepelbagaian Aras' : levelFilter}</p>
             </div>
          </div>

          <div className="mb-20 bg-slate-50 p-12 rounded-[3rem] border border-slate-200 shadow-sm">
            <p className="text-[11px] font-black uppercase text-indigo-600 mb-4 tracking-[0.3em]">Konteks Kurikulum</p>
            <h2 className="text-3xl font-black mb-3 uppercase tracking-tight">Bab {selectedTopic.id}: {selectedTopic.title}</h2>
            <p className="font-bold text-base text-slate-600 leading-relaxed italic">Standard Pembelajaran {selectedSP.kod}: "{selectedSP.deskripsi}"</p>
          </div>

          <div className="space-y-28">
             {filteredTasks.map((task, i) => (
               <div key={i} className="space-y-10 page-break-inside-avoid relative">
                  <div className="flex items-start gap-8">
                    <span className="w-14 h-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center font-black text-2xl shrink-0">TP{task.tpLevel}</span>
                    <div className="space-y-6 flex-1">
                      <h3 className="font-black text-3xl leading-tight text-slate-900">{task.question}</h3>
                      <div className="flex flex-wrap items-center gap-4">
                         <span className="text-[11px] font-black uppercase bg-indigo-50 px-5 py-2 rounded-xl text-indigo-600 border border-indigo-100">ARAHAN: {task.instruction}</span>
                         {task.diff && (
                           <span className="text-[11px] font-black uppercase bg-emerald-50 px-5 py-2 rounded-xl text-emerald-600 border border-emerald-100">ARAS: {task.diff.level}</span>
                         )}
                      </div>
                    </div>
                  </div>
                  
                  {task.diff && (
                    <div className="ml-20 p-8 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest grid grid-cols-2 gap-12">
                       <div><span className="text-indigo-600 font-black">KAEDAH PROSES:</span><br/>{task.diff.process}</div>
                       <div><span className="text-emerald-600 font-black">HASIL PRODUK:</span><br/>{task.diff.product}</div>
                    </div>
                  )}

                  <div className="ml-20 h-96 border-2 border-slate-200 rounded-[3rem] relative bg-slate-50/10">
                    <div className="absolute top-8 left-10 text-[10px] font-black text-slate-200 uppercase tracking-[1em] transform -rotate-90 origin-left">
                       Ruangan Jawapan / Lakaran
                    </div>
                  </div>
               </div>
             ))}
          </div>

          <div className="mt-48 pt-20 border-t-[8px] border-slate-900 flex justify-between items-end px-10">
             <div className="text-center">
               <div className="w-72 border-b-2 border-slate-900 mb-4"></div>
               <p className="text-[12px] font-black uppercase tracking-widest">Tandatangan Murid</p>
             </div>
             <div className="text-center">
                <div className="w-40 h-40 border-8 border-slate-50 rounded-full flex items-center justify-center mb-10 bg-slate-50/20">
                   <p className="text-[12px] font-black text-slate-200 uppercase tracking-widest transform -rotate-45">CAP SEKOLAH</p>
                </div>
             </div>
             <div className="text-center">
               <div className="w-72 border-b-2 border-slate-900 mb-4"></div>
               <p className="text-[12px] font-black uppercase tracking-widest">{data.userProfile.teacherName}</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">GURU MATA PELAJARAN RBT</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDSKP;
