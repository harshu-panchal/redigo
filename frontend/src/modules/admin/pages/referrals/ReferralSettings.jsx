import React, { useState } from 'react';
import { 
  Users, 
  ChevronRight, 
  Gift, 
  Save, 
  UserPlus, 
  Car, 
  ShieldCheck, 
  Zap, 
  Info,
  BadgeCheck,
  TrendingUp,
  Share2
} from 'lucide-react';

const ReferralSettings = () => {
  const [userReferralEnabled, setUserReferralEnabled] = useState(true);
  const [driverReferralEnabled, setDriverReferralEnabled] = useState(true);

  const [settings, setSettings] = useState({
    userToUser: 50,
    userToDriver: 50,
    driverToUser: 50,
    driverToDriver: 50
  });

  return (
    <div className="space-y-8 p-1 animate-in fade-in duration-700 font-sans text-gray-950 max-w-7xl mx-auto pb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-2 leading-none uppercase tracking-tighter">Referral Settings</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950 uppercase tracking-widest leading-none italic">Promotions mgmt</span>
               <ChevronRight size={14} />
               <span className="uppercase tracking-widest leading-none">Referral Earnings Setup</span>
            </div>
         </div>
      </div>

      {/* USER REFERRAL CARD */}
      <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden transition-all group">
         <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
            <div className="flex items-center gap-5">
               <div className="p-4 bg-white rounded-2xl text-indigo-600 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                  <UserPlus size={28} />
               </div>
               <div>
                  <h2 className="text-xl font-black text-gray-950 tracking-tight uppercase leading-none mb-1.5 focus:outline-none">User Referral Earnings Setup</h2>
                  <p className="text-[12px] font-bold text-gray-400 italic">Invite others to use our app with your unique referral code and earn exciting rewards!</p>
               </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
               <input type="checkbox" className="sr-only peer" checked={userReferralEnabled} onChange={() => setUserReferralEnabled(!userReferralEnabled)} />
               <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
            </label>
         </div>

         <div className={`p-10 space-y-8 transition-all duration-500 ${userReferralEnabled ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-50 flex items-center justify-between group/item hover:bg-white hover:shadow-xl transition-all h-[140px]">
                  <div className="max-w-[60%]">
                     <p className="text-[14px] font-black text-gray-950 uppercase tracking-tight mb-1 focus:outline-none">User Share the code To Reffer User</p>
                     <p className="text-[11px] font-bold text-gray-400 leading-tight">Offer a reward to Users for each referral when they share their code with Users.</p>
                  </div>
                  <div className="text-right space-y-2">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Earnings each Referral</p>
                     <input 
                        type="number" 
                        value={settings.userToUser}
                        onChange={(e) => setSettings({...settings, userToUser: e.target.value})}
                        className="w-32 px-5 py-3 bg-white border border-gray-100 rounded-xl text-[14px] font-black text-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-center shadow-inner"
                     />
                     <p className="text-[8px] font-bold text-gray-400 uppercase leading-none">Users earn for each referral</p>
                  </div>
               </div>

               <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-50 flex items-center justify-between group/item hover:bg-white hover:shadow-xl transition-all h-[140px]">
                  <div className="max-w-[60%]">
                     <p className="text-[14px] font-black text-gray-950 uppercase tracking-tight mb-1 focus:outline-none">User Share the code To Reffer Driver</p>
                     <p className="text-[11px] font-bold text-gray-400 leading-tight">Offer a reward to Users for each referral when they share their code with Drivers.</p>
                  </div>
                  <div className="text-right space-y-2">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Earnings each Referral</p>
                     <input 
                        type="number" 
                        value={settings.userToDriver}
                        onChange={(e) => setSettings({...settings, userToDriver: e.target.value})}
                        className="w-32 px-5 py-3 bg-white border border-gray-100 rounded-xl text-[14px] font-black text-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-center shadow-inner"
                     />
                     <p className="text-[8px] font-bold text-gray-400 uppercase leading-none">Users earn for each referral</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* DRIVER REFERRAL CARD */}
      <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden transition-all group">
         <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
            <div className="flex items-center gap-5">
               <div className="p-4 bg-white rounded-2xl text-emerald-600 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                  <Car size={28} />
               </div>
               <div>
                  <h2 className="text-xl font-black text-gray-950 tracking-tight uppercase leading-none mb-1.5 focus:outline-none">Driver Referral Earnings Setup</h2>
                  <p className="text-[12px] font-bold text-gray-400 italic">Invite drivers to use our app with your unique referral code and earn exciting rewards!</p>
               </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
               <input type="checkbox" className="sr-only peer" checked={driverReferralEnabled} onChange={() => setDriverReferralEnabled(!driverReferralEnabled)} />
               <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600 shadow-inner"></div>
            </label>
         </div>

         <div className={`p-10 space-y-8 transition-all duration-500 ${driverReferralEnabled ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-50 flex items-center justify-between group/item hover:bg-white hover:shadow-xl transition-all h-[140px]">
                  <div className="max-w-[60%]">
                     <p className="text-[14px] font-black text-gray-950 uppercase tracking-tight mb-1 focus:outline-none">Driver Share the code To Reffer User</p>
                     <p className="text-[11px] font-bold text-gray-400 leading-tight">Offer a reward to Drivers for each referral when they share their code with Users.</p>
                  </div>
                  <div className="text-right space-y-2">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Earnings each Referral</p>
                     <input 
                        type="number" 
                        value={settings.driverToUser}
                        onChange={(e) => setSettings({...settings, driverToUser: e.target.value})}
                        className="w-32 px-5 py-3 bg-white border border-gray-100 rounded-xl text-[14px] font-black text-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none text-center shadow-inner"
                     />
                     <p className="text-[8px] font-bold text-gray-400 uppercase leading-none">Drivers earn for each referral</p>
                  </div>
               </div>

               <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-50 flex items-center justify-between group/item hover:bg-white hover:shadow-xl transition-all h-[140px]">
                  <div className="max-w-[60%]">
                     <p className="text-[14px] font-black text-gray-950 uppercase tracking-tight mb-1 focus:outline-none">Driver Share the code To Reffer Driver</p>
                     <p className="text-[11px] font-bold text-gray-400 leading-tight">Offer a reward to Drivers for each referral when they share their code with Drivers.</p>
                  </div>
                  <div className="text-right space-y-2">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Earnings each Referral</p>
                     <input 
                        type="number" 
                        value={settings.driverToDriver}
                        onChange={(e) => setSettings({...settings, driverToDriver: e.target.value})}
                        className="w-32 px-5 py-3 bg-white border border-gray-100 rounded-xl text-[14px] font-black text-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none text-center shadow-inner"
                     />
                     <p className="text-[8px] font-bold text-gray-400 uppercase leading-none">Drivers earn for each referral</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* UPDATE BUTTON */}
      <div className="flex items-center justify-between pt-10 border-t border-gray-50">
         <div className="flex items-center gap-3 text-gray-400 italic">
            <Info size={18} />
            <p className="text-[11px] font-black uppercase tracking-widest">Changes will reflect immediately for all active campaigns</p>
         </div>
         <button className="px-12 py-5 bg-gray-950 text-white rounded-[24px] text-[13px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl flex items-center gap-4 group">
            <Save size={20} className="group-hover:scale-110 transition-transform" /> Update Referral Settings
         </button>
      </div>

      {/* FOOTER AUDIT */}
      <div className="p-8 bg-gray-900 rounded-[40px] text-white flex items-center justify-between relative overflow-hidden mt-12 mb-12 shadow-2xl">
         <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 translate-x-4"><BadgeCheck size={120} strokeWidth={1} /></div>
         <div className="flex items-center gap-5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 border border-white/5"><TrendingUp size={24} /></div>
            <div>
               <h4 className="text-[14px] font-black uppercase tracking-widest mb-1 italic focus:outline-none">Campaign Logic Verified</h4>
               <p className="text-[11px] font-bold text-gray-500 max-w-xl italic opacity-80 leading-relaxed">Dynamic referral settlement is synchronized across User and Driver mobile environments. Fraud detection telemetry is enabled by default for all cash-out requests originated via referral earnings.</p>
            </div>
         </div>
         <div className="relative z-10">
            <div className="px-5 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest animate-pulse">Sync Active</div>
         </div>
      </div>
    </div>
  );
};

export default ReferralSettings;
