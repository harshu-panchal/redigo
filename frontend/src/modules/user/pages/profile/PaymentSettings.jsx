import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Plus, Banknote } from 'lucide-react';

const PaymentSettings = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-lg mx-auto flex flex-col font-sans">
      <header className="bg-white p-5 flex items-center gap-6 border-b border-gray-50 sticky top-0 z-20">
         <button onClick={() => navigate(-1)} className="p-2 active:scale-95"><ArrowLeft size={24} /></button>
         <h1 className="text-[18px] font-black">Payments</h1>
      </header>
      <div className="p-5 space-y-4">
         <div className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center"><Banknote /></div>
               <div><p className="font-black">Cash</p><p className="text-xs text-gray-400">Default</p></div>
            </div>
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white p-1"><Plus className="rotate-45" /></div>
         </div>
         <button className="w-full py-5 border-2 border-dashed border-gray-200 rounded-[32px] text-gray-400 font-bold flex items-center justify-center gap-2">
            <Plus size={18} /> Add New Payment Method
         </button>
      </div>
    </div>
  );
};

export default PaymentSettings;
