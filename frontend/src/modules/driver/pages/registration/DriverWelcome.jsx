import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Wallet, Clock, Star } from 'lucide-react';
import DriverHero from '@/assets/driver_welcome_hero.png';
import RedigoLogo from '@/assets/redigologo.png';

const DriverWelcome = () => {
    const navigate = useNavigate();

    const perks = [
        { icon: <Wallet size={20} />, title: 'Weekly Payouts', sub: 'Get your earnings every Monday' },
        { icon: <Clock size={20} />, title: 'Flexible Hours', sub: 'Drive whenever you want' },
        { icon: <ShieldCheck size={20} />, title: 'Safety First', sub: '24/7 on-road support' },
        { icon: <Star size={20} />, title: 'Incentives', sub: 'Bonus for top-rated drivers' }
    ];

    return (
        <div className="min-h-screen bg-taxi-bg font-sans select-none overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative h-[35vh] bg-taxi-secondary overflow-hidden rounded-b-[2.5rem] shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10" />
                <img 
                    src={DriverHero} 
                    alt="Drive with Redigo" 
                    className="w-full h-full object-cover"
                />
                
                {/* Branding Top Overlay */}
                <div className="absolute top-10 left-8 z-20">
                     <img src={RedigoLogo} alt="Redigo" className="h-10 drop-shadow-xl" />
                </div>

                {/* Overlay Greeting */}
                <div className="absolute bottom-10 left-8 right-8 text-white z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl font-black leading-tight tracking-tight">
                            Drive & Earn<br />with Redigo
                        </h1>
                        <p className="text-[14px] font-bold text-white/80 mt-2">
                            Join over 10,000+ happy drivers today.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <main className="px-6 pt-6 pb-28 space-y-8">
                <div className="space-y-6">
                    <h3 className="text-[14px] font-black text-slate-400 tracking-widest uppercase opacity-60 px-1">
                        Why partner with us?
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-5">
                        {perks.map((perk, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="flex items-center gap-5 bg-white p-4 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-slate-50 transition-transform active:scale-98"
                            >
                                <div className="w-11 h-11 rounded-xl bg-taxi-primary/10 text-taxi-secondary flex items-center justify-center shadow-sm">
                                    {perk.icon}
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-[15px] font-black text-taxi-text tracking-tight">{perk.title}</h4>
                                    <p className="text-[11px] font-bold text-slate-400 leading-none">{perk.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Testimonial Placeholder */}
                <div className="bg-taxi-primary/5 rounded-2xl p-4 border border-taxi-primary/10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden text-2xl flex items-center justify-center text-slate-900 shadow-xl border border-white">
                            👨🏽‍✈️
                        </div>
                        <div>
                            <h5 className="text-[14px] font-black text-taxi-text">Rahul Shinde</h5>
                            <div className="flex gap-0.5 text-taxi-secondary">
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                            </div>
                        </div>
                    </div>
                    <p className="text-[13px] font-bold text-slate-500 italic leading-relaxed">
                        "Joining Redigo was the best decision for my family. The payouts are always on time and the support team is incredible."
                    </p>
                </div>
            </main>

            {/* Sticky Action Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-6 pt-3 pb-8 bg-white/80 backdrop-blur-xl border-t border-slate-50 z-50">
                <motion.button 
                    whileTap={{ scale: 0.96 }}
                    onClick={() => navigate('/taxi/driver/auth')}
                    className="w-full bg-taxi-primary h-14 rounded-2xl flex items-center justify-center gap-3 text-[17px] font-black text-taxi-text shadow-xl border border-taxi-primary/80 active:scale-95 transition-all tracking-tight uppercase"
                >
                    Become a Partner <ChevronRight size={18} strokeWidth={3} />
                </motion.button>
            </div>
        </div>
    );
};

export default DriverWelcome;
