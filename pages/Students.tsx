
import React, { useState } from 'react';
import { useData } from '../App';
import { 
  Users, 
  Layers, 
  Plus, 
  Trash2, 
  UserPlus, 
  Edit2, 
  UploadCloud,
  X,
  Search,
  GraduationCap
} from 'lucide-react';
import { Student } from '../types';

const Students: React.FC = () => {
  const { data, saveData } = useData();
  const [activeTab, setActiveTab] = useState<'students' | 'classes'>('students');
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({ nama: "", kelas: data.classes[0] });
  const [bulkText, setBulkText] = useState("");
  const [newClassName, setNewClassName] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  const handleAddStudent = () => {
    if (!newStudent.nama || !newStudent.kelas) return;
    const s: Student = {
      id: Date.now().toString(),
      nama: newStudent.nama!.toUpperCase(),
      kelas: newStudent.kelas!
    };
    saveData({ ...data, students: [...data.students, s] });
    setNewStudent({ nama: "", kelas: data.classes[0] });
    setShowAddStudent(false);
  };

  const handleBulkUpload = () => {
    const lines = bulkText.split("\n").filter(l => l.trim() !== "");
    const newStudents: Student[] = lines.map(line => ({
      id: Math.random().toString(36).substr(2, 9),
      nama: line.trim().toUpperCase(),
      kelas: newStudent.kelas || data.classes[0]
    }));
    saveData({ ...data, students: [...data.students, ...newStudents] });
    setBulkText("");
    setShowBulkUpload(false);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm("Adakah anda pasti mahu memadam murid ini? Rekod penilaian juga akan hilang.")) {
      saveData({
        ...data,
        students: data.students.filter(s => s.id !== id),
        records: data.records.filter(r => r.studentId !== id)
      });
    }
  };

  const handleAddClass = () => {
    const trimmed = newClassName.trim().toUpperCase();
    if (!trimmed || data.classes.includes(trimmed)) return;
    saveData({ ...data, classes: [...data.classes, trimmed] });
    setNewClassName("");
  };

  const handleDeleteClass = (className: string) => {
    const hasStudents = data.students.some(s => s.kelas === className);
    if (hasStudents) {
      alert("Tidak boleh memadam kelas yang masih mempunyai murid.");
      return;
    }
    saveData({ ...data, classes: data.classes.filter(c => c !== className) });
  };

  const filteredStudents = data.students
    .filter(s => s.nama.toLowerCase().includes(studentSearch.toLowerCase()))
    .sort((a,b) => a.nama.localeCompare(b.nama));

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Premium Tab Switcher */}
      <div className="flex bg-white p-2 rounded-3xl shadow-sm border border-slate-200 max-w-sm mx-auto md:mx-0">
        <button 
          onClick={() => setActiveTab('students')}
          className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs tracking-widest transition-all ${
            activeTab === 'students' 
              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-y-[-2px]' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Users size={16} />
          MURID
        </button>
        <button 
          onClick={() => setActiveTab('classes')}
          className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs tracking-widest transition-all ${
            activeTab === 'classes' 
              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-y-[-2px]' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Layers size={16} />
          KELAS
        </button>
      </div>

      {activeTab === 'students' ? (
        <div className="space-y-8">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
            <div>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Pangkalan Data Murid</h3>
              <p className="text-slate-500 font-medium mt-1">Urus profil murid secara sistematik.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text"
                  placeholder="Cari nama murid..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowBulkUpload(true)}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-indigo-50 text-indigo-600 font-black text-xs tracking-widest hover:bg-indigo-100 transition-all active:scale-95"
              >
                <UploadCloud size={16} />
                BULK IMPORT
              </button>
              <button 
                onClick={() => setShowAddStudent(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-xs tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
              >
                <UserPlus size={16} />
                MURID BARU
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Nama Murid</th>
                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Kelas</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length > 0 ? filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-600 transition-all border border-transparent group-hover:border-indigo-100">
                            <GraduationCap size={18} />
                          </div>
                          <p className="font-bold text-slate-800 text-sm">{student.nama}</p>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs font-black tracking-tight border border-slate-200 group-hover:bg-white transition-all uppercase">
                          {student.kelas}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all hover:shadow-md">
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteStudent(student.id)}
                            className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-600 shadow-sm transition-all hover:shadow-md"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="p-32 text-center">
                        <div className="max-w-xs mx-auto">
                          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <Users size={32} />
                          </div>
                          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Pangkalan data kosong</p>
                          <p className="text-slate-300 text-[10px] mt-2 font-medium">Sila tambah murid atau gunakan fungsi Bulk Import untuk memulakan.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Add Class Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 sticky top-32">
              <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase mb-2">Tambah Kelas</h3>
              <p className="text-slate-400 text-xs font-medium mb-8 leading-relaxed">Daftarkan nama kelas secara eksklusif untuk pengurusan murid yang lebih teratur.</p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Kelas</label>
                  <input 
                    type="text"
                    placeholder="Contoh: 1 AMANAH"
                    className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-black uppercase tracking-wider transition-all"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddClass()}
                  />
                </div>
                <button 
                  onClick={handleAddClass}
                  className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 text-xs tracking-widest"
                >
                  <Plus size={18} />
                  DAFTAR KELAS
                </button>
              </div>
            </div>
          </div>

          {/* Class List Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4 px-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Layers size={14} className="text-indigo-500" />
                Senarai Kelas Berdaftar ({data.classes.length})
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.classes.map(c => {
                const count = data.students.filter(s => s.kelas === c).length;
                return (
                  <div key={c} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-indigo-500 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-indigo-600 text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner uppercase">
                        {c.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 uppercase tracking-tight text-lg">{c}</h4>
                        <div className="flex items-center gap-2 mt-1">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                             {count} Murid Terdaftar
                           </p>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteClass(c)}
                      className="p-3 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      title="Padam Kelas"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                );
              })}
              {data.classes.length === 0 && (
                <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Sila daftar kelas di panel kiri</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-10 animate-in zoom-in-95 fade-in duration-300">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Daftar Murid</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Maklumat Murid Baru</p>
              </div>
              <button onClick={() => setShowAddStudent(false)} className="w-10 h-10 rounded-2xl hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"><X /></button>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Penuh Murid</label>
                <input 
                  type="text"
                  className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-black uppercase tracking-tight transition-all"
                  placeholder="MASUKKAN NAMA MURID..."
                  value={newStudent.nama}
                  onChange={(e) => setNewStudent({...newStudent, nama: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kelas</label>
                <select 
                  className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-black tracking-tight transition-all uppercase"
                  value={newStudent.kelas}
                  onChange={(e) => setNewStudent({...newStudent, kelas: e.target.value})}
                >
                  {data.classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button 
                onClick={handleAddStudent}
                className="w-full py-6 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 text-xs tracking-[0.2em]"
              >
                SAHKAN PENDAFTARAN
              </button>
            </div>
          </div>
        </div>
      )}

      {showBulkUpload && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-10 animate-in zoom-in-95 fade-in duration-300">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Bulk Import</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Muat Naik Senarai Nama Pukal</p>
              </div>
              <button onClick={() => setShowBulkUpload(false)} className="w-10 h-10 rounded-2xl hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"><X /></button>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pilih Sasaran Kelas</label>
                <select 
                  className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-black tracking-tight transition-all uppercase"
                  value={newStudent.kelas}
                  onChange={(e) => setNewStudent({...newStudent, kelas: e.target.value})}
                >
                  {data.classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Senarai Nama (Satu nama satu baris)</label>
                   <span className="text-[10px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-black">TIP: COPY DARI EXCEL</span>
                </div>
                <textarea 
                  rows={8}
                  className="w-full p-6 rounded-3xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-bold uppercase placeholder:text-slate-300 leading-relaxed transition-all"
                  placeholder="ALI BIN ABU&#10;CHONG MEI MEI&#10;RAVI KUMAR..."
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                />
              </div>
              <button 
                onClick={handleBulkUpload}
                className="w-full py-6 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-4 active:scale-95 text-xs tracking-[0.2em]"
              >
                <UploadCloud size={20} />
                MULAKAN PROSES IMPORT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
