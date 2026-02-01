
import React, { useState } from 'react';
import { useData } from '../App';
import { Save, UserCircle, School, Trash2, Database } from 'lucide-react';

const Settings: React.FC = () => {
  const { data, saveData } = useData();
  const [profile, setProfile] = useState(data.userProfile);

  const handleSave = () => {
    saveData({ ...data, userProfile: profile });
    alert("Tetapan berjaya dikemaskini!");
  };

  const handleResetAll = () => {
    if (confirm("AMARAN: Ini akan memadam SEMUA DATA (Murid, Kelas, Rekod Pentaksiran) secara kekal. Teruskan?")) {
      localStorage.removeItem('appData_mypbd_v1');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
        <div className="mb-12">
          <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Tetapan Profil Guru</h3>
          <p className="text-slate-500 mt-2">Maklumat ini akan dipaparkan dalam laporan PDF dan RPH anda.</p>
        </div>

        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <UserCircle size={14} className="text-indigo-500" />
                Nama Penuh Guru
              </label>
              <input 
                type="text"
                className="w-full p-6 rounded-[2rem] bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 font-bold uppercase"
                value={profile.teacherName}
                onChange={(e) => setProfile({...profile, teacherName: e.target.value})}
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <School size={14} className="text-indigo-500" />
                Nama Sekolah
              </label>
              <input 
                type="text"
                className="w-full p-6 rounded-[2rem] bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 font-bold uppercase"
                value={profile.schoolName}
                onChange={(e) => setProfile({...profile, schoolName: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button 
              onClick={handleSave}
              className="w-full md:w-auto px-12 py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              <Save size={20} />
              KEMASKINI TETAPAN
            </button>
          </div>
        </div>
      </div>

      <div className="bg-rose-50 p-12 rounded-[3rem] border border-rose-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl font-black text-rose-800 uppercase tracking-tight flex items-center gap-3">
              <Database size={24} />
              Zon Bahaya (Danger Zone)
            </h3>
            <p className="text-rose-600 mt-2 font-medium">Kosongkan semua data aplikasi untuk memulakan sesi baru.</p>
          </div>
          <button 
            onClick={handleResetAll}
            className="w-full md:w-auto px-10 py-5 bg-rose-600 text-white font-black rounded-[2rem] hover:bg-rose-700 transition-all shadow-lg flex items-center justify-center gap-3"
          >
            <Trash2 size={20} />
            FORMAT SEMUA DATA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
