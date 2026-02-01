
import React, { useState } from 'react';
import { useData } from '../App';
import { INITIAL_TOPICS } from '../constants';
import { 
  Table, 
  User, 
  Activity, 
  History,
  FileSearch,
  School,
  BookOpen,
  Printer,
  CheckCircle2,
  FileEdit,
  Mic2,
  Eye,
  ShieldCheck
} from 'lucide-react';

const Reports: React.FC = () => {
  const { data } = useData();
  const [reportType, setReportType] = useState<'matrix' | 'class_evidence' | 'individual' | 'audit'>('matrix');
  const [selectedClass, setSelectedClass] = useState(data.classes[0] || "");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const handleDownloadPDF = (elementId = 'report-container', fileName = `LAPORAN_PBD_RBT_${Date.now()}.pdf`) => {
    const element = document.getElementById(elementId);
    const opt = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    
    const h2p = (window as any).html2pdf;
    if (h2p && element) {
      h2p().from(element).set(opt).save();
    }
  };

  const getHighestTP = (studentId: string) => {
    const studentRecords = data.records.filter(r => r.studentId === studentId);
    if (studentRecords.length === 0) return "-";
    return Math.max(...studentRecords.map(r => r.tp));
  };

  const getTPRecordForSP = (studentId: string, spKod: string) => {
    return data.records.find(r => r.studentId === studentId && r.spKod === spKod);
  };

  const getKaedahIcon = (kaedah: string) => {
    switch(kaedah) {
      case 'Bertulis': return <FileEdit size={10} />;
      case 'Lisan': return <Mic2 size={10} />;
      case 'Pemerhatian': return <Eye size={10} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-wrap lg:flex-nowrap gap-2">
        <button 
          onClick={() => setReportType('matrix')}
          className={`flex-1 flex items-center justify-center gap-2 py-5 px-6 rounded-[2rem] font-black transition-all text-xs tracking-widest uppercase ${
            reportType === 'matrix' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <Table size={16} /> Matrik TP
        </button>
        <button 
          onClick={() => setReportType('class_evidence')}
          className={`flex-1 flex items-center justify-center gap-2 py-5 px-6 rounded-[2rem] font-black transition-all text-xs tracking-widest uppercase ${
            reportType === 'class_evidence' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <Activity size={16} /> Evidens & Kaedah
        </button>
        <button 
          onClick={() => setReportType('individual')}
          className={`flex-1 flex items-center justify-center gap-2 py-5 px-6 rounded-[2rem] font-black transition-all text-xs tracking-widest uppercase ${
            reportType === 'individual' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <User size={16} /> Profil Murid
        </button>
        <button 
          onClick={() => setReportType('audit')}
          className={`flex-1 flex items-center justify-center gap-2 py-5 px-6 rounded-[2rem] font-black transition-all text-xs tracking-widest uppercase ${
            reportType === 'audit' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <History size={16} /> Audit Pentaksiran
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full md:w-auto">
          {reportType !== 'individual' && (
            <select 
              className="bg-white p-4 rounded-2xl border border-slate-100 font-black text-slate-700 shadow-sm focus:ring-4 focus:ring-indigo-500/10 uppercase text-xs tracking-wider min-w-[200px]"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {data.classes.map(c => <option key={c} value={c}>Kelas: {c}</option>)}
            </select>
          )}
          {reportType === 'individual' && (
            <select 
              className="bg-white p-4 rounded-2xl border border-slate-100 font-black text-slate-700 shadow-sm focus:ring-4 focus:ring-indigo-500/10 uppercase text-xs tracking-wider min-w-[300px]"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
            >
              <option value="">-- PILIH MURID --</option>
              {data.students.sort((a,b) => a.nama.localeCompare(b.nama)).map(s => (
                <option key={s.id} value={s.id}>{s.nama} ({s.kelas})</option>
              ))}
            </select>
          )}
        </div>
        <button 
          onClick={() => handleDownloadPDF()}
          className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all active:scale-95 text-xs tracking-widest uppercase"
        >
          <Printer size={20} />
          CETAK LAPORAN LENGKAP
        </button>
      </div>

      <div id="report-container" className="bg-white p-16 rounded-[4.5rem] shadow-sm border border-slate-100 min-h-[800px]">
        <div className="flex justify-between items-center mb-12 border-b-4 border-slate-900 pb-10">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black italic shadow-2xl">
              R
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 leading-none">Penyata Pentaksiran Bilik Darjah (PBD)</h1>
              <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mt-3">Dokumen Rasmi • Sesi Persekolahan 2026/2027</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-3 text-slate-900 mb-2">
              <School size={20} className="text-indigo-600" />
              <p className="font-black text-xl uppercase tracking-tighter">{data.userProfile.schoolName}</p>
            </div>
            <div className="flex items-center justify-end gap-3 bg-indigo-50 px-6 py-2 rounded-full border border-indigo-100">
              <BookOpen size={14} className="text-indigo-600" />
              <p className="text-indigo-600 font-black text-[10px] uppercase tracking-widest">KSSM RBT TINGKATAN 1</p>
            </div>
          </div>
        </div>

        <div className="report-content">
          {reportType === 'matrix' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                    <Table size={20} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-slate-800">Matrik Tahap Penguasaan - Kelas {selectedClass}</h3>
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl border border-slate-200">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-white">
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center w-16">BIL</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-left">NAMA MURID</th>
                      {INITIAL_TOPICS.map(t => (
                        <th key={t.id} className="p-6 text-[9px] font-black uppercase tracking-widest text-center">Unit {t.id}</th>
                      ))}
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center bg-indigo-600">TP AKHIR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.students.filter(s => s.kelas === selectedClass).map((student, idx) => (
                      <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors group">
                        <td className="p-6 text-center font-black text-slate-400 text-xs">{idx + 1}</td>
                        <td className="p-6 font-black text-slate-800 uppercase text-xs group-hover:text-indigo-600 transition-colors">{student.nama}</td>
                        {INITIAL_TOPICS.map(topic => {
                          const records = data.records.filter(r => r.studentId === student.id && r.topicId === topic.id);
                          const highestTP = records.length > 0 ? Math.max(...records.map(r => r.tp)) : "-";
                          return (
                            <td key={topic.id} className={`p-6 text-center font-black text-sm ${highestTP !== "-" ? 'text-slate-900' : 'text-slate-200'}`}>
                              {highestTP}
                            </td>
                          );
                        })}
                        <td className="p-6 text-center font-black text-indigo-600 bg-indigo-50/50 text-lg">{getHighestTP(student.id)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {reportType === 'class_evidence' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
               <div className="flex items-center gap-4 mb-12">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-slate-800">Laporan Evidens & Kaedah Pentaksiran</h3>
                </div>
              </div>
              <div className="space-y-16">
                {INITIAL_TOPICS.map(topic => (
                  <div key={topic.id} className="page-break-after">
                    <div className="flex items-center justify-between mb-6 bg-slate-900 p-6 rounded-[2rem] text-white">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-black text-indigo-400 italic">U{topic.id}</div>
                         <h4 className="font-black uppercase tracking-widest text-sm">UNIT {topic.id}: {topic.title}</h4>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">DSKP RBT F1</span>
                    </div>
                    <div className="overflow-hidden rounded-[2rem] border border-slate-200">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="p-5 text-[9px] font-black uppercase tracking-widest text-left">NAMA MURID</th>
                            {topic.sps.map(sp => (
                              <th key={sp.kod} className="p-5 text-[9px] font-black uppercase tracking-widest text-center">{sp.kod}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {data.students.filter(s => s.kelas === selectedClass).map(student => (
                            <tr key={student.id} className="hover:bg-slate-50/50">
                              <td className="p-5 font-black text-slate-800 text-[10px] uppercase border-r border-slate-50">{student.nama}</td>
                              {topic.sps.map(sp => {
                                const record = getTPRecordForSP(student.id, sp.kod);
                                return (
                                  <td key={sp.kod} className="p-5 text-center border-r border-slate-50">
                                    {record ? (
                                      <div className="flex flex-col items-center gap-1.5">
                                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-md shadow-indigo-100">
                                          {record.tp}
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-400">
                                          {getKaedahIcon(record.kaedah)}
                                          <span className="text-[7px] font-black uppercase tracking-tighter">{record.kaedah}</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <span className="text-slate-200 font-black">-</span>
                                    )}
                                  </td>
                                );
                              })}
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
             <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-16">
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full translate-x-32 -translate-y-32 blur-[100px]"></div>
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="flex items-center gap-10">
                      <div className="w-32 h-32 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 flex items-center justify-center text-5xl font-black shadow-2xl">
                        {data.students.find(s => s.id === selectedStudentId)?.nama.charAt(0)}
                      </div>
                      <div className="space-y-4">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-1">PROFIL PENTAKSIRAN</p>
                        <h4 className="text-4xl font-black uppercase tracking-tight leading-none">{data.students.find(s => s.id === selectedStudentId)?.nama}</h4>
                        <div className="flex items-center gap-4">
                           <span className="bg-indigo-600 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">{data.students.find(s => s.id === selectedStudentId)?.kelas}</span>
                           <div className="flex items-center gap-2 text-indigo-200">
                             <ShieldCheck size={14} />
                             <span className="text-[10px] font-black uppercase tracking-widest italic">Authentic Assessment</span>
                           </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end justify-center">
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-[3rem] border border-white/10 text-center min-w-[200px]">
                           <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-3">Tahap Penguasaan Tertinggi</p>
                           <h4 className="text-8xl font-black text-white tracking-tighter">{getHighestTP(selectedStudentId)}</h4>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <h3 className="text-sm font-black uppercase tracking-[0.6em] text-slate-800 border-b-4 border-indigo-600 pb-5 inline-block">Analisis Standard Prestasi</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {INITIAL_TOPICS.map(topic => {
                      const records = data.records.filter(r => r.studentId === selectedStudentId && r.topicId === topic.id);
                      const highest = records.length > 0 ? Math.max(...records.map(r => r.tp)) : 0;
                      
                      return (
                        <div key={topic.id} className="group flex flex-col md:flex-row items-center gap-8 p-10 bg-white rounded-[3.5rem] border-2 border-slate-50 shadow-sm hover:border-indigo-500 hover:shadow-2xl transition-all">
                          <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center font-black text-3xl shadow-xl transition-all ${
                            highest >= 4 ? 'bg-emerald-600 text-white shadow-emerald-200' : 
                            highest >= 3 ? 'bg-indigo-600 text-white shadow-indigo-200' :
                            'bg-slate-100 text-slate-300'
                          }`}>
                            {highest || '-'}
                          </div>
                          <div className="flex-1 text-center md:text-left">
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] block mb-2">Unit {topic.id} • DSKP RBT F1</span>
                            <h4 className="font-black text-slate-800 uppercase text-xl tracking-tight leading-none mb-3 group-hover:text-indigo-600 transition-colors">{topic.title}</h4>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                               <div className="flex items-center gap-2">
                                 <CheckCircle2 size={12} className="text-emerald-500" />
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{records.length} SP Dinilai</span>
                               </div>
                            </div>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-3xl max-w-sm border border-slate-100 group-hover:bg-white transition-colors">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                               <FileSearch size={12} className="text-indigo-500" /> Ulusan Profesional
                             </p>
                             <p className="text-xs italic text-slate-600 font-bold leading-relaxed">
                              {records.length > 0 ? records[records.length - 1].notes || "Murid menunjukkan penguasaan yang sangat konsisten." : "Belum ada rekod penilaian direkodkan bagi unit ini."}
                             </p>
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
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-indigo-950 text-white rounded-xl flex items-center justify-center">
                  <History size={20} />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-slate-800">Audit Trail</h3>
                </div>
              </div>
              <div className="overflow-hidden rounded-[2.5rem] border border-slate-200">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="p-6 text-[9px] font-black uppercase tracking-widest text-left">TARIKH & MASA</th>
                      <th className="p-6 text-[9px] font-black uppercase tracking-widest text-left">NAMA MURID</th>
                      <th className="p-6 text-[9px] font-black uppercase tracking-widest text-center">KAEDAH</th>
                      <th className="p-6 text-[9px] font-black uppercase tracking-widest text-center">TP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.records
                      .filter(r => data.students.find(s => s.id === r.studentId)?.kelas === selectedClass)
                      .sort((a,b) => b.timestamp - a.timestamp)
                      .map(record => {
                        const student = data.students.find(s => s.id === record.studentId);
                        return (
                          <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-6 font-bold text-slate-400 text-[10px]">{new Date(record.timestamp).toLocaleString()}</td>
                            <td className="p-6 font-black text-slate-800 uppercase text-[10px]">{student?.nama}</td>
                            <td className="p-6 text-center">
                               <div className="flex items-center justify-center gap-2 text-slate-500 font-black text-[9px] uppercase tracking-tighter">
                                 {getKaedahIcon(record.kaedah)}
                                 {record.kaedah}
                               </div>
                            </td>
                            <td className="p-6 text-center font-black text-slate-900">{record.tp}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-24 flex flex-col md:flex-row justify-between items-end px-10 gap-16">
            <div className="w-full md:w-80 border-t-4 border-slate-900 pt-8 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Disediakan Oleh</p>
              <p className="font-black text-slate-900 uppercase tracking-tight text-lg leading-none mb-1">{data.userProfile.teacherName}</p>
              <p className="text-[9px] text-indigo-600 font-black uppercase tracking-widest mt-2 border-t border-slate-100 pt-2">GURU MATA PELAJARAN RBT</p>
            </div>
            
            <div className="flex flex-col items-center">
               <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center border-4 border-white shadow-2xl mb-4">
                  <ShieldCheck size={40} className="text-indigo-600" />
               </div>
               <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.5em]">MyPBD Verified Document</p>
            </div>

            <div className="w-full md:w-80 border-t-4 border-slate-900 pt-8 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Disahkan Oleh</p>
              <div className="h-16"></div>
              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest border-t border-slate-100 pt-2">CAP RASMI SEKOLAH & TARIKH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
