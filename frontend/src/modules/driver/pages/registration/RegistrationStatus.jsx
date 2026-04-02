import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    Clock, 
    ShieldCheck, 
    CheckCircle2, 
    ShieldAlert, 
    ChevronRight,
    Zap,
    Stars,
    ArrowRight
} from 'lucide-react';
import RedigoLogo from '@/assets/redigologo.png';

const RegistrationStatus = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('pending'); // 'pending' -> 'approved'
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setStatus('approved');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleProceed = () => {
        navigate('/taxi/driver/dashboard');
    };

    return (
        <div className="min-h-screen bg-taxi-bg font-sans select-none overflow-x-hidden flex flex-col pt-8 pb-6">
            {/* Branded Header */}
            <div className="px-8 mb-6 flex items-center justify-center">
                 <img src={RedigoLogo} alt="Redigo" className="h-8 object-contain drop-shadow-sm" />
            </div>

            <main className="flex-1 px-8 flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
                {status === 'pending' ? (
                    <motion.div 
                        key="pending"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="space-y-8 flex flex-col items-center max-w-sm"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-xl shadow-amber-500/10">
                                <Clock size={36} strokeWidth={2.5} className="animate-spin-slow" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-amber-400 border-2 border-amber-50">
                                <span className="text-[12px] font-black">{countdown}s</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-2xl font-black text-taxi-text tracking-tighter uppercase leading-none">
                                Verifying your <br/> <span className="text-amber-500">Documents</span>
                            </h2>
                            <p className="text-[14px] font-bold text-slate-400">
                                Our team is reviewing your application. This usually takes 2-4 hours, but we're fast-tracking yours!
                            </p>
                        </div>

                        <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-50 space-y-4">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                                    <CheckCircle2 size={20} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-[13px] font-black text-taxi-text leading-none uppercase tracking-tight">System Check</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Passed 128-bit Encryption</p>
                                </div>
                            </div>
                            <div className="h-px bg-slate-50 w-full" />
                            <div className="flex items-center gap-4 text-left opacity-50">
                                <div className="w-10 h-10 bg-slate-50 text-slate-300 rounded-xl flex items-center justify-center">
                                    <ShieldCheck size={20} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-[13px] font-black text-taxi-text leading-none uppercase tracking-tight">Manual Review</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">In Queue (Position #1)</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="approved"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-10 flex flex-col items-center max-w-sm"
                    >
                        <div className="relative">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.2, 1] }}
                                transition={{ type: "spring", duration: 0.8 }}
                                className="w-28 h-28 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30"
                            >
                                <CheckCircle2 size={48} strokeWidth={2.5} />
                            </motion.div>
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 border-2 border-dashed border-emerald-500/20 rounded-full"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest flex items-center gap-2 border border-emerald-100">
                                    <Stars size={14} fill="currentColor" /> Welcome Aboard
                                </span>
                            </div>
                            <h2 className="text-3xl font-black text-taxi-text tracking-tighter uppercase leading-none">
                                You're <span className="text-emerald-500">Approved!</span>
                            </h2>
                            <p className="text-[15px] font-bold text-slate-400">
                                Your account is now active. You can start accepting rides and tracking your earnings.
                            </p>
                        </div>

                        <motion.button 
                            whileTap={{ scale: 0.96 }}
                            onClick={handleProceed}
                            className="w-full h-14 bg-taxi-primary text-taxi-text py-4 rounded-2xl flex items-center justify-center gap-4 text-[18px] font-black shadow-xl shadow-taxi-primary/20 border border-taxi-primary/80 active:scale-95 transition-all tracking-tight uppercase"
                        >
                            Go to Dashboard <ArrowRight size={22} strokeWidth={3} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
            </main>

        </div>
    );
};

export default RegistrationStatus;
