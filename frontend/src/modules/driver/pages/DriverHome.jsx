import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Bell, 
    Navigation, 
    Wallet, 
    Clock, 
    Bike, 
    Power, 
    Target, 
    Layers, 
    WifiOff,
    Wifi,
    ChevronDown,
    Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, TrendingUp, Star, ChevronRight } from 'lucide-react';
import MapGrid from '@/assets/premium_grid_map.png';
import RedigoLogo from '@/assets/redigologo.png';
import DriverBottomNav from '../../shared/components/DriverBottomNav';
import IncomingRideRequest from './IncomingRideRequest';

const DriverHome = () => {
    const navigate = useNavigate();
    const [isOnline, setIsOnline] = useState(false);
    const [showRequest, setShowRequest] = useState(false);
    const [currentRequest, setCurrentRequest] = useState(null);
    const [completedRides, setCompletedRides] = useState(0);
    const [dutySeconds, setDutySeconds] = useState(0);

    // High-End Mock Request Generator
    const generateMockRequest = () => {
        const types = ['ride', 'parcel'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        
        if (randomType === 'parcel') {
            return {
                type: 'parcel',
                title: 'Parcel Delivery',
                fare: '₹145',
                payment: 'Online Payment',
                pickup: 'Flat 402, Swamclose Apts, JP Nagar',
                drop: 'Tea Villa Cafe, 12th Main, HSR Layout',
                distance: '1.2 km away'
            };
        } else {
            return {
                type: 'ride',
                title: 'Bike Taxi',
                fare: '₹120',
                payment: 'Online Payment',
                pickup: 'Swamclose Apartments, JP nagar',
                drop: 'Tea Villa Cafe, HSR Layout',
                distance: '2 km away'
            };
        }
    };
    
    // Simulate other drivers for "Alive" feel
    const [nearbyTaxis, setNearbyTaxis] = useState([
        { id: 1, x: '25%', y: '15%', rot: 45 },
        { id: 2, x: '65%', y: '25%', rot: 120 },
        { id: 3, x: '80%', y: '40%', rot: -30 },
        { id: 4, x: '10%', y: '50%', rot: 190 },
        { id: 5, x: '70%', y: '10%', rot: 60 }
    ]);

    // Duty timer — counts up when online
    useEffect(() => {
        let interval;
        if (isOnline) {
            interval = setInterval(() => setDutySeconds(s => s + 1), 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isOnline]);

    const dutyHours = Math.floor(dutySeconds / 3600);
    const dutyMins = Math.floor((dutySeconds % 3600) / 60);

    const handleAccept = () => {
        setShowRequest(false);
        setCompletedRides(prev => prev + 1);
        navigate('/taxi/driver/active-trip', { 
            state: { type: currentRequest?.type || 'ride' } 
        });
    };

    return (
        <div className="min-h-screen bg-[#f8f9fb] font-sans select-none overflow-hidden relative pb-24 text-slate-900">
            {/* Incoming Ride Overlay */}
            <IncomingRideRequest 
                visible={showRequest} 
                requestData={currentRequest}
                onAccept={handleAccept} 
                onDecline={() => setShowRequest(false)} 
            />

            {/* Header: Compact Version */}
            <header className="fixed top-0 left-0 right-0 px-6 pt-6 pb-2.5 flex items-center justify-between z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-md">
                <div className="flex items-center gap-3 pt-2">
                    <img src={RedigoLogo} alt="Redigo" className="h-10 drop-shadow-sm" />
                    <div className="h-5 w-px bg-slate-200" />
                    <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full shadow-sm ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isOnline ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {isOnline ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/taxi/driver/notifications')}
                        className="w-9 h-9 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-900 active:scale-90 transition-transform relative"
                    >
                        <Bell size={18} />
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white" />
                    </button>
                    <div className="w-9 h-9 bg-slate-900 rounded-full border border-slate-100 overflow-hidden shadow-md flex items-center justify-center text-lg">
                        👨🏻‍💼
                    </div>
                </div>
            </header>

            {/* Premium Simulated Map Zone */}
            <div className="absolute inset-0 z-0 h-full bg-[#e8e9eb] overflow-hidden">
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: isOnline ? 1 : 1.1 }}
                    transition={{ duration: 1.5 }}
                    src={MapGrid} 
                    alt="City Grid" 
                    className={`w-full h-full object-cover transition-all duration-700 ${isOnline ? 'contrast-[1.05] saturate-[1.1] grayscale-0' : 'contrast-[0.9] saturate-[0.8] grayscale-[0.3]'}`}
                />
                
                {/* Simulated Street Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/5 pointer-events-none" />

                {/* Nearby Passive Taxis for Life */}
                {nearbyTaxis.map((taxi) => (
                    <motion.div 
                        key={taxi.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        style={{ left: taxi.x, top: taxi.y, rotate: `${taxi.rot}deg` }}
                        className="absolute text-slate-400/40 pointer-events-none drop-shadow-sm"
                    >
                         <Navigation size={12} fill="currentColor" />
                    </motion.div>
                ))}

                {/* Right Side Map Controls */}
                <div className="absolute right-5 top-24 flex flex-col gap-2.5 z-20">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl shadow-xl flex items-center justify-center text-slate-900 border border-white active:scale-95 transition-all">
                        <Target size={18} />
                    </button>
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl shadow-xl flex items-center justify-center text-slate-900 border border-white active:scale-95 transition-all">
                        <Layers size={18} />
                    </button>
                </div>

                {/* Active Driver/Self Marker */}
                <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000">
                    <div className="relative">
                        <AnimatePresence>
                             {isOnline && (
                                <motion.div 
                                    initial={{ scale: 0.2, opacity: 0 }}
                                    animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0] }}
                                    transition={{ repeat: Infinity, duration: 2.5 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-taxi-primary rounded-full blur-2xl"
                                />
                             )}
                        </AnimatePresence>
                        <motion.div 
                            animate={{ scale: isOnline ? 1.1 : 1 }}
                            className={`w-9 h-9 rounded-full border-2 border-white shadow-2xl relative z-10 flex items-center justify-center transition-all duration-500 shadow-taxi-primary/20 ${
                                isOnline ? 'bg-[#fdd835] text-black' : 'bg-slate-300 text-slate-500'
                            }`}
                        >
                            <Navigation size={18} fill="currentColor" strokeWidth={3} className="rotate-45" />
                        </motion.div>
                        
                        {/* Status Bubble */}
                        <AnimatePresence>
                            {isOnline && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xl whitespace-nowrap"
                                >
                                     <Zap size={10} fill="#fdd835" className="text-taxi-primary" />
                                     <span className="text-[9px] font-black uppercase tracking-wider">Scoping Area</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Test Simulation Action — DEV only */}
            {import.meta.env.DEV && (
                <AnimatePresence>
                    {isOnline && !showRequest && (
                        <motion.button 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            onClick={() => { setCurrentRequest(generateMockRequest()); setShowRequest(true); }}
                            className="absolute top-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[8.5px] font-black uppercase tracking-widest shadow-2xl border-2 border-white transition-all active:scale-95 z-20 ring-4 ring-slate-900/5 group"
                        >
                            Test Ride Flow <span className="group-hover:translate-x-1 transition-transform inline-block">🚀</span>
                        </motion.button>
                    )}
                </AnimatePresence>
            )}

            {/* Central Stats Card Compact Overlay */}
            <div className="absolute bottom-[7.5rem] left-0 right-0 px-5 z-30">
                <motion.div 
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white/95 backdrop-blur-md rounded-[2rem] p-5 shadow-[0_15px_60px_rgba(0,0,0,0.1)] border border-white"
                >
                    {/* Upper Row */}
                    <div className="flex justify-between items-start mb-4 px-1">
                        <div className="space-y-1">
                            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60 leading-none mb-1">Total Earning</h4>
                            <div className="flex items-baseline gap-0.5">
                                <span className="text-2xl font-black text-slate-900 tracking-tighter">₹0</span>
                                <span className="text-lg font-black text-slate-400 opacity-40">.00</span>
                            </div>
                        </div>
                        <div className="text-right space-y-1">
                            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60 leading-none mb-1">Target 🎯</h4>
                            <p className="text-lg font-black text-slate-900 tracking-tight">₹850</p>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-2.5 mb-5">
                         <div className="bg-slate-50/50 p-3.5 py-4 rounded-3xl flex flex-col gap-1.5 group hover:bg-white transition-all border border-transparent hover:border-slate-100 shadow-sm active:scale-95">
                             <div className="flex items-center gap-1.5">
                                 <Clock size={12} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                 <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-widest">Active Duty</span>
                             </div>
                             <p className="text-[15px] font-black text-slate-900 leading-none">
                                 {dutyHours}h {dutyMins}m
                             </p>
                         </div>
                         <div className="bg-slate-50/50 p-3.5 py-4 rounded-3xl flex flex-col gap-1.5 group hover:bg-white transition-all border border-transparent hover:border-slate-100 shadow-sm active:scale-95">
                             <div className="flex items-center gap-1.5">
                                 <Bike size={14} className="text-slate-400 group-hover:text-taxi-secondary transition-colors" />
                                 <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-widest">Completed</span>
                             </div>
                             <p className="text-[15px] font-black text-slate-900 leading-none">{completedRides}</p>
                         </div>
                    </div>

                    {/* Massive Duty Toggle Action */}
                    <motion.button 
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                            const newOnline = !isOnline;
                            setIsOnline(newOnline);
                            if (newOnline) {
                                // High-end simulation: generate a random request type after 3s
                                setTimeout(() => {
                                    setCurrentRequest(generateMockRequest());
                                    setShowRequest(true);
                                }, 3000);
                            } else {
                                setShowRequest(false);
                                setCurrentRequest(null);
                            }
                        }}
                        className={`w-full h-14 rounded-[1.6rem] flex items-center justify-center gap-2.5 text-[14px] font-black uppercase tracking-[0.1em] transition-all shadow-md group ${
                            isOnline 
                            ? 'bg-emerald-500 text-white shadow-emerald-500/10' 
                            : 'bg-[#fdd835] text-black shadow-yellow-400/10'
                        }`}
                    >
                         <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 border-white/20 shadow-sm transition-colors ${
                             isOnline ? 'bg-emerald-600 animate-pulse' : 'bg-[#e5c100]'
                         }`}>
                             <Power size={16} strokeWidth={3} />
                         </div>
                         {isOnline ? 'Finish Duty' : 'Start Earning'}
                    </motion.button>
                </motion.div>
            </div>

            <DriverBottomNav />
        </div>
    );
};

export default DriverHome;
