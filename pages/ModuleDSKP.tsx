
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
  Filter,
  Info,
  Maximize2,
  Minimize2,
  ClipboardCheck,
  Lightbulb,
  ArrowRight
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

  // Sync with viewMode: in differentiation mode, we might want them expanded by default
  useEffect(() => {
    if (viewMode === 'differentiation') {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [viewMode]);

  return (
    <div className={`group relative rounded-[3rem] border-2 transition-all duration-500 ease-out overflow-hidden ${
      isExpanded 
        ? 'bg-white border-indigo-500 shadow-[0_40px_80px_-15px_rgba(79,70,229,0.15)] scale-[1.02] z-10' 
        : 'bg-slate-50/50 border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-2xl'
    }`}>
      {/* Visual Accent - Color coded by TP level */}
      <div className={`absolute left-0 top-0 bottom-0 w-2 ${getTPColor(task.tpLevel)} opacity-80`} />

      {/* Card Header Section */}
      <div 
        className="p-8 md:p-10 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* TP Avatar - High Contrast */}
          <div className={`w-20 h-20 ${getTPColor(task.tpLevel)} text-white rounded-[1.75rem] flex flex-col items-center justify-center shadow-xl shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:-rotate-3`}>
            <span className="text-[10px] font-black opacity-60 tracking-widest leading-none mb-1 uppercase">Tahap</span>
            <span className="text-4xl font-black leading-none">{task.tpLevel}</span>
          </div>
          
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
                <span className="text-indigo-600">{getTaskIcon(task.type)}</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{task.type}</span>
              </div>
              {getLevelBadge(task.diff?.level)}
            </div>
            
            <h4 className={`text-2xl md:text-3xl font-black tracking-tight leading-tight transition-colors duration-300 ${
              isExpanded ? 'text-slate-900' : 'text-slate-700'
            }`}>
              {task.question}
            </h4>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center ml-auto">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleCopyTask(`SOALAN: ${task.question}\nARAHAN: ${task.instruction}`, `task-${idx}`);
              }}
              className={`p-4 rounded-2xl transition-all duration-300 ${
                copied === `task-${idx}` 
                  ? 'bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-200' 
                  : 'bg-white text-slate-400 hover:bg-indigo-600 hover:text-white border border-slate-200 shadow-sm active:scale-90'
              }`}
            >
              {copied === `task-${idx}` ? <CheckCircle size={22} /> : <Copy size={22} />}
            </button>
            <div className={`p-4 rounded-2xl transition-all duration-500 ${
              isExpanded ? 'bg-indigo-600 text-white rotate-180 shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
            }`}>
              {isExpanded ? <Minimize2 size={22} /> : <Maximize2 size={22} />}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Body Content */}
      <div className={`grid transition-all duration-500 ease-in-out ${
        isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}>
        <div className="overflow-hidden">
          <div className="px-8 md:px-10 pb-12 space-y-10">
            <div className="h-px bg-slate-100 w-full" />
            
            {/* Instruction Detail Area */}
            <div className="bg-slate-50/80 rounded-[2.5rem] p-10 border border-slate-200 relative group/instr hover:bg-white hover:border-indigo-100 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/instr:opacity-10 transition-opacity">
                <ClipboardCheck size={140} className="text-slate-950" />
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Lightbulb size={20} className="animate-pulse" />
                </div>
                <div>
                   <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-600">Arahan Perlaksanaan</h5>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Panduan Guru & Murid</p>
                </div>
              </div>
              <p className="text-xl font-bold text-slate-700 leading-relaxed italic relative z-10">
                "{task.instruction}"
              </p>
            </div>

            {/* Differentiated Strategies Section */}
            {task.diff && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-8 duration-700">
                {/* Process Strategy Card */}
                <div className="p-10 bg-gradient-to-br from-indigo-50/50 to-white rounded-[3rem] border border-indigo-100 flex flex-col items-start hover:shadow-xl transition-all duration-500 group/process">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 bg-white rounded-[1.25rem] border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover/process:bg-indigo-600 group-hover/process:text-white transition-all duration-500">
                      <RefreshCw size={28} className="group-hover/process:rotate-180 transition-transform duration-700" />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600">Strategi Beza Proses</h5>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Modifikasi Aktiviti</p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <p className="text-sm font-bold text-slate-600 leading-relaxed">
                      {task.diff.process}
                    </p>
                    <div className="flex items-center gap-2 text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-white/50 px-4 py-2 rounded-full border border-indigo-50">
                       <Fingerprint size={12} /> Personalized Learning Path
                    </div>
                  </div>
                </div>

                {/* Product Strategy Card */}
                <div className="p-10 bg-gradient-to-br from-emerald-50/50 to-white rounded-[3rem] border border-emerald-100 flex flex-col items-start hover:shadow-xl transition-all duration-500 group/product">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 bg-white rounded-[1.25rem] border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm group-hover/product:bg-emerald-600 group-hover/product:text-white transition-all duration-500">
                      <Box size={28} />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600">Strategi Beza Produk</h5>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Kepelbagaian Evidens</p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <p className="text-sm font-bold text-slate-600 leading-relaxed">
                      {task.diff.product}
                    </p>
                    <div className="flex items-center gap-2 text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-white/50 px-4 py-2 rounded-full border border-emerald-50">
                       <Sparkles size={12} /> Custom Outcome Evidence
                    </div>
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
      case 'Bertulis': return <FileEdit size={18} />;
      case 'Lisan': return <Mic2 size={18} />;
      case 'Pemerhatian': return <Eye size={18} />;
      default: return <HelpCircle size={18} />;
    }
  };

  const getLevelBadge = (level?: string) => {
    switch(level) {
      case 'Rendah': return <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200 shadow-sm">Sokongan</span>;
      case 'Sederhana': return <span className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-200 shadow-sm">Pengukuhan</span>;
      case 'Tinggi': return <span className="bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-200 shadow-sm">Pengayaan</span>;
      default: return null;
    }
  };

  const getTPColor = (tp: number) => {
    if (tp <= 2) return 'bg-amber-500';
    if (tp <= 4) return 'bg-indigo-600';
    return 'bg-emerald-600';
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-1000 pb-20">
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="space-y-4">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Modul <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">PBD Terbeza</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs flex items-center gap-3">
            <School size={16} className="text-indigo-400" />
            Edisi Eksklusif DSKP RBT Tingkatan 1 • Kurikulum KSSM
          </p>
        </div>
        <div className="flex flex-wrap gap-5">
          <div className="flex bg-white p-2 rounded-[2rem] border border-slate-200 shadow-sm">
             <button 
                onClick={() => setViewMode('standard')}
                className={`px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${viewMode === 'standard' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
             >
               Standard
             </button>
             <button 
                onClick={() => setViewMode('differentiation')}
                className={`px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${viewMode === 'differentiation' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
             >
               Terbeza
             </button>
          </div>
          <button 
            onClick={handlePrintModule}
            className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[11px] tracking-[0.3em] uppercase transition-all duration-500 flex items-center gap-4 hover:bg-indigo-600 shadow-2xl active:scale-95 group"
          >
            <Printer size={22} className="group-hover:animate-bounce" />
            Cetak Modul
          </button>
        </div>
      </div>

      {/* Navigation Matrix & Filters */}
      <div className="bg-white/90 backdrop-blur-2xl p-12 rounded-[4.5rem] border border-slate-200 shadow-sm space-y-12">
        <div className="flex flex-wrap gap-6 border-b border-slate-100 pb-12">
          {INITIAL_TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopicId(topic.id);
                setSelectedSPKod(topic.sps[0].kod);
              }}
              className={`px-14 py-7 rounded-[2.5rem] font-black text-[11px] tracking-[0.3em] uppercase transition-all duration-500 flex items-center gap-5 ${
                selectedTopicId === topic.id 
                  ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 -translate-y-2' 
                  : 'bg-slate-50 text-slate-400 hover:text-slate-600 border border-slate-100'
              }`}
            >
              Bab {topic.id}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
           <div className="flex flex-wrap gap-5">
             {selectedTopic.sps.map(sp => (
               <button
                 key={sp.kod}
                 onClick={() => setSelectedSPKod(sp.kod)}
                 className={`px-8 py-5 rounded-[1.75rem] font-black text-[11px] uppercase tracking-widest transition-all duration-500 border-2 ${
                   selectedSPKod === sp.kod 
                     ? 'bg-slate-900 text-white border-slate-900 shadow-2xl' 
                     : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-400 hover:text-indigo-600'
                 }`}
               >
                 SP {sp.kod}
               </button>
             ))}
           </div>

           {viewMode === 'differentiation' && (
              <div className="flex items-center gap-6 bg-slate-50 p-3 rounded-[2.5rem] border border-slate-100">
                 <div className="flex items-center gap-3 text-slate-400 ml-6">
                    <Filter size={18} />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Penapis Aras:</span>
                 </div>
                 <div className="flex gap-3">
                    {['Semua', 'Rendah', 'Sederhana', 'Tinggi'].map((lvl) => (
                       <button
                          key={lvl}
                          onClick={() => setLevelFilter(lvl as any)}
                          className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                             levelFilter === lvl 
                                ? 'bg-white text-indigo-600 shadow-lg ring-1 ring-slate-200' 
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

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
        
        {/* Left Side: Context Sidebar */}
        <div className="xl:col-span-4 space-y-12">
          <div className="bg-white p-14 rounded-[5rem] shadow-sm border border-slate-100 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/50 rounded-full translate-x-40 -translate-y-40 blur-[120px] opacity-70"></div>
            <div className="space-y-20 relative z-10">
              {/* Unit Info */}
              <section className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
                    <BookOpen size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-none">Standard Kandungan</h3>
                </div>
                <div className="p-12 bg-slate-50/80 rounded-[4rem] border border-slate-100 shadow-inner group cursor-default transition-all duration-700 hover:bg-white hover:shadow-2xl">
                  <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em] block mb-6">BAB {selectedTopic.id} • KURIKULUM</span>
                  <p className="font-extrabold text-slate-900 leading-tight text-4xl group-hover:text-indigo-600 transition-colors">{selectedTopic.title}</p>
                </div>
              </section>

              {/* SP Objective */}
              <section className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-200">
                    <Target size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-none">Objektif SP</h3>
                </div>
                <div className="p-12 bg-emerald-50/30 rounded-[4rem] border border-emerald-100/50 hover:bg-emerald-50/50 transition-all duration-700">
                  <span className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.5em] block mb-6">Standard {selectedSP.kod}</span>
                  <p className="text-xl font-bold text-slate-700 leading-relaxed italic">"{selectedSP.deskripsi}"</p>
                </div>
              </section>

              {/* DI Insight Card */}
              <div className="p-14 bg-amber-50/80 rounded-[4.5rem] border border-amber-100 relative group overflow-hidden">
                 <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Sparkles size={160} className="text-amber-800" />
                 </div>
                 <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-800 mb-6 flex items-center gap-4 relative z-10">
                    <Info size={18} className="animate-bounce" /> Pedagogi Terbeza
                 </h4>
                 <p className="text-base font-bold text-amber-700 leading-relaxed relative z-10">
                   Setiap murid adalah unik. Gunakan strategi **Proses** dan **Produk** untuk merapatkan jurang pembelajaran dan meningkatkan ekuiti pendidikan dalam bilik darjah anda.
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Task Cards Grid */}
        <div className="xl:col-span-8">
          <div className="bg-white p-14 md:p-20 rounded-[6rem] shadow-sm border border-slate-100 min-h-[900px]">
            {/* List Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-24 gap-10 border-b border-slate-50 pb-16">
              <div className="flex items-center gap-10">
                <div className="w-24 h-24 bg-slate-950 text-white rounded-[2.25rem] flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.2)] group hover:scale-105 transition-transform duration-500">
                  <Zap size={48} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Koleksi Tugasan</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mt-3 italic">Pentaksiran Bilik Darjah Berasaskan Standard (PBD)</p>
                </div>
              </div>
              <div className="flex items-center gap-5 bg-slate-50 px-12 py-5 rounded-full border border-slate-100 shadow-inner">
                <Layers size={22} className="text-indigo-400" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">{filteredTasks.length} Tugasan Ditemui</span>
              </div>
            </div>

            {/* Tasks Feed */}
            <div className="grid grid-cols-1 gap-14">
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
                <div className="flex flex-col items-center justify-center py-72 text-center bg-slate-50 rounded-[6rem] border-4 border-dashed border-slate-200 animate-in fade-in zoom-in duration-700">
                  <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center text-slate-200 mb-14 shadow-inner">
                    <HelpCircle size={80} />
                  </div>
                  <h4 className="text-3xl font-black text-slate-400 uppercase tracking-widest">Data Tidak Ditemui</h4>
                  <p className="text-sm font-bold text-slate-300 uppercase mt-5 tracking-[0.5em]">Sila cuba ubah tapisan aras atau pilih unit pembelajaran lain.</p>
                </div>
              )}
            </div>
            
            {/* Footer Summary */}
            <div className="mt-24 p-12 bg-slate-50/50 rounded-[4rem] border border-slate-100 flex items-center justify-center text-center">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] flex items-center gap-4">
                 <ArrowRight size={14} className="text-indigo-500" />
                 Gunakan Modul Terbeza Untuk Meningkatkan TP Murid Secara Inklusif
                 <ArrowRight size={14} className="text-indigo-500 rotate-180" />
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Print Section - Optimized for Paper */}
      <div className="hidden">
        <div id="printable-module" className="p-20 bg-white text-slate-950 font-sans min-h-[1100px]">
          <div className="flex justify-between items-center border-b-[14px] border-slate-900 pb-20 mb-28">
            <div>
              <h1 className="text-7xl font-black uppercase tracking-tighter">Lembaran Kerja Terbeza</h1>
              <div className="flex items-center gap-6 mt-6">
                 <span className="bg-slate-900 text-white px-8 py-2.5 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-xl">DOKUMEN PBD RASMI</span>
                 <p className="text-base font-bold text-slate-500 uppercase tracking-[0.6em]">MyPBD • RBT Tingkatan 1 • Sesi 2026/27</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-4xl uppercase tracking-tighter">{data.userProfile.schoolName}</p>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-[0.4em] mt-4">Penyelarasan DSKP & DI Strategi Nasional</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-24 mb-28 border-b-2 border-slate-100 pb-24 text-[18px] font-black uppercase">
             <div className="space-y-10">
               <p>Nama Murid: _________________________________________</p>
               <p>Kelas: _________________</p>
             </div>
             <div className="space-y-10">
               <p>Tarikh: _________________</p>
               <p>Kategori Aras: {levelFilter === 'Semua' ? 'Kepelbagaian Aras' : levelFilter}</p>
             </div>
          </div>

          <div className="mb-28 bg-slate-50 p-20 rounded-[5rem] border-2 border-slate-200 shadow-sm relative">
            <div className="absolute top-10 right-10">
               <span className="bg-white border-2 border-slate-200 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Modul Unit {selectedTopic.id}</span>
            </div>
            <p className="text-[13px] font-black uppercase text-indigo-600 mb-6 tracking-[0.5em]">Konteks Kurikulum Kebangsaan</p>
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">{selectedTopic.title}</h2>
            <p className="font-bold text-2xl text-slate-700 leading-relaxed italic">Standard {selectedSP.kod}: "{selectedSP.deskripsi}"</p>
          </div>

          <div className="space-y-40">
             {filteredTasks.map((task, i) => (
               <div key={i} className="space-y-16 page-break-inside-avoid relative">
                  <div className="flex items-start gap-12">
                    <span className="w-24 h-24 bg-slate-950 text-white rounded-[2rem] flex items-center justify-center font-black text-4xl shadow-2xl shrink-0">TP{task.tpLevel}</span>
                    <div className="space-y-10 flex-1">
                      <h3 className="font-black text-5xl leading-tight text-slate-900">{task.question}</h3>
                      <div className="flex flex-wrap items-center gap-8">
                         <span className="text-[14px] font-black uppercase bg-indigo-50 px-8 py-3 rounded-3xl text-indigo-600 border-2 border-indigo-100">ARAHAN GURU: {task.instruction}</span>
                         {task.diff && (
                           <span className="text-[14px] font-black uppercase bg-emerald-50 px-8 py-3 rounded-3xl text-emerald-600 border-2 border-emerald-100">ARAS TUGASAN: {task.diff.level}</span>
                         )}
                      </div>
                    </div>
                  </div>
                  
                  {task.diff && (
                    <div className="ml-36 p-14 bg-slate-50/50 rounded-[4rem] border-4 border-dashed border-slate-200 text-[14px] font-bold text-slate-500 uppercase tracking-widest grid grid-cols-2 gap-20">
                       <div className="space-y-4">
                          <span className="text-indigo-600 font-black block text-sm tracking-widest border-b-2 border-indigo-100 pb-2">STRATEGI PROSES:</span>
                          <p className="leading-relaxed">{task.diff.process}</p>
                       </div>
                       <div className="space-y-4">
                          <span className="text-emerald-600 font-black block text-sm tracking-widest border-b-2 border-emerald-100 pb-2">STRATEGI PRODUK:</span>
                          <p className="leading-relaxed">{task.diff.product}</p>
                       </div>
                    </div>
                  )}

                  <div className="ml-36 h-[600px] border-4 border-slate-100 rounded-[5rem] relative bg-slate-50/5">
                    <div className="absolute top-12 left-16 text-[12px] font-black text-slate-200 uppercase tracking-[2em] transform -rotate-90 origin-left">
                       Ruangan Jawapan / Lakaran Produk Kreatif
                    </div>
                    <div className="absolute bottom-12 right-16">
                       <div className="w-80 h-1 bg-slate-100 rounded-full mb-3 opacity-30"></div>
                       <p className="text-[11px] text-slate-200 font-black text-right uppercase tracking-widest">Student Response Area</p>
                    </div>
                  </div>
               </div>
             ))}
          </div>

          <div className="mt-80 pt-32 border-t-[12px] border-slate-900 flex justify-between items-end px-16">
             <div className="text-center">
               <div className="w-96 border-b-4 border-slate-900 mb-6"></div>
               <p className="text-[16px] font-black uppercase tracking-widest">Tandatangan Murid</p>
             </div>
             <div className="text-center">
                <div className="w-56 h-56 border-[12px] border-slate-50 rounded-full flex items-center justify-center mb-16 bg-slate-50/20">
                   <p className="text-[16px] font-black text-slate-100 uppercase tracking-widest transform -rotate-45">PENGESAHAN GURU</p>
                </div>
             </div>
             <div className="text-center">
               <div className="w-96 border-b-4 border-slate-900 mb-6"></div>
               <p className="text-[16px] font-black uppercase tracking-widest">{data.userProfile.teacherName}</p>
               <p className="text-[12px] font-bold text-slate-400 uppercase mt-3 tracking-widest">Guru Mata Pelajaran RBT</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDSKP;
