
import React from 'react';
import { useData } from '../App';
import { 
  Users, 
  CheckCircle, 
  BarChart3, 
  Award,
  Activity,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { INITIAL_TOPICS } from '../constants';

const Dashboard: React.FC = () => {
  const { data } = useData();
  
  const totalStudents = data.students.length;
  const totalAssessments = data.records.length;
  
  const tpCounts = [1, 2, 3, 4, 5, 6].map(tp => ({
    name: `TP${tp}`,
    count: data.records.filter(r => r.tp === tp).length
  }));

  const tp3PlusCount = data.records.filter(r => r.tp >= 3).length;

  const stats = [
    { label: 'Jumlah Murid', value: totalStudents, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50/80', trend: '+12%' },
    { label: 'Jumlah Penilaian', value: totalAssessments, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50/80', trend: '+5%' },
    { label: 'Pencapaian TP3+', value: tp3PlusCount, icon: Award, color: 'text-amber-600', bg: 'bg-amber-50/80', trend: 'Stabil' },
    { label: 'Aktif Kelas', value: data.classes.length, icon: Layers, color: 'text-blue-600', bg: 'bg-blue-50/80', trend: 'Aktif' },
  ];

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* Premium Welcome Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10">
        <div className="space-y-4">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-tight">
            Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">PBD</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100 shadow-sm">
              <Activity size={12} className="text-indigo-500" />
              Real-time Analytics
            </span>
            <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">PBD RBT Tingkatan 1 KSSM</span>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-xl px-10 py-7 rounded-[2.5rem] shadow-xl border border-white flex items-center gap-10">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sesi Akademik</p>
            <p className="text-lg font-extrabold text-slate-800 tracking-tight">2026 / 2027</p>
          </div>
          <div className="w-[1.5px] h-12 bg-slate-100"></div>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)] animate-pulse"></div>
            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Sistem Online</span>
          </div>
        </div>
      </div>

      {/* Corporate Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-3 transition-all duration-700 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
               <span className="text-[10px] font-black text-slate-300 group-hover:text-indigo-500 transition-colors uppercase tracking-widest flex items-center gap-1">
                 {stat.trend} <ArrowUpRight size={10} />
               </span>
            </div>
            <div className={`${stat.bg} ${stat.color} w-20 h-20 rounded-[1.8rem] flex items-center justify-center mb-10 shadow-inner transition-all duration-700 group-hover:scale-110 group-hover:rotate-6`}>
              <stat.icon size={36} strokeWidth={2.5} />
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">{stat.label}</p>
            <h3 className="text-5xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Corporate Charts */}
      <div className="grid grid-cols-1 gap-10">
        <div className="bg-white p-14 rounded-[4rem] shadow-sm border border-slate-100 relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full translate-x-32 -translate-y-32 blur-[100px] opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between mb-16 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Profil Pencapaian</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Taburan Tahap Penguasaan Murid</p>
            </div>
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
               <BarChart3 size={28} />
            </div>
          </div>
          <div className="h-[450px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tpCounts}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc', radius: 20}}
                  contentStyle={{ borderRadius: '2rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '1.5rem', fontWeight: 800 }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[18, 18, 5, 5]} barSize={60}>
                   {tpCounts.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={index > 3 ? '#10b981' : '#6366f1'} />
                   ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Progress per Topic - Executive Section */}
      <div className="space-y-12">
        <div className="flex items-center gap-6">
           <div className="w-12 h-1 bg-indigo-600 rounded-full"></div>
           <h3 className="text-2xl font-black text-slate-900 uppercase tracking-[0.3em]">Status Silibus KSSM</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {INITIAL_TOPICS.map((topic) => {
            const assessedCount = new Set(data.records.filter(r => r.topicId === topic.id).map(r => r.studentId)).size;
            const progress = totalStudents > 0 ? Math.round((assessedCount / totalStudents) * 100) : 0;
            
            return (
              <div key={topic.id} className="p-10 rounded-[3.5rem] bg-white border border-slate-100 hover:border-indigo-400 transition-all duration-700 group shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5">
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                      BAB {topic.id}
                    </span>
                    <h4 className="font-black text-xl text-slate-800 leading-none group-hover:text-indigo-600 transition-colors line-clamp-1">{topic.title}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">{progress}%</span>
                  </div>
                </div>
                
                <div className="w-full h-3.5 bg-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-100 p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-700 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(79,70,229,0.3)]" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center mt-8">
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    {assessedCount} / {totalStudents} Murid Dinilai
                  </p>
                  <div className="flex -space-x-4">
                     {[...Array(Math.min(3, assessedCount))].map((_, i) => (
                       <div key={i} className="w-8 h-8 rounded-xl ring-4 ring-white bg-slate-100 border border-slate-200"></div>
                     ))}
                     {assessedCount > 3 && (
                       <div className="w-8 h-8 rounded-xl ring-4 ring-white bg-indigo-600 text-[9px] flex items-center justify-center font-black text-white shadow-lg shadow-indigo-600/30">
                         +{assessedCount - 3}
                       </div>
                     )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
