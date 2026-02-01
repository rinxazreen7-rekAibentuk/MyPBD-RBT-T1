
import React, { useState } from 'react';
import { useData } from '../App';
import { INITIAL_TOPICS } from '../constants';
import { 
  FileDown, 
  Table, 
  User, 
  Activity, 
  History,
  School,
  BookOpen,
  Trophy,
  Calendar
} from 'lucide-react';

const Reports: React.FC = () => {
  const { data } = useData();
  const [reportType, setReportType] = useState<'matrix' | 'class_evidence' | 'individual' | 'audit'>('matrix');
  const [selectedClass, setSelectedClass] = useState(data.classes[0] || "");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const handleDownloadPDF = () => {
    const element = document.getElementById('report-container');
    const opt = {
      margin: 10,
      filename: `LAPORAN_PBD_RBT_${reportType.toUpperCase()}_${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    // @ts-ignore
    window.html2pdf().from(element).set(opt).save();
  };

  const getHighestTP = (studentId: string) => {
    const studentRecords = data.records.filter(r => r.studentId === studentId);
    if (studentRecords.length === 0) return "-";
    return Math.max(...studentRecords.map(r => r.tp));
  };

  const getTPForSP = (studentId: string, spKod: string) => {
    const rec = data.records.find(r => r.studentId === studentId && r.spKod === spKod);
    return rec ? rec.tp : "-";
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Report Switcher */}
      <div className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-wrap lg:flex-nowrap gap-2">
        {[
          { id: 'matrix', label: 'Matrik TP', icon: Table },
          { id: 'class_evidence', label: 'Evidens Kelas', icon: Activity },
          { id: 'individual', label: 'Profil Individu', icon: User },
          { id: 'audit', label: 'Audit Trail', icon: History }
        ].map((type) => (
          <button 
            key={type.id}
            onClick={() => setReportType(type.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-5 px-6 rounded-[2rem] font-black transition-all text-xs tracking-widest uppercase ${
              reportType === type.id ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <type.icon size={16} /> {type.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full md:w-auto">
          {reportType !== 'individual' ? (
            <select 
              className="bg-white p-4 rounded-2xl border border-slate-100 font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-indigo-500 min-w-[200px] uppercase"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {data.classes.map(c => <option key={c} value={c}>Kelas: {c}</option>)}
            </select>
          ) : (
            <select 
              className="bg-white p-4 rounded-2xl border border-slate-100 font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-indigo-500 min-w-[300px] uppercase"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
            >
              <option value="">-- PILIH NAMA MURID --</option>
              {data.students.sort((a,b) => a.nama.localeCompare(b.nama)).map(s => (
                <option key={s.id} value={s.id}>{s.nama} ({s.kelas})</option>
              ))}
            </select>
          )}
        </div>
        <button 
          onClick={handleDownloadPDF}
          className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 shadow-xl transition-all active:scale-95"
        >
          <FileDown size={20} />
          JANA PDF RASMI
        </button>
      </div>

      {/* Report Container */}
      <div id="report-container" className="bg-white p-16 rounded-[4rem] shadow-sm border border-slate-200 min-h-[900px] relative overflow-hidden">
        {/* Subject Watermark for Aesthetics */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none rotate-[-45deg] whitespace-nowrap">
           <span className="text-[15rem] font-black">REKA BENTUK & TEKNOLOGI</span>
        </div>

        {/* Report Header Section */}
        <div className="relative z-10 space-y-12 mb-16">
          <div className="flex justify-between items-start border-b-4 border-slate-900 pb-10">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white text-5xl font-black italic shadow-2xl">
                R
              </div>
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900 leading-tight">Laporan Pentaksiran Bilik Darjah (PBD)</h1>
                <div className="flex items-center gap-4 mt-2">
                   <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar size={14} />
                      <span className="font-bold uppercase tracking-widest text-[11px]">Sesi 2026/2027</span>
                   </div>
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                   <span className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">KSSM Tingkatan 1</span>
                </div>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="flex items-center gap-3 text-slate-900 mb-2">
                <School size={20} />
                <p className="font-black text-xl uppercase tracking-tight">{data.userProfile.schoolName}</p>
              </div>
              <div className="inline-flex items-center gap-3 bg-slate-900 px-6 py-2.5 rounded-full shadow-lg">
                <BookOpen size={16} className="text-indigo-400" />
                <p className="text-white font-black text-xs uppercase tracking-[0.2em]">REKA BENTUK & TEKNOLOGI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Content Body */}
        <div className="relative z-10 min-h-[500px]">
          {reportType === 'matrix' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <Table size={20} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-wider text-slate-800">Matrik Tahap Penguasaan - Kelas {selectedClass}</h3>
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl border border-slate-200">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="p-5 text-[10px] font-black uppercase text-center w-14">BIL</th>
                      <th className="p-5 text-[10px] font-black uppercase text-left">NAMA MURID</th>
                      {INITIAL_TOPICS.map(t => (
                        <th key={t.id} className="p-5 text-[10px] font-black uppercase text-center w-24">Bab {t.id}</th>
                      ))}
                      <th className="p-5 text-[10px] font-black uppercase text-center bg-indigo-600 w-28">TP AKHIR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.students.filter(s => s.kelas === selectedClass).map((student, idx) => (
                      <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-5 text-center font-bold text-slate-400 text-sm">{idx + 1}</td>
                        <td className="p-5 font-black text-slate-800 uppercase text-xs">{student.nama}</td>
                        {INITIAL_TOPICS.map(topic => {
                          const records = data.records.filter(r => r.studentId === student.id && r.topicId === topic.id);
                          const highestTP = records.length > 0 ? Math.max(...records.map(r => r.tp)) : "-";
                          return (
                            <td key={topic.id} className={`p-5 text-center font-black text-sm ${highestTP !== "-" ? 'text-indigo-600' : 'text-slate-300'}`}>{highestTP}</td>
                          );
                        })}
                        <td className="p-5 text-center font-black bg-indigo-50/50 text-indigo-700 text-lg">{getHighestTP(student.id)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {reportType === 'class_evidence' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
               <div className="flex items-center gap-3 mb-10">
                <Activity className="text-indigo-600" size={20} />
                <h3 className="text-xl font-black uppercase tracking-wider text-slate-800">Laporan Pencapaian Evidens SP - Kelas {selectedClass}</h3>
              </div>
              <div className="space-y-16">
                {INITIAL_TOPICS.map(topic => (
                  <div key={topic.id} className="page-break-after">
                    <div className="flex items-center gap-4 mb-6">
                       <span className="bg-slate-900 text-white px-5 py-2 font-black uppercase text-xs rounded-xl">BAB {topic.id}</span>
                       <h4 className="font-black uppercase tracking-widest text-slate-800">{topic.title}</h4>
                    </div>
                    <div className="overflow-hidden rounded-3xl border border-slate-200">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="p-5 text-[9px] font-black uppercase text-left">NAMA MURID</th>
                            {topic.sps.map(sp => (
                              <th key={sp.kod} className="p-5 text-[9px] font-black uppercase text-center border-l border-slate-200">{sp.kod}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {data.students.filter(s => s.kelas === selectedClass).map(student => (
                            <tr key={student.id}>
                              <td className="p-5 font-bold text-slate-700 text-[11px] uppercase">{student.nama}</td>
                              {topic.sps.map(sp => (
                                <td key={sp.kod} className="p-5 text-center font-black text-xs border-l border-slate-100">{getTPForSP(student.id, sp.kod)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {reportType === 'individual' && selectedStudentId && (
             <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-12">
                <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white flex flex-col md:flex-row justify-between items-center gap-10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
                  <div className="relative z-10 flex items-center gap-8">
                     <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl font-black border border-white/20">
                        {data.students.find(s => s.id === selectedStudentId)?.nama.charAt(0)}
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em]">Profil Pelajar Terperinci</p>
                        <h4 className="text-4xl font-black uppercase tracking-tight leading-none">{data.students.find(s => s.id === selectedStudentId)?.nama}</h4>
                        <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Kelas: {data.students.find(s => s.id === selectedStudentId)?.kelas}</p>
                     </div>
                  </div>
                  <div className="relative z-10 text-center md:text-right">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">TP KESELURUHAN</p>
                      <div className="inline-flex items-center gap-4 bg-white/10 px-8 py-4 rounded-3xl border border-white/20">
                         <Trophy size={32} className="text-amber-400" />
                         <span className="text-6xl font-black leading-none">{getHighestTP(selectedStudentId)}</span>
                      </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-800 flex items-center gap-4">
                    Pencapaian Standard Kandungan
                    <div className="h-[2px] flex-1 bg-slate-100"></div>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {INITIAL_TOPICS.map(topic => {
                      const records = data.records.filter(r => r.studentId === selectedStudentId && r.topicId === topic.id);
                      const highest = records.length > 0 ? Math.max(...records.map(r => r.tp)) : 0;
                      
                      return (
                        <div key={topic.id} className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:border-indigo-500 transition-all group">
                          <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center font-black text-3xl shadow-xl transition-all ${
                            highest >= 4 ? 'bg-emerald-600 text-white shadow-emerald-200' : 
                            highest >= 3 ? 'bg-indigo-600 text-white shadow-indigo-200' :
                            'bg-slate-100 text-slate-400 shadow-none'
                          }`}>
                            {highest || '-'}
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">UNIT {topic.id}</p>
                            <h4 className="font-black text-slate-800 uppercase text-base truncate">{topic.title}</h4>
                            <div className="mt-4 flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                               <p className="text-[10px] font-bold text-slate-400 uppercase truncate">
                                 {records.length > 0 ? records[records.length - 1].notes || "Dikuasai dengan baik." : "Penilaian belum dibuat."}
                               </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
             </div>
          )}

          {reportType === 'audit' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-3 mb-8">
                <History className="text-indigo-600" size={20} />
                <h3 className="text-xl font-black uppercase tracking-wider text-slate-800">Log Pengesahan Penilaian - Kelas {selectedClass}</h3>
              </div>
              <div className="overflow-hidden rounded-3xl border border-slate-200">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-5 text-[10px] font-black uppercase text-left">Tarikh & Masa</th>
                      <th className="p-5 text-[10px] font-black uppercase text-left">Nama Murid</th>
                      <th className="p-5 text-[10px] font-black uppercase text-center w-24">SP</th>
                      <th className="p-5 text-[10px] font-black uppercase text-center w-20">TP</th>
                      <th className="p-5 text-[10px] font-black uppercase text-left">Catatan Guru</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.records
                      .filter(r => data.students.find(s => s.id === r.studentId)?.kelas === selectedClass)
                      .sort((a,b) => b.timestamp - a.timestamp)
                      .map(record => {
                        const student = data.students.find(s => s.id === record.studentId);
                        return (
                          <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-5 font-bold text-slate-400 text-[10px] uppercase">{new Date(record.timestamp).toLocaleString()}</td>
                            <td className="p-5 font-black text-slate-800 uppercase text-xs">{student?.nama}</td>
                            <td className="p-5 text-center font-bold text-indigo-600 text-xs">{record.spKod}</td>
                            <td className="p-5 text-center font-black text-sm">{record.tp}</td>
                            <td className="p-5 italic text-slate-500 text-xs font-medium">{record.notes || "-"}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Footer Official Section */}
          <div className="mt-32 grid grid-cols-2 gap-32 px-10">
            <div className="text-center space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Disediakan Oleh</p>
              <div className="h-14 border-b border-slate-200"></div>
              <div>
                <p className="font-black text-slate-950 uppercase tracking-tight text-lg">{data.userProfile.teacherName}</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">GURU MATA PELAJARAN RBT</p>
              </div>
            </div>
            <div className="text-center space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Disahkan Oleh</p>
              <div className="h-14 border-b border-slate-200"></div>
              <div>
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mt-8">Cop Rasmi & Tarikh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
