
import React, { useState, useEffect } from 'react';
import { useData } from '../App';
import { INITIAL_TOPICS } from '../constants';
import { Link } from 'react-router-dom';
import { 
  Search, 
  CheckCircle2, 
  Save, 
  CheckSquare,
  Users,
  MousePointer2,
  FileEdit,
  Mic2,
  Eye,
  Info,
  ChevronDown,
  LayoutList,
  Target,
  ClipboardCheck,
  Zap,
  Bookmark,
  UserPlus,
  PlusCircle,
  AlertCircle
} from 'lucide-react';
import { AssessmentRecord } from '../types';

const KAEDAH_OPTIONS = [
  { 
    id: 'Bertulis', 
    icon: FileEdit, 
    label: 'Bertulis', 
    color: 'text-blue-600', 
    bg: 'bg-blue-50', 
    activeBorder: 'border-blue-500', 
    activeBg: 'bg-blue-600',
    glow: 'shadow-blue-500/20'
  },
  { 
    id: 'Lisan', 
    icon: Mic2, 
    label: 'Lisan', 
    color: 'text-amber-600', 
    bg: 'bg-amber-50', 
    activeBorder: 'border-amber-500', 
    activeBg: 'bg-amber-600',
    glow: 'shadow-amber-500/20'
  },
  { 
    id: 'Pemerhatian', 
    icon: Eye, 
    label: 'Pemerhatian', 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50', 
    activeBorder: 'border-emerald-500', 
    activeBg: 'bg-emerald-600',
    glow: 'shadow-emerald-500/20'
  }
];

const PRESET_COMMENTS = [
  "Dapat menerangkan konsep dengan jelas dan tepat.",
  "Menghasilkan lakaran kreatif dengan elemen dan prinsip yang betul.",
  "Berjaya mengenal pasti komponen sistem dengan tepat.",
  "Menunjukkan kemahiran manipulatif yang tinggi semasa amali.",
  "Melengkapkan tugasan dokumentasi dengan kemas dan teratur.",
  "Mampu membuat analisis kritis terhadap reka bentuk produk.",
  "Memberi kerjasama yang sangat baik dalam aktiviti kumpulan.",
  "Menunjukkan kreativiti luar biasa dalam penyelesaian masalah.",
  "Dapat mengaplikasikan pengetahuan dalam situasi baru.",
  "Mematuhi peraturan keselamatan bengkel sepanjang waktu amali."
];

const Assessment: React.FC = () => {
  const { data, saveData } = useData();
  
  const [selectedClass, setSelectedClass] = useState(data.classes[0] || "");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState(INITIAL_TOPICS[0].id);
  const [selectedSPKod, setSelectedSPKod] = useState(INITIAL_TOPICS[0].sps[0].kod);
  const [selectedTP, setSelectedTP] = useState<number | null>(null);
  const [selectedKaedah, setSelectedKaedah] = useState("Bertulis");
  const [notes, setNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = data.students.filter(s => 
    s.kelas === selectedClass && 
    s.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTopic = INITIAL_TOPICS.find(t => t.id === selectedTopicId)!;
  const selectedSP = selectedTopic.sps.find(s => s.kod === selectedSPKod)!;
  const topicRubrics = data.customRubrics[selectedTopicId] || selectedTopic.tps;
  
  const currentRecord = data.records.find(r => 
    r.studentId === selectedStudentId && 
    r.topicId === selectedTopicId && 
    r.spKod === selectedSPKod
  );

  const topicRecords = data.records.filter(r => 
    r.studentId === selectedStudentId && 
    r.topicId === selectedTopicId
  );

  useEffect(() => {
    if (currentRecord) {
      setSelectedTP(currentRecord.tp);
      setNotes(currentRecord.notes);
      setSelectedKaedah(currentRecord.kaedah || "Bertulis");
    } else {
      setSelectedTP(null);
      setNotes("");
      setSelectedKaedah("Bertulis");
    }
  }, [selectedStudentId, selectedTopicId, selectedSPKod, data.records]);

  const handleSave = () => {
    if (!selectedStudentId || !selectedTP) {
      alert("Sila pilih murid dan Tahap Penguasaan (TP) terlebih dahulu.");
      return;
    }

    const newRecord: AssessmentRecord = {
      id: currentRecord?.id || Date.now().toString(),
      studentId: selectedStudentId,
      topicId: selectedTopicId,
      spKod: selectedSPKod,
      tp: selectedTP,
      kaedah: selectedKaedah,
      notes,
      timestamp: Date.now()
    };

    let newRecords;
    if (currentRecord) {
      newRecords = data.records.map(r => r.id === currentRecord.id ? newRecord : r);
    } else {
      newRecords = [...data.records, newRecord];
    }

    saveData({ ...data, records: newRecords }, currentRecord ? "Rekod PBD Berjaya Dikemaskini!" : "Rekod PBD Berjaya Disimpan!");
  };

  const studentCompletion = selectedStudentId 
    ? Math.round((data.records.filter(r => r.studentId === selectedStudentId && r.topicId === selectedTopicId).length / selectedTopic.sps.length) * 100)
    : 0;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* NAVIGASI MURID */}
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 sticky top-32 transition-all">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Users size={14} className="text-indigo-600" />
              NAVIGASI MURID
            </h3>
            
            <div className="space-y-4">
              <select 
                className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-black text-slate-700 uppercase tracking-tight transition-all"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {data.classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text"
                  placeholder="Cari murid..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="max-h-[500px] overflow-y-auto custom-scroll space-y-3 pr-2 mt-4">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => (
                    <button
                      key={student.id}
                      onClick={() => setSelectedStudentId(student.id)}
                      className={`w-full p-5 rounded-2xl text-left transition-all border-2 relative group overflow-hidden ${
                        selectedStudentId === student.id 
                          ? 'bg-slate-950 text-white border-slate-950 shadow-xl translate-x-1' 
                          : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-200 hover:translate-x-1 hover:bg-slate-50'
                      }`}
                    >
                      <p className="font-black text-sm uppercase tracking-tight truncate relative z-10">{student.nama}</p>
                      <div className="flex items-center justify-between mt-2 relative z-10">
                        {data.records.some(r => r.studentId === student.id && r.spKod === selectedSPKod) && (
                          <div className="flex items-center gap-1 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                            <CheckCircle2 size={10} className="text-emerald-500" />
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-tighter">DINILAI</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="py-14 px-8 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 text-indigo-400 animate-bounce">
                      <UserPlus size={28} />
                    </div>
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-tight">
                      {searchQuery ? 'Carian Tiada Hasil' : 'Senarai Masih Kosong'}
                    </h4>
                    {!searchQuery && (
                      <Link 
                        to="/students" 
                        className="mt-6 flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                      >
                        <PlusCircle size={14} />
                        Daftar Murid
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* KAWASAN PENTAKSIRAN UTAMA */}
        <div className="xl:col-span-9 space-y-8">
          {!selectedStudentId ? (
            <div className="h-full min-h-[700px] flex flex-col items-center justify-center bg-white rounded-[4rem] border-2 border-dashed border-slate-200 p-12 text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-8 text-indigo-400 animate-pulse">
                <MousePointer2 size={48} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 uppercase tracking-[0.2em]">Pilih Murid Untuk Dinilai</h3>
              <p className="text-slate-400 mt-3 max-w-sm font-medium leading-relaxed">Klik pada nama murid dalam senarai navigasi kiri untuk memulakan proses pentaksiran sistematik.</p>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
              
              {/* PROFIL & PEMILIHAN KONTEKS DSKP */}
              <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-200 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8">
                    <div className="text-right flex flex-col items-end">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Kemajuan Unit {selectedTopicId}</p>
                      <div className="flex items-center gap-5">
                        <span className="text-4xl font-black text-slate-800 tracking-tighter">{studentCompletion}%</span>
                        <div className="w-40 h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-indigo-600 transition-all duration-1000 ease-out" style={{ width: `${studentCompletion}%` }} />
                        </div>
                      </div>
                    </div>
                </div>

                <div className="flex items-center gap-8 mb-14 border-b border-slate-100 pb-10">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-950 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl">
                    {data.students.find(s => s.id === selectedStudentId)?.nama.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-none mb-4">
                      {data.students.find(s => s.id === selectedStudentId)?.nama}
                    </h3>
                    <div className="flex items-center gap-4">
                       <span className="bg-indigo-600 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">{selectedClass}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-2">
                      <Bookmark size={14} className="text-indigo-500" />
                      Standard Kandungan (SK)
                    </label>
                    <select 
                      className="w-full p-6 rounded-[2rem] bg-slate-50 border-2 border-slate-100 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-bold text-slate-800 transition-all cursor-pointer hover:bg-white"
                      value={selectedTopicId}
                      onChange={(e) => {
                        const tid = e.target.value;
                        setSelectedTopicId(tid);
                        const t = INITIAL_TOPICS.find(x => x.id === tid);
                        if(t) setSelectedSPKod(t.sps[0].kod);
                      }}
                    >
                      {INITIAL_TOPICS.map(t => <option key={t.id} value={t.id}>SK {t.id}: {t.title}</option>)}
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-2">
                      <LayoutList size={14} className="text-indigo-500" />
                      Standard Pembelajaran (SP)
                    </label>
                    <select 
                      className="w-full p-6 rounded-[2rem] bg-slate-50 border-2 border-slate-100 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-bold text-slate-800 transition-all cursor-pointer hover:bg-white"
                      value={selectedSPKod}
                      onChange={(e) => setSelectedSPKod(e.target.value)}
                    >
                      {selectedTopic.sps.map(sp => <option key={sp.kod} value={sp.kod}>SP {sp.kod}: {sp.deskripsi}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* RINGKASAN PENGUASAAN SP BAGI BAB INI */}
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <LayoutList size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">Ringkasan Status SP</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Bab {selectedTopicId}: {selectedTopic.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sudah Dinilai</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Belum Dinilai</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedTopic.sps.map(sp => {
                    const record = topicRecords.find(r => r.spKod === sp.kod);
                    const isSelected = selectedSPKod === sp.kod;
                    return (
                      <button 
                        key={sp.kod}
                        onClick={() => setSelectedSPKod(sp.kod)}
                        className={`p-5 rounded-2xl border transition-all flex items-center justify-between text-left group ${
                          isSelected 
                            ? 'ring-2 ring-indigo-500 border-indigo-500 bg-indigo-50/20' 
                            : record 
                              ? 'bg-emerald-50/40 border-emerald-100 hover:border-emerald-300' 
                              : 'bg-slate-50 border-slate-100 opacity-60 hover:opacity-100 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex flex-col gap-1 pr-2 overflow-hidden">
                          <span className={`text-[10px] font-black uppercase tracking-tighter ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}>Standard {sp.kod}</span>
                          <span className={`text-[9px] font-black uppercase tracking-widest truncate ${record ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {record ? 'Sudah Dinilai' : 'Belum Dinilai'}
                          </span>
                        </div>
                        {record ? (
                          <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg shadow-emerald-200 shrink-0">
                            {record.tp}
                          </div>
                        ) : (
                          <div className="w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-200 font-black text-xs shrink-0 group-hover:border-slate-300 group-hover:text-slate-300">
                            -
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BANNER KONTEKS SP (DSKP RBT F1) */}
              <div className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-40 translate-x-40 blur-3xl group-hover:bg-white/20 transition-all"></div>
                <div className="relative flex flex-col md:flex-row items-center gap-10">
                  <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-xl border border-white/20">
                    <Target size={44} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                       <Zap size={16} className="text-indigo-200" />
                       <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-100">Fokus Sasaran Penilaian</h4>
                    </div>
                    <p className="text-2xl font-extrabold leading-relaxed tracking-tight">"{selectedSP.deskripsi}"</p>
                    <div className="flex items-center gap-4 mt-6">
                       <span className="text-[9px] font-black bg-indigo-500 px-4 py-1.5 rounded-full border border-indigo-400">DSKP RBT TINGKATAN 1</span>
                       <span className="text-[9px] font-black bg-indigo-500 px-4 py-1.5 rounded-full border border-indigo-400">KSSM MALAYSIA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOW PENTAKSIRAN 3-LANGKAH */}
              <div className="bg-white p-16 rounded-[4.5rem] shadow-sm border border-slate-200 space-y-24">
                
                {/* 1. KAEDAH PENTAKSIRAN */}
                <section>
                   <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-600/20">1</div>
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-[0.4em]">Kaedah Pentaksiran</h4>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-1 rounded-full">Pilih Kaedah Penilaian</span>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {KAEDAH_OPTIONS.map((opt) => {
                       const isActive = selectedKaedah === opt.id;
                       return (
                         <button
                           key={opt.id}
                           onClick={() => setSelectedKaedah(opt.id)}
                           className={`p-10 rounded-[3.5rem] border-4 transition-all flex flex-col items-center gap-6 relative group transform hover:-translate-y-2 ${
                             isActive 
                               ? `${opt.activeBorder} ${opt.glow} bg-white shadow-2xl` 
                               : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-200'
                           }`}
                         >
                           <div className={`p-8 rounded-[2.2rem] transition-all shadow-md ${
                             isActive ? `${opt.activeBg} text-white shadow-lg` : `${opt.bg} ${opt.color}`
                           }`}>
                             <opt.icon size={42} strokeWidth={2.5} />
                           </div>
                           <div className="text-center">
                             <span className={`font-black text-xs tracking-[0.4em] uppercase block mb-1 ${
                               isActive ? opt.color : 'text-slate-400'
                             }`}>
                               {opt.label}
                             </span>
                             <p className={`text-[9px] font-bold uppercase tracking-widest ${isActive ? 'text-slate-500' : 'text-slate-300'}`}>
                               Kaedah Utama
                             </p>
                           </div>
                           {isActive && (
                             <div className={`absolute top-6 right-6 ${opt.color} animate-in zoom-in duration-300`}>
                               <CheckSquare size={32} />
                             </div>
                           )}
                         </button>
                       );
                     })}
                   </div>
                </section>

                {/* 2. TAHAP PENGUASAAN (TP) */}
                <section>
                   <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-600/20">2</div>
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-[0.4em]">Standard Prestasi (TP)</h4>
                      </div>
                      <div className="flex items-center gap-3 text-indigo-600 bg-indigo-50 px-6 py-2 rounded-full border border-indigo-100">
                        <Info size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Rujuk Rubrik DSKP</span>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {topicRubrics.map((rubric) => (
                       <button
                         key={rubric.tp}
                         onClick={() => setSelectedTP(rubric.tp)}
                         className={`p-12 rounded-[4rem] border-2 text-left transition-all relative group h-full overflow-hidden ${
                           selectedTP === rubric.tp 
                             ? 'bg-indigo-600 border-indigo-600 shadow-2xl shadow-indigo-600/40 scale-[1.05]' 
                             : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-indigo-400'
                         }`}
                       >
                         <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-4xl transition-all shadow-inner ${
                              selectedTP === rubric.tp ? 'bg-white text-indigo-600' : 'bg-white text-slate-300 border border-slate-100'
                            }`}>
                              {rubric.tp}
                            </div>
                            {selectedTP === rubric.tp && (
                              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/30">
                                <CheckCircle2 size={36} />
                              </div>
                            )}
                         </div>
                         <p className={`text-sm font-bold leading-relaxed transition-all relative z-10 mb-4 ${
                           selectedTP === rubric.tp ? 'text-white' : 'text-slate-600'
                         }`}>
                           {rubric.deskripsi}
                         </p>
                         <div className={`absolute -bottom-10 -right-10 font-black text-[12rem] italic select-none opacity-5 transition-transform group-hover:scale-110 pointer-events-none ${
                           selectedTP === rubric.tp ? 'text-white' : 'text-slate-950'
                         }`}>
                           {rubric.tp}
                         </div>
                       </button>
                     ))}
                   </div>
                </section>

                {/* 3. CATATAN & EVIDEN */}
                <section>
                   <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-600/20">3</div>
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-[0.4em]">Catatan & Bukti Fizikal</h4>
                      </div>
                      <ClipboardCheck size={28} className="text-slate-300" />
                   </div>
                   <div className="space-y-10">
                      <div className="relative group">
                        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none group-hover:scale-110 transition-transform">
                          <Zap size={24} />
                        </div>
                        <select 
                          className="w-full pl-20 pr-12 py-8 rounded-[2.5rem] bg-slate-50 border-2 border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-bold text-slate-800 appearance-none transition-all cursor-pointer hover:bg-white text-sm"
                          onChange={(e) => {
                            if(e.target.value) setNotes(prev => prev ? `${prev} ${e.target.value}` : e.target.value);
                          }}
                        >
                          <option value="">-- DROPDOWN ULASAN PANTAS (PILIH UNTUK TAMBAH) --</option>
                          {PRESET_COMMENTS.map((comment, idx) => (
                            <option key={idx} value={comment}>{comment}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-600 transition-colors pointer-events-none" size={28} />
                      </div>
                      
                      <textarea 
                        rows={6}
                        placeholder="Masukkan ulasan profesional guru atau senaraikan bukti eviden fizikal (Contoh: Lakaran rendering, model mock-up, video pembentangan)..."
                        className="w-full p-12 rounded-[4rem] bg-slate-50 border-2 border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-medium text-slate-700 leading-relaxed transition-all placeholder:text-slate-300 text-base shadow-inner"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                   </div>
                </section>

                {/* TINDAKAN */}
                <div className="pt-16 border-t-2 border-slate-50 flex flex-col md:flex-row gap-8">
                  <button 
                    onClick={handleSave}
                    className="flex-1 py-10 bg-slate-950 text-white font-black rounded-[3rem] hover:bg-indigo-600 shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-5 text-sm tracking-[0.5em] uppercase group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <Save size={24} className="relative z-10 group-hover:rotate-12 transition-transform" />
                    <span className="relative z-10">{currentRecord ? 'KEMASKINI REKOD PBD' : 'SIMPAN REKOD PBD RASMI'}</span>
                  </button>
                  <button 
                    onClick={() => {
                      if(confirm("Adakah anda mahu membatalkan tindakan semasa? Semua data yang belum disimpan akan hilang.")) {
                        setSelectedTP(null);
                        setNotes("");
                      }
                    }}
                    className="px-16 py-10 bg-white border-2 border-slate-200 text-slate-400 font-black rounded-[3rem] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all flex items-center justify-center gap-4 text-xs tracking-[0.3em] uppercase"
                  >
                    BATALKAN
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
