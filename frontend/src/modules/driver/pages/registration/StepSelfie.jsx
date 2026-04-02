import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, ShieldCheck, Check, Save, RotateCcw, ChevronRight, Info } from 'lucide-react';
import RegistrationProgress from '../../../shared/components/RegistrationProgress';

const StepSelfie = () => {
    const navigate = useNavigate();
    const [captured, setCaptured] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);

    const handleAction = () => {
        navigate('/taxi/driver/step-bank');
    };

    const takePhoto = () => {
        setIsCapturing(true);
        setTimeout(() => {
            setCaptured(true);
            setIsCapturing(false);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-taxi-bg font-sans select-none overflow-x-hidden p-6 pb-28 flex flex-col pt-4">
            <div className="sticky top-0 z-50 bg-taxi-bg/95 backdrop-blur-md -mx-6 px-6 pt-4 border-b border-slate-100/50 mb-2">
                <header className="flex items-center justify-between mb-2">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-taxi-text active:scale-90 transition-transform"
                    >
                        <ArrowLeft size={18} strokeWidth={2.5} />
                    </button>
                    <div className="text-center">
                        <h1 className="text-lg font-black text-taxi-text tracking-tight uppercase">Registration</h1>
                    </div>
                    <div className="w-10" />
                </header>

                <RegistrationProgress currentStep={4} />
            </div>

            <main className="flex-1 space-y-8 flex flex-col pt-4">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                >
                    <h2 className="text-2xl font-black text-taxi-text leading-tight tracking-tight">
                        Selfie Time
                    </h2>
                    <p className="text-[14px] font-bold text-slate-400">
                        Take a clear photo of yourself to verify your profile identity.
                    </p>
                </motion.div>

                {/* Camera Viewport / Preview */}
                <div className="relative aspect-[3/4] bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white mx-2">
                    {!captured ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                            {/* Visual Frame */}
                            <div className="w-[85%] aspect-[1/1] rounded-full border-4 border-dashed border-white/20 relative flex items-center justify-center">
                                <div className="absolute inset-0 border-r-4 border-white/40 rounded-full animate-spin-slow" />
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Camera size={32} className="text-white/20" />
                                </div>
                            </div>
                            <div className="text-center px-8 z-10">
                                <h4 className="text-white text-lg font-black tracking-tight">Frame your face</h4>
                                <p className="text-white/50 text-[10px] font-bold mt-1 uppercase tracking-widest">Ensure good lighting</p>
                            </div>

                            {isCapturing && (
                                <div className="absolute inset-0 bg-white z-50 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-4">
                                         <div className="w-12 h-12 border-4 border-taxi-primary/20 border-t-taxi-primary rounded-full animate-spin" />
                                         <p className="text-taxi-text font-black text-[12px] uppercase tracking-widest">Capturing...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                            {/* Mock Selfie Result */}
                            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center" />
                             <div className="absolute top-6 right-6 w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 transform rotate-12 border-2 border-white">
                                 <Check size={28} strokeWidth={4} />
                             </div>
                        </div>
                    )}
                    
                    {/* Camera Control Button Overlay */}
                    <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={() => captured ? setCaptured(false) : takePhoto()}
                            className="w-18 h-18 bg-white/20 backdrop-blur-md rounded-full border-4 border-white flex items-center justify-center p-1 shadow-lg"
                        >
                            <div className={`w-full h-full rounded-full shadow-lg transition-all flex items-center justify-center ${captured ? 'bg-rose-500' : 'bg-white'}`}>
                                {captured ? <RotateCcw size={24} className="text-white" /> : <div className="w-6 h-6 border-2 border-taxi-text/20 rounded-full" />}
                            </div>
                        </motion.button>
                    </div>
                </div>

                {/* Instruction List / Notice */}
                <div className="space-y-4 px-2 pb-10">
                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-4 shadow-sm">
                        <ShieldCheck size={20} className="text-blue-500 flex-shrink-0 mt-1" />
                        <div className="space-y-1">
                            <h4 className="text-[12px] font-black text-blue-900 leading-none">Photo Guidelines</h4>
                            <p className="text-[10px] font-bold text-blue-600/70 leading-relaxed uppercase tracking-tighter">
                                Remove glasses, hats or headwear. Center your face in frame. Avoid shadows.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-6 pt-3 pb-8 bg-white/80 backdrop-blur-xl z-50 border-t border-slate-50">
                <motion.button 
                    whileTap={{ scale: 0.96 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    disabled={!captured}
                    onClick={handleAction}
                    className={`w-full h-14 py-4 rounded-2xl flex items-center justify-center gap-3 text-[17px] font-black shadow-xl border transition-all tracking-tight uppercase ${
                        captured 
                        ? 'bg-taxi-primary text-taxi-text border-taxi-primary/80 shadow-taxi-primary/10 active:scale-95' 
                        : 'bg-slate-100 text-slate-300 border-slate-200 grayscale cursor-not-allowed opacity-50'
                    }`}
                >
                    Continue to Payouts <ChevronRight size={22} strokeWidth={3} />
                </motion.button>
            </div>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default StepSelfie;
