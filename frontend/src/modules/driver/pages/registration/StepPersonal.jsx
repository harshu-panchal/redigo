import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar, UserPlus, Save, Check, ChevronRight } from 'lucide-react';
import RegistrationProgress from '../../../shared/components/RegistrationProgress';

const StepPersonal = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: 'hritik raghuwanshi',
        email: 'hritik@redigo.in',
        dob: '1998-05-15',
        gender: 'Male',
        referral: ''
    });

    const handleSave = () => {
        // Mock save logic, then proceed to vehicle step
        navigate('/taxi/driver/step-vehicle');
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

                <RegistrationProgress currentStep={1} totalSteps={4} />
            </div>

            <main className="flex-1 space-y-8 flex flex-col pt-4">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                >
                    <h2 className="text-2xl font-black text-taxi-text leading-tight tracking-tight">
                        Personal Info
                    </h2>
                    <p className="text-[14px] font-bold text-slate-400">
                        Please provide your official name as it appears on your driving license.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    {/* Full Name */}
                    <div className="space-y-2">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Full Name</label>
                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                                <User size={20} />
                            </div>
                            <input 
                                type="text" 
                                value={formData.fullName}
                                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-6 text-[15px] font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm focus:shadow-xl focus:shadow-taxi-primary/10"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Email Address</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                                    <Mail size={20} />
                                </div>
                                <input 
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-6 text-[15px] font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm focus:shadow-xl focus:shadow-taxi-primary/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Date of Birth</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                                    <Calendar size={20} />
                                </div>
                                <input 
                                    type="date" 
                                    value={formData.dob}
                                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                                    className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-6 text-[15px] font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm focus:shadow-xl focus:shadow-taxi-primary/10"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                         <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Gender</label>
                         <div className="flex gap-3">
                             {['Male', 'Female', 'Other'].map(g => (
                                 <button 
                                    key={g}
                                    onClick={() => setFormData({...formData, gender: g})}
                                    className={`flex-1 h-14 rounded-2xl text-[13px] font-black transition-all border-2 flex items-center justify-center gap-2 ${
                                        formData.gender === g 
                                        ? 'bg-taxi-primary border-taxi-primary text-taxi-text shadow-lg shadow-taxi-primary/20' 
                                        : 'bg-white border-slate-50 text-slate-300'
                                    }`}
                                 >
                                    {formData.gender === g && <Check size={16} strokeWidth={3} />}
                                    {g}
                                 </button>
                             ))}
                         </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Referral Code (Optional)</label>
                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                                <UserPlus size={20} />
                            </div>
                            <input 
                                type="text" 
                                value={formData.referral}
                                placeholder="REDIGO2024"
                                onChange={(e) => setFormData({...formData, referral: e.target.value})}
                                className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-6 text-[15px] font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm font-mono uppercase placeholder:normal-case placeholder:text-slate-100 placeholder:text-[14px]"
                            />
                        </div>
                    </div>
                </motion.div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-6 pt-3 pb-8 bg-white/80 backdrop-blur-xl z-50 border-t border-slate-50">
                <motion.button 
                    whileTap={{ scale: 0.96 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleSave}
                    className="w-full h-14 bg-taxi-primary text-taxi-text py-4 rounded-2xl flex items-center justify-center gap-3 text-[17px] font-black shadow-xl shadow-taxi-primary/10 border border-taxi-primary/80 active:scale-95 transition-all tracking-tight uppercase"
                >
                    Continue to Vehicle <ChevronRight size={22} strokeWidth={3} />
                </motion.button>
            </div>
        </div>
    );
};

export default StepPersonal;
