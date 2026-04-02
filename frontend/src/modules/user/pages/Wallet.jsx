import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Download, History, CreditCard, Gift, Send } from 'lucide-react';

const Wallet = () => {
  const navigate = useNavigate();

  const [showAddMoney, setShowAddMoney] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [isAdding, setIsAdding] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleAddMoney = () => {
    if (!amount) return;
    setIsAdding(true);
    setTimeout(() => {
        setIsAdding(false);
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            setShowAddMoney(false);
            setAmount('');
        }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-lg mx-auto flex flex-col font-sans mb-32">
      {/* ADD MONEY MODAL */}
      <AnimatePresence>
        {showAddMoney && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white w-full max-w-md rounded-[32px] p-8 pb-10 space-y-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowAddMoney(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 active:scale-90"
              >
                <Plus size={20} className="rotate-45" />
              </button>

              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Add Money</h3>
                <p className="text-[12px] font-bold text-gray-400 tracking-widest uppercase">Select amount to top-up</p>
              </div>

              {isSuccess ? (
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center py-8 gap-4">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center shadow-inner">
                    <History size={40} strokeWidth={3} />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-black text-gray-900 leading-none">Wallet Refilled!</p>
                    <p className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Balance updated successfully</p>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-400 group-focus-within:text-orange-500 transition-colors">₹</span>
                    <input 
                       type="number"
                       value={amount}
                       onChange={(e) => setAmount(e.target.value)}
                       placeholder="0.00"
                       className="w-full h-20 bg-gray-50 border-2 border-gray-100 rounded-[24px] pl-12 pr-6 text-3xl font-black text-gray-900 focus:outline-none focus:border-orange-500/30 transition-all text-center placeholder:text-gray-200"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {['100', '500', '1000'].map(val => (
                      <button 
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`py-3 rounded-2xl font-black text-[13px] border-2 transition-all ${
                          amount === val ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-white border-gray-100 text-gray-500'
                        }`}
                      >
                        +₹{val}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={handleAddMoney}
                    disabled={isAdding || !amount}
                    className={`w-full h-16 rounded-[24px] font-black text-[15px] uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 ${
                      isAdding ? 'bg-gray-100 text-gray-300 shadow-none' : 'bg-orange-500 text-white shadow-orange-200'
                    }`}
                  >
                    {isAdding ? 'Processing...' : (
                      <>Refill Wallet <Plus size={20} strokeWidth={3} /></>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="bg-white px-5 pt-12 pb-6 flex items-center gap-4 sticky top-0 z-20 border-b border-gray-50/20">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} className="text-gray-900" strokeWidth={2.5} />
        </button>
        <h1 className="text-[19px] font-black text-gray-900 tracking-tight">My Wallet</h1>
      </header>

      {/* BALANCE CARD */}
      <div className="px-5 mt-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[36px] p-8 text-white shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-orange-500/20 transition-colors"></div>
          
          <div className="relative z-10 flex flex-col gap-8">
            <div className="space-y-1">
              <p className="text-white/30 font-black uppercase tracking-[0.2em] text-[8px]">Current Liquidity</p>
              <h2 className="text-4xl font-black tracking-tighter">₹1,250<span className="text-white/20 text-2xl">.00</span></h2>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAddMoney(true)}
                className="flex-1 bg-orange-500 text-white h-14 rounded-2xl font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-orange-500/20 active:shadow-none"
              >
                <Plus size={16} strokeWidth={3} />
                Refill
              </button>
              <button 
                onClick={() => navigate('/activity')}
                className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white active:scale-95 transition-all hover:bg-white/10"
              >
                <History size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="px-5 mt-8 grid grid-cols-3 gap-3">
         <div className="bg-white border border-gray-100 rounded-[28px] p-5 flex flex-col items-center justify-center gap-3 shadow-sm cursor-pointer active:scale-95 transition-all hover:border-blue-100 group">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
               <Send size={20} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Send</span>
         </div>
         <div className="bg-white border border-gray-100 rounded-[28px] p-5 flex flex-col items-center justify-center gap-3 shadow-sm cursor-pointer active:scale-95 transition-all hover:border-green-100 group">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors shadow-sm">
               <Download size={20} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Receive</span>
         </div>
         <div 
            onClick={() => navigate('/profile/payments')}
            className="bg-white border border-gray-100 rounded-[28px] p-5 flex flex-col items-center justify-center gap-3 shadow-sm cursor-pointer active:scale-95 transition-all hover:border-purple-100 group"
         >
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">
               <CreditCard size={20} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Cards</span>
         </div>
      </div>

      {/* PROMO */}
      <div className="px-5 mt-8">
         <div 
            onClick={() => navigate('/taxi/driver/referral')}
            className="bg-gradient-to-r from-orange-50 to-white border border-orange-100 rounded-[32px] p-6 flex items-center gap-5 cursor-pointer active:scale-98 transition-all shadow-sm group"
         >
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-xl shadow-orange-100 group-hover:bg-orange-500 group-hover:text-white transition-all shrink-0 border border-orange-50">
               <Gift size={24} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
               <h4 className="text-[15px] font-black text-gray-900 tracking-tight">Refer & Earn ₹50</h4>
               <p className="text-[11px] font-bold text-gray-400 mt-0.5 uppercase tracking-wider">Invite friends to Redigo</p>
            </div>
            <ArrowLeft size={20} className="text-orange-200 rotate-180 group-hover:text-orange-500 transition-colors" />
         </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="px-5 mt-10">
         <div className="flex items-center justify-between mb-6 px-1">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none">History Log</h3>
            <button onClick={() => navigate('/activity')} className="text-[10px] font-black text-orange-500 uppercase tracking-wider">View All</button>
         </div>
         <div className="bg-white rounded-[36px] border border-gray-50 shadow-sm p-3 flex flex-col gap-2">
            <div 
                onClick={() => navigate('/ride/detail/8231')}
                className="flex items-center gap-4 p-4 rounded-[28px] hover:bg-gray-50 cursor-pointer transition-all active:scale-[0.99] group"
            >
               <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <ArrowLeft size={20} strokeWidth={3} className="rotate-45" />
               </div>
               <div className="flex-1 min-w-0">
                  <h4 className="text-[15px] font-black text-gray-900 truncate tracking-tight">Ride to Airport</h4>
                  <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Today, 10:24 AM</p>
               </div>
               <div className="text-right shrink-0">
                  <h4 className="text-[16px] font-black text-gray-900 tracking-tight">-₹450</h4>
                  <div className="flex items-center gap-1 justify-end mt-0.5">
                     <span className="text-[8px] font-black text-red-400 uppercase tracking-widest">Debit</span>
                     <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-[28px] hover:bg-gray-50 cursor-pointer transition-all active:scale-[0.99] group">
               <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Plus size={20} strokeWidth={3} />
               </div>
               <div className="flex-1 min-w-0">
                  <h4 className="text-[15px] font-black text-gray-900 truncate tracking-tight">Wallet Refilled</h4>
                  <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Yesterday, 04:12 PM</p>
               </div>
               <div className="text-right shrink-0">
                  <h4 className="text-[16px] font-black text-emerald-600 tracking-tight">+₹1,000</h4>
                  <div className="flex items-center gap-1 justify-end mt-0.5">
                     <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Credit</span>
                     <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Wallet;
