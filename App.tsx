
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckSquare, 
  ListTodo, 
  Users, 
  FileText, 
  Settings as SettingsIcon,
  Menu,
  X,
  BellRing,
  ShieldCheck,
  Library
} from 'lucide-react';
import { AppData, UserProfile } from './types';
import { APP_DATA_KEY, INITIAL_TOPICS } from './constants';

import Dashboard from './pages/Dashboard';
import LessonPrep from './pages/LessonPrep';
import Assessment from './pages/Assessment';
import Rubrics from './pages/Rubrics';
import Students from './pages/Students';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import ModuleDSKP from './pages/ModuleDSKP';

interface DataContextType {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  saveData: (newData: AppData, message?: string) => void;
  showToast: (msg: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};

const INITIAL_DATA: AppData = {
  students: [],
  records: [],
  classes: ["1 UM", "1 UKM", "1 USM"],
  userProfile: {
    teacherName: "NAMA GURU",
    schoolName: "NAMA SEKOLAH"
  },
  customRubrics: INITIAL_TOPICS.reduce((acc, topic) => {
    acc[topic.id] = topic.tps;
    return acc;
  }, {} as Record<string, any>)
};

const App: React.FC = () => {
  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem(APP_DATA_KEY);
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [toast, setToast] = useState<{message: string; visible: boolean}>({
    message: "",
    visible: false
  });

  const showToast = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const saveData = (newData: AppData, message?: string) => {
    setData(newData);
    localStorage.setItem(APP_DATA_KEY, JSON.stringify(newData));
    if (message) showToast(message);
  };

  return (
    <DataContext.Provider value={{ data, setData, saveData, showToast }}>
      <HashRouter>
        <Layout />
        {toast.visible && (
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[9999] animate-in slide-in-from-bottom-12 fade-in duration-500">
            <div className="bg-slate-950 text-white px-10 py-5 rounded-[2rem] shadow-2xl flex items-center gap-5 border border-white/10 backdrop-blur-3xl">
              <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40">
                <BellRing size={20} className="text-white animate-ring" />
              </div>
              <p className="font-extrabold text-sm tracking-widest uppercase">{toast.message}</p>
            </div>
          </div>
        )}
      </HashRouter>
    </DataContext.Provider>
  );
};

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { data } = useData();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Modul DSKP', icon: Library, path: '/module-dskp' },
    { name: 'Persediaan PdP', icon: BookOpen, path: '/lesson-prep' },
    { name: 'Pentaksiran', icon: CheckSquare, path: '/assessment' },
    { name: 'Rubrik', icon: ListTodo, path: '/rubrics' },
    { name: 'Murid & Kelas', icon: Users, path: '/students' },
    { name: 'Laporan', icon: FileText, path: '/reports' },
    { name: 'Tetapan', icon: SettingsIcon, path: '/settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <aside 
        className={`${
          isSidebarOpen ? 'w-[22rem]' : 'w-0'
        } glass-sidebar text-white transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col fixed h-full z-50 md:relative overflow-hidden shadow-[20px_0_50px_rgba(0,0,0,0.3)]`}
      >
        <div className="p-12 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 rounded-[1.2rem] flex items-center justify-center font-black text-3xl italic shadow-[0_10px_25px_rgba(79,70,229,0.4)] border border-white/20">
              R
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase leading-none text-white">MyPBD</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] font-black text-indigo-400 tracking-[0.4em] uppercase">RBT TINGKATAN 1</span>
                <ShieldCheck size={10} className="text-emerald-500" />
              </div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-8 space-y-2 overflow-y-auto custom-scroll py-6">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-8 py-5 rounded-[1.5rem] transition-all duration-500 group relative ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-2xl shadow-indigo-600/30 translate-x-2' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
                }`}
              >
                <div className="flex items-center gap-5">
                  <item.icon size={22} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400 transition-colors'} />
                  <span className="font-extrabold text-xs tracking-[0.15em] uppercase">{item.name}</span>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]"></div>}
              </Link>
            );
          })}
        </nav>

        <div className="p-10">
          <div className="bg-gradient-to-br from-white/5 to-transparent p-8 rounded-[2rem] border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
               <p className="text-[10px] text-slate-500 font-black tracking-[0.3em] uppercase">Status Sistem</p>
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <p className="text-sm font-black text-white tracking-tight uppercase">Sistem Pengurusan Pentaksiran</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-28 flex items-center justify-between px-14 sticky top-0 z-40 bg-white/40 backdrop-blur-xl border-b border-slate-200/50">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="w-14 h-14 bg-white hover:bg-slate-50 border border-slate-200 rounded-[1.2rem] flex items-center justify-center text-slate-700 shadow-sm transition-all active:scale-90 group"
            >
              <Menu size={26} className="group-hover:text-indigo-600 transition-colors" />
            </button>
            <div className="h-10 w-[1px] bg-slate-200/60 hidden md:block"></div>
            <div className="hidden md:block">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                {menuItems.find(m => m.path === location.pathname)?.name || 'Halaman'}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aktiviti Masa Nyata</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden lg:block text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Institusi Berdaftar</p>
              <p className="font-extrabold text-slate-800 text-sm tracking-tight">{data.userProfile.schoolName}</p>
            </div>
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-[1.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative w-16 h-16 rounded-[1.4rem] bg-white border border-slate-200 flex items-center justify-center text-indigo-600 font-black text-xl shadow-xl transition-all cursor-pointer group-hover:border-indigo-500">
                {data.userProfile.teacherName.charAt(0)}
               </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-14 custom-scroll pb-32">
          <div className="max-w-[1700px] mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/module-dskp" element={<ModuleDSKP />} />
              <Route path="/lesson-prep" element={<LessonPrep />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/rubrics" element={<Rubrics />} />
              <Route path="/students" element={<Students />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
