
import React, { useState } from 'react';
import { useData } from '../App';
import { INITIAL_TOPICS } from '../constants';
import { 
  FileDown, 
  Table, 
  User, 
  Activity, 
  History,
  FileSearch,
  School
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
        <button 
          onClick={() => setReportType('matrix')}
          className={`flex-1 flex items-center justify-center gap-2 py-5 px-6 rounded-[2rem] font-black transition-all text-xs tracking-widest uppercase ${
            reportType === 'matrix' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <Table size={16} /> Matrik TP
        </button>
        <button 
          onClick={() => setReportType('class_evidence')}
          className={`flex-1 flex items-center justify-center gap-2 py-5 px-6 rounded-[2rem] font-black transition-all text-xs tracking-widest uppercase ${
            reportType === 'class_evidence' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <Activity size={16} /> Evidens Kelas
        </button>
        <button 
          onClick={() => setReportType('individual')}
          className={`flex-1 flex items-center justify-center gap-2 py-5 px-6 rounded-[2rem] font-black transition-all text-xs tracking-widest uppercase ${
            reportType === 'individual' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <User size={16} /> Individu
        </button>
        <button 
          onClick={() => setReportType('audit')}
          className={`flex-1 flex items-center justify-center gap-2 py-5 px-6 rounded-[2rem] font-black transition-all text-xs tracking-widest uppercase ${
            reportType === 'audit' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <History size={16} /> Audit Trail
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full md:w-auto">
          {reportType !== 'individual' && (
            <select 
              className="bg-white p-4 rounded-2xl border border-slate-100 font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-indigo-500 min-w-[200px]"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {data.classes.map(c => <option key={c} value={c}>Kelas: {c}</option>)}
            </select>
          )}
          {reportType === 'individual' && (
            <select 
              className="bg-white p-4 rounded-2xl border border-slate-100 font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-indigo-500 min-w-[300px]"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
            >
              <option value="">-- Pilih Murid --</option>
              {data.students.sort((a,b) => a.nama.localeCompare(b.nama)).map(s => (
                <option key={s.id} value={s.id}>{s.nama} ({s.kelas})</option>
              ))}
            </select>
          )}
        </div>
        <button 
          onClick={handleDownloadPDF}
          className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 shadow-xl transition-all"
        >
          <FileDown size={20} />
          MUAT TURUN PDF
        </button>
      </div>

      {/* Report Container */}
      <div id="report-container" className="bg-white p-16 rounded-[3rem] shadow-sm border border-slate-100 min-h-[800px]">
        {/* Report Header */}
        <div className="flex justify-between items-center mb-12 border-b-2 border-slate-900 pb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-white text-3xl font-black italic">
              R
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Laporan Pentaksiran Bilik Darjah (PBD)</h1>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mt-1">Sesi Persekolahan 2026/2027</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 text-slate-900 mb-1">
              <School size={16} />
              <p className="font-black text-lg uppercase">{data.userProfile.schoolName}</p>
            </div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Subjek: Reka Bentuk & Teknologi (F1)</p>
          </div>
        </div>

        {/* Report Body */}
        <div className="report-content">
          {reportType === 'matrix' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-3 mb-8">
                <Table className="text-indigo-600" />
                <h3 className="text-xl font-black uppercase tracking-wider">Matrik Tahap Penguasaan Keseluruhan - Kelas {selectedClass}</h3>
              </div>
              <table className="w-full border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 p-4 text-xs font-black uppercase">BIL</th>
                    <th className="border border-slate-200 p-4 text-xs font-black uppercase text-left">NAMA MURID</th>
                    {INITIAL_TOPICS.map(t => (
                      <th key={t.id} className="border border-slate-200 p-4 text-[10px] font-black uppercase text-center w-20">Bab {t.id}</th>
                    ))}
                    <th className="border border-slate-200 p-4 text-xs font-black uppercase text-center bg-indigo-50 text-indigo-600">TP AKHIR</th>
                  </tr>
                </thead>
                <tbody>
                  {data.students.filter(s => s.kelas === selectedClass).map((student, idx) => (
                    <tr key={student.id} className="hover:bg-slate-50">
                      <td className="border border-slate-200 p-4 text-center font-bold text-slate-400">{idx + 1}</td>
                      <td className="border border-slate-200 p-4 font-bold text-slate-700 uppercase">{student.nama}</td>
                      {INITIAL_TOPICS.map(topic => {
                        const records = data.records.filter(r => r.studentId === student.id && r.topicId === topic.id);
                        const highestTP = records.length > 0 ? Math.max(...records.map(r => r.tp)) : "-";
                        return (
                          <td key={topic.id} className="border border-slate-200 p-4 text-center font-black">{highestTP}</td>
                        );
                      })}
                      <td className="border border-slate-200 p-4 text-center font-black bg-indigo-50 text-indigo-700">{getHighestTP(student.id)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {reportType === 'class_evidence' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
               <div className="flex items-center gap-3 mb-8">
                <Activity className="text-indigo-600" />
                <h3 className="text-xl font-black uppercase tracking-wider">Laporan Evidens SP - Kelas {selectedClass}</h3>
              </div>
              <div className="space-y-12">
                {INITIAL_TOPICS.map(topic => (
                  <div key={topic.id} className="page-break-after">
                    <h4 className="bg-slate-900 text-white px-6 py-3 font-black uppercase tracking-widest text-sm rounded-xl mb-4">
                      UNIT {topic.id}: {topic.title}
                    </h4>
                    <table className="w-full border-collapse border border-slate-200">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="border border-slate-200 p-4 text-xs font-black uppercase text-left">NAMA MURID</th>
                          {topic.sps.map(sp => (
                            <th key={sp.kod} className="border border-slate-200 p-4 text-[10px] font-black uppercase text-center">{sp.kod}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.students.filter(s => s.kelas === selectedClass).map(student => (
                          <tr key={student.id}>
                            <td className="border border-slate-200 p-4 font-bold text-slate-700 text-sm uppercase">{student.nama}</td>
                            {topic.sps.map(sp => (
                              <td key={sp.kod} className="border border-slate-200 p-4 text-center font-black">{getTPForSP(student.id, sp.kod)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          )}

          {reportType === 'individual' && selectedStudentId && (
             <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-10">
                <div className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Nama Penuh</p>
                      <h4 className="text-2xl font-black text-slate-800 uppercase">{data.students.find(s => s.id === selectedStudentId)?.nama}</h4>
                    </div>
                    <div className="flex gap-10">
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Kelas</p>
                        <h4 className="text-xl font-black text-slate-800">{data.students.find(s => s.id === selectedStudentId)?.kelas}</h4>
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">TP Keseluruhan</p>
                        <h4 className="text-3xl font-black text-indigo-600">{getHighestTP(selectedStudentId)}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <div className="text-right">
                       <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Tier Kemasukan</p>
                       <span className="px-6 py-2 bg-indigo-600 text-white rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-lg">
                         TIER {data.students.find(s => s.id === selectedStudentId)?.tier}
                       </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-black uppercase tracking-widest border-b-2 border-slate-100 pb-3">Ringkasan Pencapaian Topik</h3>
                  {INITIAL_TOPICS.map(topic => {
                    const records = data.records.filter(r => r.studentId === selectedStudentId && r.topicId === topic.id);
                    const highest = records.length > 0 ? Math.max(...records.map(r => r.tp)) : 0;
                    
                    return (
                      <div key={topic.id} className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${
                          highest >= 4 ? 'bg-emerald-500 text-white' : 
                          highest >= 3 ? 'bg-indigo-500 text-white' :
                          'bg-slate-200 text-slate-400'
                        }`}>
                          {highest || '-'}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Bab {topic.id}</p>
                          <h4 className="font-bold text-slate-700">{topic.title}</h4>
                        </div>
                        <div className="text-right hidden md:block max-w-md">
                          <p className="text-xs italic text-slate-500">
                            {records.length > 0 ? records[records.length - 1].notes || "Tiada catatan tambahan." : "Belum dinilai."}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
             </div>
          )}

          {reportType === 'audit' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-3 mb-8">
                <History className="text-indigo-600" />
                <h3 className="text-xl font-black uppercase tracking-wider">Audit Trail Penilaian - Kelas {selectedClass}</h3>
              </div>
              <table className="w-full border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 p-4 text-xs font-black uppercase text-left">TARIKH & MASA</th>
                    <th className="border border-slate-200 p-4 text-xs font-black uppercase text-left">MURID</th>
                    <th className="border border-slate-200 p-4 text-xs font-black uppercase text-center">SP</th>
                    <th className="border border-slate-200 p-4 text-xs font-black uppercase text-center">TP</th>
                    <th className="border border-slate-200 p-4 text-xs font-black uppercase text-left">CATATAN</th>
                  </tr>
                </thead>
                <tbody>
                  {data.records
                    .filter(r => data.students.find(s => s.id === r.studentId)?.kelas === selectedClass)
                    .sort((a,b) => b.timestamp - a.timestamp)
                    .map(record => {
                      const student = data.students.find(s => s.id === record.studentId);
                      return (
                        <tr key={record.id}>
                          <td className="border border-slate-200 p-4 text-xs font-medium text-slate-500">{new Date(record.timestamp).toLocaleString()}</td>
                          <td className="border border-slate-200 p-4 font-bold text-slate-700 text-sm uppercase">{student?.nama}</td>
                          <td className="border border-slate-200 p-4 text-center font-bold text-indigo-600">{record.spKod}</td>
                          <td className="border border-slate-200 p-4 text-center font-black">{record.tp}</td>
                          <td className="border border-slate-200 p-4 text-sm italic text-slate-500">{record.notes || "-"}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}

          {/* Report Footer Signature */}
          <div className="mt-20 flex justify-between">
            <div className="w-64 border-t-2 border-slate-900 pt-4 text-center">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Disediakan Oleh</p>
              <p className="font-black text-slate-900 uppercase">{data.userProfile.teacherName}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Guru RBT (PBD System)</p>
            </div>
            <div className="w-64 border-t-2 border-slate-900 pt-4 text-center">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Disahkan Oleh</p>
              <p className="text-slate-200 h-6">_____________________</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">Cap Rasmi Sekolah</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
