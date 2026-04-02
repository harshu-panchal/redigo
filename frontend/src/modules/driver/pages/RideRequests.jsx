import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, 
    Calendar, 
    ChevronRight, 
    MapPin, 
    Clock, 
    CreditCard, 
    Bike, 
    CheckCircle2, 
    Filter,
    Search,
    IndianRupee
} from 'lucide-react';
import DriverBottomNav from '../../shared/components/DriverBottomNav';

const RideRequests = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');

    const history = [
        { id: 1, type: 'Bike Taxi', date: 'Today, 2:45 PM', price: '₹145', from: 'Koramangala 5th Block', to: 'HSR Layout Sector 7', status: 'completed' },
        { id: 2, type: 'Bike Taxi', date: 'Today, 11:30 AM', price: '₹85', from: 'Indiranagar Metro', to: 'Marathahalli', status: 'completed' },
        { id: 3, type: 'Delivery', date: 'Yesterday, 6:20 PM', price: '₹220', from: 'JP Nagar', to: 'Bannerghatta Road', status: 'completed' },
        { id: 4, type: 'Bike Taxi', date: '28 Mar, 4:10 PM', price: '₹110', from: 'BTM Layout', to: 'Electronic City', status: 'completed' }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fb] font-sans select-none overflow-x-hidden p-6 pb-32">
            <header className="flex items-center justify-between mb-4 pt-2 px-2">
                <button 
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-taxi-text active:scale-95 transition-transform"
                >
                    <ArrowLeft size={20} strokeWidth={2.5} />
                </button>
                <h1 className="text-xl font-black text-taxi-text tracking-tight uppercase">Ride History</h1>
                <button className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 active:scale-95 transition-transform">
                    <Filter size={18} />
                </button>
            </header>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 space-y-1 group active:scale-95 transition-all">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Total Trips</p>
                     <div className="flex items-center gap-2">
                         <div className="w-8 h-8 bg-taxi-primary/10 rounded-xl flex items-center justify-center text-taxi-secondary">
                             <Bike size={16} />
                         </div>
                         <h3 className="text-xl font-black text-taxi-text tracking-tighter leading-none">42</h3>
                     </div>
                 </div>
                 <div className="bg-slate-900 p-4 rounded-2xl shadow-xl space-y-1 active:scale-95 transition-all">
                     <p className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Total Earned</p>
                     <div className="flex items-center gap-2">
                         <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-taxi-primary">
                             <IndianRupee size={14} />
                         </div>
                         <h3 className="text-xl font-black text-white tracking-tighter leading-none">₹8.4k</h3>
                     </div>
                 </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2 mb-2">
                    <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-widest leading-none">Recent Activity</h4>
                    <Search size={16} className="text-slate-200" />
                </div>

                <div className="space-y-4">
                    {history.map((ride, idx) => (
                        <motion.div 
                            key={ride.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => navigate(`/ride/detail/${ride.id}`)}
                            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 space-y-4 group active:scale-98 transition-all hover:border-taxi-primary/20 cursor-pointer"
                        >
                            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-taxi-primary/10 rounded-xl flex items-center justify-center text-taxi-secondary group-hover:scale-110 transition-transform">
                                        <Bike size={18} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-[14px] font-black text-taxi-text tracking-tight leading-none">{ride.type}</h4>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{ride.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                     <p className="text-base font-black text-taxi-text leading-none tracking-tighter">{ride.price}</p>
                                     <div className="flex items-center gap-1 justify-end mt-0.5">
                                         <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Completed</span>
                                         <CheckCircle2 size={10} className="text-emerald-500" />
                                     </div>
                                </div>
                            </div>

                            <div className="space-y-3 px-1">
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                                    <p className="text-[12px] font-bold text-slate-500/80 leading-tight">
                                        {ride.from}
                                    </p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0 shadow-[0_0_10px_rgba(244,63,94,0.3)]" />
                                    <p className="text-[12px] font-bold text-slate-500/80 leading-tight">
                                        {ride.to}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            
            <DriverBottomNav />
        </div>
    );
};

export default RideRequests;
