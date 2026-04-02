import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Banknote, Building2, User, Hash, Save, Info, ChevronRight, CheckCircle2 } from 'lucide-react';
import RegistrationProgress from '../../../shared/components/RegistrationProgress';

const StepBank = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bankName: '',
        ifsc: '',
        accountNumber: '',
        holderName: ''
    });
    const [isFinishing, setIsFinishing] = useState(false);

    const handleSave = () => {
        setIsFinishing(true);
        setTimeout(() => {
            navigate('/taxi/driver/registration-status');
        }, 2000);
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

                <RegistrationProgress currentStep={4} totalSteps={4} />
            </div>

            <main className="flex-1 space-y-8 flex flex-col pt-4">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                >
                    <h2 className="text-2xl font-black text-taxi-text leading-tight tracking-tight">
                        Payout Account
                    </h2>
                    <p className="text-[14px] font-bold text-slate-400">
                        Add your bank details where you'd like to receive your weekly earnings.
                    </p>
                </motion.div>

                <div className="space-y-6 pb-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        {/* Account Holder */}
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Account Holder Name</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                                    <User size={20} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Name as per Bank Passbook"
                                    value={formData.holderName}
                                    onChange={(e) => setFormData({...formData, holderName: e.target.value})}
                                    className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-6 text-[15px] font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm focus:shadow-xl focus:shadow-taxi-primary/10"
                                />
                            </div>
                        </div>

                        {/* Bank Name */}
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Bank Name</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                                    <Building2 size={20} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="e.g. State Bank of India"
                                    value={formData.bankName}
                                    onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                                    className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-6 text-[15px] font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm focus:shadow-xl focus:shadow-taxi-primary/10"
                                />
                            </div>
                        </div>

                        {/* Account and IFSC Grid */}
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Account Number</label>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                                        <Hash size={20} />
                                    </div>
                                    <input 
                                        type="password" 
                                        placeholder="Enter Account Number"
                                        value={formData.accountNumber}
                                        onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                                        className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-6 text-xl font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm font-mono tracking-widest focus:shadow-xl focus:shadow-taxi-primary/10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">IFSC Code</label>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                                        <CreditCard size={20} />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="SBIN0001234"
                                        value={formData.ifsc}
                                        onChange={(e) => setFormData({...formData, ifsc: e.target.value})}
                                        className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-6 text-[15px] font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm uppercase font-mono tracking-widest focus:shadow-xl focus:shadow-taxi-primary/10"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-4 bg-taxi-primary/5 rounded-2xl border border-taxi-primary/10 flex items-start gap-4 mx-1">
                            <Info size={18} className="text-taxi-secondary flex-shrink-0 mt-0.5" />
                            <p className="text-[11px] font-bold text-slate-500/80 leading-relaxed">
                                Payments are processed every Monday. Please ensure your account number is correct to avoid payment delays.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-6 pt-3 pb-8 bg-white/80 backdrop-blur-xl z-50 border-t border-slate-50">
                <motion.button 
                    whileTap={{ scale: 0.96 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleSave}
                    disabled={isFinishing}
                    className={`w-full h-14 py-4 rounded-2xl flex items-center justify-center gap-3 text-[17px] font-black shadow-xl shadow-taxi-primary/10 border border-taxi-primary/80 active:scale-95 transition-all tracking-tight uppercase ${
                        isFinishing ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-taxi-primary text-taxi-text'
                    }`}
                >
                    {isFinishing ? (
                        <>Complete! <CheckCircle2 size={24} strokeWidth={3} className="animate-bounce" /></>
                    ) : (
                        <>Submit Application <ChevronRight size={22} strokeWidth={3} /></>
                    )}
                </motion.button>
            </div>
        </div>
    );
};

export default StepBank;
