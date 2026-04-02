import React, { useState } from 'react';
import { 
  Users, 
  ChevronRight, 
  Gift, 
  TrendingUp, 
  ArrowUpRight, 
  UserCheck, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Search, 
  Filter, 
  Download,
  Share2,
  Package,
  Layers,
  Activity,
  Award
} from 'lucide-react';

const ReferralDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Total Earnings', value: '₹ 1,42,500', icon: Gift, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Total Referrals', value: '2,840', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Active Campaigns', value: '12', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Payout Settlements', value: '₹ 98,200', icon: Award, color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  const recentReferrals = [
    { id: 'REF-9021', user: 'Amit Sharma', type: 'User → User', earning: '₹ 50', date: '1st Apr 02:30 PM', status: 'Credited' },
    { id: 'REF-9022', user: 'Sanjay Gupta', type: 'Driver → Driver', earning: '₹ 100', date: '31st Mar 11:15 AM', status: 'Pending' },
    { id: 'REF-9023', user: 'Priya Singh', type: 'User → Driver', earning: '₹ 75', date: '31st Mar 09:45 AM', status: 'Credited' },
    { id: 'REF-9024', user: 'Rahul Verma', type: 'Driver → User', earning: '₹ 50', date: '30th Mar 06:20 PM', status: 'Credited' },
  ];

  return (
    <div className="space-y-10 p-1 animate-in fade-in duration-700 font-sans text-gray-950">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
         <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-2 leading-none uppercase tracking-tighter italic">Referral Dashboard</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950 uppercase tracking-widest leading-none italic">Intelligence</span>
               <ChevronRight size={14} />
               <span className="uppercase tracking-widest leading-none">Viral Growth Analytics</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-100 text-gray-950 px-5 py-2.5 rounded-xl text-[12px] font-black flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
               <Download size={16} className="text-gray-400" /> Export growth logs
            </button>
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-[12px] font-black flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
               <Zap size={16} /> Update Campaigns
            </button>
         </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-all">
               <div className={`absolute top-0 right-0 p-6 opacity-5 scale-[2.5] -rotate-12 translate-x-4 ${stat.color}`}><stat.icon size={80} strokeWidth={1} /></div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 relative z-10">{stat.label}</p>
               <div className="relative z-10">
                  <p className="text-3xl font-black text-gray-950 tracking-tighter leading-none mb-2">{stat.value}</p>
                  <p className="text-[11px] font-black text-emerald-500 uppercase flex items-center gap-1.5 leading-none mt-4 uppercase italic">
                     <ArrowUpRight size={14} strokeWidth={3} /> 12% Growth this week
                  </p>
               </div>
            </div>
         ))}
      </div>

      {/* DATA VISUALIZATION & LOGS */}
      <div className="grid grid-cols-12 gap-8 items-start">
         {/* Growth Graph Placeholder */}
         <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="bg-gray-950 rounded-[48px] p-10 text-white relative overflow-hidden min-h-[450px] shadow-2xl flex flex-col justify-between group">
               <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 translate-x-20"><TrendingUp size={180} strokeWidth={1} /></div>
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8 italic">Growth Telemetry</h4>
                  <div className="flex items-end gap-2 h-40">
                     {[10, 30, 20, 60, 45, 80, 50, 90, 70, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-white/10 rounded-t-lg relative group/bar hover:bg-emerald-400 transition-all" style={{ height: `${h}%` }}>
                           <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white text-gray-950 px-2 py-1 rounded text-[10px] font-black opacity-0 group-hover/bar:opacity-100 transition-opacity">₹{h}k</div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="flex items-center justify-between relative z-10 border-t border-white/5 pt-8">
                  <div>
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] mb-1">Peak Conversion</p>
                     <p className="text-2xl font-black italic tracking-tighter">FRI @ 14:00</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="text-right">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] mb-1">Retention</p>
                        <p className="text-2xl font-black text-emerald-400">84.2%</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Recent Referral Table */}
            <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                  <h4 className="text-[14px] font-black uppercase tracking-[0.15em] text-gray-950 italic">Recent Viral Conversions</h4>
                  <button className="text-indigo-600 text-[11px] font-black uppercase tracking-widest hover:underline italic">View all logs →</button>
               </div>
               <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 italic">
                           <th className="px-8 py-5">Ref ID</th>
                           <th className="px-5 py-5">Initiator</th>
                           <th className="px-5 py-5 text-center">Type</th>
                           <th className="px-5 py-5 text-center">Earning</th>
                           <th className="px-5 py-5 text-center w-28">Status</th>
                           <th className="px-8 py-5 text-right w-10"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {recentReferrals.map((row, i) => (
                           <tr key={i} className="hover:bg-gray-50/20 transition-all group">
                              <td className="px-8 py-6 text-[12px] font-bold text-gray-950 uppercase tracking-tight italic">{row.id}</td>
                              <td className="px-5 py-6 font-black text-[14px] text-gray-950 uppercase leading-none tracking-tighter italic">{row.user}</td>
                              <td className="px-5 py-6 text-center text-[11px] font-bold text-gray-400 uppercase tracking-widest italic">{row.type}</td>
                              <td className="px-5 py-6 text-center font-black text-emerald-600 italic">{row.earning}</td>
                              <td className="px-5 py-6 text-center">
                                 <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border italic ${row.status === 'Credited' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                    {row.status}
                                 </span>
                              </td>
                              <td className="px-8 py-6 text-right"><ChevronRight size={16} className="text-gray-300 group-hover:translate-x-1 transition-transform" /></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Side Widgets */}
         <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[40px] p-10 border border-gray-50 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 scale-[2] -rotate-12 translate-x-4"><UserCheck size={100} strokeWidth={1} /></div>
               <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-8 italic">Audit Intelligence</h4>
               <div className="space-y-6 relative z-10">
                  <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-50">
                     <p className="text-[13px] font-bold text-gray-500 leading-relaxed italic opacity-80">"Fraud detection engine is monitoring all cash-out requests. 14 potential duplicate accounts flagged this week."</p>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-6 group/item cursor-pointer">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-50 text-rose-500 rounded-lg group-hover/item:scale-110 transition-transform"><Activity size={18} /></div>
                        <p className="text-[12px] font-black uppercase text-gray-950 italic">Anomaly Detection</p>
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Active</span>
                  </div>
               </div>
            </div>

            <div className="bg-indigo-600 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-20 rotate-12 translate-x-4"><Gift size={140} strokeWidth={1} /></div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-8 italic">Reward Distribution</h4>
               <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                     <span className="text-[14px] font-bold opacity-60 italic">Total Rewarded Today</span>
                     <span className="text-2xl font-black italic tracking-tighter">₹ 4,300</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                     <div className="w-[65%] h-full bg-white shadow-[0_0_10px_white] rounded-full"></div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[40px] p-10 border border-emerald-50 shadow-sm relative overflow-hidden italic group">
               <div className="absolute top-0 right-0 p-8 opacity-5 scale-[2] -rotate-12 translate-x-4"><ShieldCheck size={100} strokeWidth={1} /></div>
               <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-6 italic">Compliance Verification</h4>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 italic"><ShieldCheck size={26} /></div>
                  <div>
                     <p className="text-[15px] font-black uppercase text-gray-950 leading-none">Fully Governed</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1 italic">AES-256 Vault-Sync</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      {/* FOOTER */}
      <footer className="mt-12 flex items-center justify-between px-8 py-6 border-t border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
         <div>2026 © REDIGO VIRAL MGMT.</div>
         <div>AI Powered Insights</div>
         <div className="flex items-center gap-2">
            Engine Version <span className="text-emerald-600 italic">V 1.0.4</span>
         </div>
      </footer>
    </div>
  );
};

export default ReferralDashboard;
