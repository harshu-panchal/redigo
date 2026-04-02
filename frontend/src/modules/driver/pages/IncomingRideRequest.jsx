import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Clock, 
    Navigation, 
    MapPin, 
    CreditCard, 
    Bike, 
    Banknote, 
    CheckCircle2, 
    X, 
    ChevronRight,
    CircleDashed,
    ScanLine,
    Package,
    ArrowRightLeft,
    TrendingUp
} from 'lucide-react';

const IncomingRideRequest = ({ visible, onAccept, onDecline, requestData }) => {
    const [timer, setTimer] = useState(15);
    const strokeDasharray = 2 * Math.PI * 40; // Circle circumference

    // Provide safe defaults if no data present
    const data = requestData || {
        type: 'ride',
        title: 'Bike Taxi',
        fare: '₹120',
        payment: 'Online Payment',
        pickup: 'Swamclose Apartments, JP nagar',
        drop: 'Tea Villa Cafe, HSR Layout',
        distance: '2 km away'
    };

    const isParcel = data.type === 'parcel';

    useEffect(() => {
        let interval;
        if (visible && timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        } else if (timer === 0) {
            onDecline();
        }
        if (!visible) setTimer(15); // Reset timer when hidden
        return () => clearInterval(interval);
    }, [visible, timer, onDecline]);

    if (!visible) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-[4px] z-[100] p-6 flex items-end justify-center"
            >
                {/* Skip Order Button - Reference Match */}
                <motion.button 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    onClick={onDecline}
                    className="absolute top-24 right-8 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-2xl text-white font-black text-[13px] border border-white/10 active:scale-95 transition-all shadow-2xl uppercase tracking-widest"
                >
                    Dismiss
                </motion.button>

                {/* Main Request Card */}
                <motion.div 
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="w-full max-w-md bg-white rounded-[3rem] overflow-hidden shadow-[0_-10px_80px_rgba(0,0,0,0.5)] border-t border-white/20 relative"
                >
                    {/* Dark Header with Countdown */}
                    <div className={`px-8 py-6 relative flex flex-col items-center transition-colors duration-500 ${isParcel ? 'bg-[#0f172a]' : 'bg-slate-900'}`}>
                        {/* Countdown Visualizer */}
                        <div className="relative w-16 h-16 mb-4">
                            <svg className="w-full h-full -rotate-90">
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    className="text-white/5"
                                />
                                <motion.circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeDasharray={2 * Math.PI * 28}
                                    animate={{ strokeDashoffset: (2 * Math.PI * 28) * (1 - timer / 15) }}
                                    className={`${isParcel ? 'text-orange-500' : 'text-emerald-500'} transition-all duration-1000`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-black tracking-tighter">{timer}</span>
                        </div>

                        {/* Request Identity */}
                        <div className="flex flex-col items-center gap-3 w-full">
                            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-taxi-text shadow-xl relative animate-pulse-gentle transition-colors ${isParcel ? 'bg-orange-500' : 'bg-taxi-primary'}`}>
                                {isParcel ? <Package size={28} strokeWidth={2.5} /> : <Bike size={28} strokeWidth={2.5} />}
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-lg flex items-center justify-center text-slate-900 shadow-lg">
                                    <TrendingUp size={10} strokeWidth={3} />
                                </div>
                            </div>
                            
                            <div className="text-center space-y-1">
                                <h2 className="text-2xl font-black text-white tracking-tight uppercase leading-none">{data.title}</h2>
                                <p className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-60 ${isParcel ? 'text-orange-400' : 'text-emerald-400'}`}>
                                    New {isParcel ? 'Delivery' : 'Ride'} Request
                                </p>
                            </div>

                            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 mt-2">
                                <div className="flex flex-col items-start leading-none gap-0.5">
                                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">{data.payment}</span>
                                    <p className="text-base font-black text-white">{data.fare}</p>
                                </div>
                                <div className="w-px h-6 bg-white/10 mx-1" />
                                <div className="flex flex-col items-end leading-none gap-0.5">
                                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Earnings</span>
                                    <p className={`text-base font-black ${isParcel ? 'text-orange-500' : 'text-emerald-500'}`}>₹96</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trip / Parcel Details */}
                    <div className="p-6 space-y-6 bg-white relative">
                        <div className="space-y-6">
                            {/* Pickup */}
                            <div className="flex items-start gap-4">
                                <div className="w-7 flex flex-col items-center gap-1.5 pt-1.5 flex-shrink-0">
                                    <div className={`w-3.5 h-3.5 rounded-full border-[3px] bg-white transition-colors ${isParcel ? 'border-orange-500' : 'border-emerald-500'}`} />
                                    <div className="w-0.5 h-12 bg-slate-50 border-dashed border-l-2 border-slate-200" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className={`text-[11px] font-black uppercase tracking-widest leading-none ${isParcel ? 'text-orange-500' : 'text-emerald-500'}`}>Pickup Point</h4>
                                        <p className="text-[11px] font-bold text-slate-400 tracking-tighter">• {data.distance}</p>
                                    </div>
                                    <p className="text-[17px] font-black text-taxi-text leading-tight tracking-tight">
                                        {data.pickup}
                                    </p>
                                </div>
                            </div>

                            {/* Drop */}
                            <div className="flex items-start gap-4 pt-1">
                                <div className="w-7 flex items-center justify-center pt-2 flex-shrink-0">
                                    <div className="w-3.5 h-3.5 rounded-full border-[3px] border-rose-500 bg-white" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-[11px] font-black text-rose-500 uppercase tracking-widest leading-none">Drop Point</h4>
                                        <p className="text-[11px] font-bold text-slate-400 tracking-tighter">• 8 km ride</p>
                                    </div>
                                    <p className="text-[17px] font-black text-taxi-text leading-tight tracking-tight opacity-70">
                                        {data.drop}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* High-Impact Accept Button */}
                        <motion.button 
                            whileTap={{ scale: 0.96 }}
                            onClick={() => onAccept(data)}
                            className={`w-full h-16 rounded-[1.8rem] flex items-center justify-center gap-4 text-[18px] font-black text-taxi-text shadow-2xl transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
                                isParcel 
                                ? 'bg-[#fdd835] border-[#cbb31b] shadow-orange-500/10' 
                                : 'bg-taxi-primary border-[#d4ac14] shadow-taxi-primary/20'
                            }`}
                        >
                            Accept {isParcel ? 'Delivery' : 'Ride'} <ArrowRightLeft size={24} strokeWidth={3} className="opacity-50" />
                        </motion.button>
                    </div>

                    {/* Quick Badge */}
                    {isParcel && (
                        <div className="absolute top-4 right-8 z-10">
                             <div className="bg-orange-500 text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-xl border-2 border-[#0f172a] transform rotate-3">
                                 <ScanLine size={12} /> Priority
                             </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>

            <style>{`
                @keyframes pulse-gentle {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.9; }
                }
                .animate-pulse-gentle {
                    animation: pulse-gentle 3s ease-in-out infinite;
                }
            `}</style>
        </AnimatePresence>
    );
};

export default IncomingRideRequest;
