import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, 
    Car, 
    FileText, 
    Bell, 
    History, 
    CreditCard, 
    UserPlus, 
    ShieldCheck, 
    HelpCircle, 
    LogOut, 
    Settings, 
    ArrowRight, 
    Star, 
    Route, 
    TrendingUp, 
    ChevronRight,
    Camera,
    Edit3,
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DriverBottomNav from '../../shared/components/DriverBottomNav';

const DriverProfile = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        name: 'Hritik Raghuwanshi',
        rating: '4.9',
        totalTrips: '1,240',
        totalKm: '12.4k',
        vehicleNo: 'MP 09 AB 1234',
        model: 'Maruti Suzuki WagonR'
    });

    const menuSections = [
        {
            title: 'Account Settings',
            items: [
                { id: 'edit', label: 'Edit Profile', sub: 'Details & Avatar', icon: <User size={18} />, color: 'text-blue-500', bg: 'bg-blue-50', path: '/taxi/driver/edit-profile' },
                { id: 'notifications', label: 'Notifications', sub: 'Hub settings', icon: <Bell size={18} />, color: 'text-amber-500', bg: 'bg-amber-50', path: '/taxi/driver/notifications' },
                { id: 'security', label: 'Security & SOS', sub: 'Safety protocols', icon: <ShieldCheck size={18} />, color: 'text-emerald-500', bg: 'bg-emerald-50', path: '/taxi/driver/security' }
            ]
        },
        {
            title: 'Business & Fleet',
            items: [
                { id: 'vehicle', label: 'Vehicle Fleet', sub: 'MP 09 AB 1234', icon: <Car size={18} />, color: 'text-indigo-500', bg: 'bg-indigo-50', path: '/taxi/driver/vehicle-fleet' },
                { id: 'earnings', label: 'Payout Methods', sub: 'Bank & UPI', icon: <CreditCard size={18} />, color: 'text-emerald-500', bg: 'bg-emerald-50', path: '/taxi/driver/payout-methods' },
                { id: 'history', label: 'Job History', sub: 'Past requests', icon: <History size={18} />, color: 'text-slate-500', bg: 'bg-slate-50', path: '/taxi/driver/history' }
            ]
        },
        {
            title: 'Support',
            items: [
                { id: 'docs', label: 'My Documents', sub: 'Verified KYC', icon: <FileText size={18} />, color: 'text-rose-500', bg: 'bg-rose-50', badge: 'Verified', path: '/taxi/driver/documents' },
                { id: 'refer', label: 'Refer Fellow', sub: 'Invite & Earn', icon: <UserPlus size={18} />, color: 'text-amber-500', bg: 'bg-amber-50', path: '/taxi/driver/referral' },
                { id: 'help', label: 'Help Center', sub: 'Support & FAQ', icon: <HelpCircle size={18} />, color: 'text-blue-500', bg: 'bg-blue-50', path: '/taxi/driver/support' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fb] font-sans select-none overflow-x-hidden p-5 pb-24 flex flex-col pt-6">
            {/* Compact Professional Header */}
            <header className="mb-8 space-y-5">
                 <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                         <div className="relative group">
                             <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] border-2 border-white shadow-lg flex items-center justify-center text-3xl overflow-hidden group-hover:scale-105 transition-transform">
                                 👨🏻‍💼
                                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                     <Camera size={20} className="text-white" />
                                 </div>
                             </div>
                             <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-taxi-primary rounded-lg border-2 border-white flex items-center justify-center shadow-md">
                                 <CheckCircle2 size={12} strokeWidth={3} className="text-black" />
                             </div>
                         </div>
                         <div className="space-y-0.5">
                             <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none">{profileData.name}</h2>
                             <div className="flex items-center gap-2">
                                 <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-slate-100 shadow-sm">
                                     <Star size={10} fill="#fdd835" className="text-[#e5c100]" />
                                     <p className="text-[10px] font-black text-slate-900">{profileData.rating}</p>
                                 </div>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Elite Platinum</p>
                             </div>
                         </div>
                     </div>
                     <button onClick={() => navigate('/taxi/driver/settings')} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 border border-slate-50 transition-transform active:scale-95"><Settings size={20} /></button>
                 </div>

                 {/* Metrics grid: Compact */}
                 <div className="grid grid-cols-3 gap-3">
                     <div className="bg-white p-3 py-4 rounded-2xl border border-white shadow-sm flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105 group">
                         <div className="w-8 h-8 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                             <CheckCircle2 size={16} />
                         </div>
                         <h4 className="text-[14px] font-black text-slate-900 leading-none mt-1.5">{profileData.totalTrips}</h4>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-70">Trips</p>
                     </div>
                     <div className="bg-white p-3 py-4 rounded-2xl border border-white shadow-sm flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105 group">
                         <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                             <Route size={16} />
                         </div>
                         <h4 className="text-[14px] font-black text-slate-900 leading-none mt-1.5">{profileData.totalKm}</h4>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-70">KM Done</p>
                     </div>
                     <div className="bg-white p-3 py-4 rounded-2xl border border-white shadow-sm flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105 group">
                         <div className="w-8 h-8 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                             <TrendingUp size={16} />
                         </div>
                         <h4 className="text-[14px] font-black text-slate-900 leading-none mt-1.5">Top 5%</h4>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-70">Global</p>
                     </div>
                 </div>
            </header>

            <main className="flex-1 space-y-6 overflow-y-auto scrollbar-hide pb-8">
                {menuSections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                        <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-60 ml-2">{section.title}</h3>
                        <div className="space-y-2.5">
                            {section.items.map((item) => (
                                <motion.div 
                                    key={item.id}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate(item.path)}
                                    className="bg-white p-4 rounded-2xl border border-white shadow-sm flex items-center justify-between group active:bg-slate-50 transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm border border-slate-50 ${item.bg} ${item.color}`}>
                                            {item.icon}
                                        </div>
                                        <div className="space-y-0.5">
                                            <h4 className="text-[14px] font-black text-slate-900 leading-tight tracking-tight">{item.label}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 opacity-60 leading-tight">{item.sub}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {item.badge && <span className="bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest border border-emerald-500/10">{item.badge}</span>}
                                        <ChevronRight size={16} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Compact Sign Out */}
                <motion.button 
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white border border-rose-100/50 py-4 rounded-2xl flex items-center justify-center gap-2 text-[12px] font-black text-rose-500 uppercase tracking-widest transition-all mb-10 shadow-sm"
                >
                    Sign Out Account <LogOut size={16} strokeWidth={3} />
                </motion.button>
            </main>

            <DriverBottomNav />
        </div>
    );
};

export default DriverProfile;
