import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Wallet, 
    ArrowUpRight, 
    ArrowDownLeft, 
    Calendar, 
    Clock, 
    CreditCard, 
    Banknote, 
    History, 
    TrendingUp, 
    ChevronRight,
    Search,
    ArrowLeft,
    RefreshCw,
    CheckCircle2,
    X,
    Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DriverBottomNav from '../../shared/components/DriverBottomNav';

const DriverWallet = () => {
    const navigate = useNavigate();
    const [period, setPeriod] = useState('Weekly');
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('4890');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    const handleWithdraw = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setShowWithdraw(false);
            }, 2000);
        }, 1500);
    };

    const transactions = [
        { id: 'TID-9080', type: 'Ride Earning', amount: '₹120', time: '10:30 AM', date: 'Today', status: 'Success', mode: 'Online' },
        { id: 'TID-9079', type: 'Bonus Incentive', amount: '₹450', time: '08:00 AM', date: 'Today', status: 'Success', mode: 'Wallet' },
        { id: 'TID-9078', type: 'Ride Earning', amount: '₹85', time: 'Yesterday', date: '21 Mar', status: 'Success', mode: 'Cash' },
        { id: 'TID-9077', type: 'Settlement', amount: '-₹2,500', time: 'Yesterday', date: '21 Mar', status: 'Success', mode: 'Bank' },
        { id: 'TID-9076', type: 'Ride Earning', amount: '₹210', time: '20 Mar', date: '20 Mar', status: 'Pending', mode: 'Online' }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fb] font-sans select-none overflow-x-hidden p-5 pb-28 flex flex-col pt-6">
            
            {/* Withdraw Modal */}
            <AnimatePresence>
                {showWithdraw && (
                    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm">
                         <motion.div 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="bg-white w-full rounded-t-[2.5rem] p-7 pb-10 space-y-6 shadow-2xl"
                         >
                             <div className="flex justify-between items-center">
                                 <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Withdraw Funds</h3>
                                 <button onClick={() => setShowWithdraw(false)} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400"><X size={18} /></button>
                             </div>

                             {isSuccess ? (
                                 <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center py-8 gap-4">
                                     <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner">
                                         <CheckCircle2 size={40} strokeWidth={3} />
                                     </div>
                                     <div className="text-center">
                                         <p className="text-lg font-black text-slate-900 leading-none">Transfer Initiated!</p>
                                         <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Amount will reflect within 24 hours</p>
                                     </div>
                                 </motion.div>
                             ) : (
                                 <div className="space-y-6">
                                     <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Settlement Amount</p>
                                         <h4 className="text-4xl font-black text-slate-900 tracking-tighter">₹{withdrawAmount}</h4>
                                     </div>
                                     <div className="bg-emerald-50 p-4 rounded-2xl flex items-center gap-3 border border-emerald-100">
                                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm"><Wallet size={20} /></div>
                                         <div>
                                             <p className="text-[12px] font-black text-slate-900">Zeto Bank Savings</p>
                                             <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Primary Method</p>
                                         </div>
                                     </div>
                                     <motion.button 
                                         whileTap={{ scale: 0.98 }}
                                         onClick={handleWithdraw}
                                         disabled={isProcessing}
                                         className={`w-full h-14 rounded-2xl text-[14px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 ${
                                            isProcessing ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-white'
                                         }`}
                                     >
                                         {isProcessing ? <RefreshCw className="animate-spin" size={18} /> : 'Confirm Payout'}
                                         {!isProcessing && <ArrowUpRight size={18} strokeWidth={3} />}
                                     </motion.button>
                                 </div>
                             )}
                         </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Compact Header */}
            <header className="flex items-center justify-between mb-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-900 active:scale-95 transition-transform"
                >
                    <ArrowLeft size={18} strokeWidth={2.5} />
                </button>
                <div className="text-center">
                    <h1 className="text-lg font-black text-slate-900 tracking-tight uppercase">Earnings Portfolio</h1>
                </div>
                <button 
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-900 active:scale-95 transition-transform"
                >
                    <RefreshCw size={18} strokeWidth={2.5} className={isRefreshing ? 'animate-spin text-taxi-primary' : ''} />
                </button>
            </header>

            <main className="flex-1 space-y-8 flex flex-col">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-br from-[#1e212b] to-[#404455] rounded-[2rem] p-6 text-white relative shadow-xl border border-white/5 overflow-hidden group w-full"
                >
                    <div className="absolute top-[-30%] right-[-15%] w-40 h-40 bg-taxi-primary/20 rounded-full blur-3xl group-hover:bg-taxi-primary/30 transition-colors" />
                    
                    <div className="flex justify-between items-start relative z-10 mb-6 px-1">
                        <div className="space-y-0.5">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] opacity-80">Available to Withdraw</p>
                            <div className="flex items-baseline gap-1">
                                <h2 className="text-3xl font-black tracking-tighter">₹4,890</h2>
                                <span className="text-xl font-black text-white/30">.50</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:scale-105 transition-transform shadow-sm">
                             <Wallet size={22} className="text-taxi-primary" />
                        </div>
                    </div>

                    <div className="flex gap-3 relative z-10">
                         <button 
                            onClick={() => setShowWithdraw(true)}
                            className="flex-1 h-12 bg-taxi-primary text-black rounded-xl flex items-center justify-center gap-2 text-[12px] font-black shadow-lg shadow-taxi-primary/10 active:scale-97 transition-all uppercase tracking-tight"
                         >
                            Withdraw <ArrowUpRight size={16} strokeWidth={3} />
                        </button>
                         <button 
                            onClick={() => navigate('/taxi/driver/payout-methods')}
                            className="flex-1 h-12 bg-white/5 border border-white/10 text-white rounded-xl flex items-center justify-center gap-2 text-[12px] font-black active:scale-97 transition-all uppercase tracking-tight"
                         >
                            Manage <Settings size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                </motion.div>

                {/* Trends Section */}
                <div className="space-y-5">
                    <div className="flex items-center justify-between px-1">
                         <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">Revenue Analytics</h3>
                         <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 flex-nowrap">
                             {['Daily', 'Weekly', 'Monthly'].map(p => (
                                 <button 
                                    key={p}
                                    onClick={() => setPeriod(p)}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                                        period === p 
                                        ? 'bg-white text-slate-900 shadow-sm' 
                                        : 'text-slate-400 opacity-60'
                                    }`}
                                 >
                                     {p}
                                 </button>
                             ))}
                         </div>
                    </div>

                    <div className="bg-white p-5 rounded-[2rem] border border-white shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex items-end gap-2.5 h-40 w-full overflow-hidden">
                         {[40, 70, 45, 85, 60, 35, 75, 55, 90, 65].map((h, i) => (
                             <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05, duration: 1 }}
                                className={`flex-1 rounded-full relative group shadow-sm transition-colors ${i === 8 ? 'bg-taxi-primary' : 'bg-slate-50 group-hover:bg-slate-100'}`}
                             >
                                 <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">₹{h * 15}</div>
                             </motion.div>
                         ))}
                    </div>
                </div>

                {/* History Section */}
                <div className="space-y-5 flex-1 overflow-y-auto scrollbar-hide pb-5">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">Movement History</h3>
                        <button onClick={() => navigate('/taxi/driver/history')} className="text-[10px] font-black text-slate-600 uppercase tracking-[0.15em] border-b border-slate-200 pb-0.5">Full Log</button>
                    </div>

                    <div className="space-y-3">
                        {transactions.map((tx, idx) => (
                            <motion.div 
                                key={tx.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white p-4 rounded-[1.5rem] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex items-center justify-between group active:scale-[0.99] transition-all w-full"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm border border-slate-50 ${tx.amount.startsWith('-') ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                        {tx.mode === 'Online' ? <CreditCard size={18} strokeWidth={2.5} /> : tx.mode === 'Bank' ? <ArrowUpRight size={18} strokeWidth={2.5} /> : <Banknote size={18} strokeWidth={2.5} />}
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-[14px] font-black text-slate-900 tracking-tight leading-tight">{tx.type}</h4>
                                        <div className="flex items-center gap-2">
                                             <p className="text-[10px] font-bold text-slate-400 opacity-60 leading-none">{tx.date}</p>
                                             <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{tx.mode}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right space-y-0.5">
                                    <h5 className={`text-[15px] font-black ${tx.amount.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'} tracking-tighter`}>{tx.amount}</h5>
                                    <div className="flex items-center gap-1 justify-end">
                                         <p className={`text-[9px] font-black uppercase tracking-[0.1em] ${tx.status === 'Success' ? 'text-emerald-500/60' : 'text-amber-500/80'}`}>{tx.status}</p>
                                         <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Success' ? 'bg-emerald-500/40' : 'bg-amber-500/60 animate-pulse'}`} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <DriverBottomNav />
        </div>
    );
};

export default DriverWallet;
