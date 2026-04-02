import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Box, ShieldCheck, ChevronRight, Scale, AlertTriangle } from 'lucide-react';

const WEIGHT_PRICES = {
  'Under 5kg': { min: 45, max: 80 },
  'Above 5kg': { min: 90, max: 150 },
};

const ParcelDetails = () => {
  const [weight, setWeight] = useState('Under 5kg');
  const [description, setDescription] = useState('');
  const [descError, setDescError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const parcelType = location.state?.parcelType || 'Documents';

  const priceRange = WEIGHT_PRICES[weight];

  const handleNext = () => {
    if (description.trim().length < 3) {
      setDescError('Please add at least a short description of your item.');
      return;
    }
    setDescError('');
    navigate('/parcel/contacts', {
      state: {
        parcelType,
        weight,
        description,
        estimatedFare: priceRange,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] max-w-lg mx-auto flex flex-col font-sans relative">
      <header className="bg-white px-5 py-6 flex items-center gap-6 border-b border-gray-50 shadow-sm sticky top-0 z-20">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-90 transition-all">
            <ArrowLeft size={24} className="text-gray-900" strokeWidth={3} />
         </button>
         <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{parcelType}</p>
            <h1 className="text-[20px] font-extrabold text-gray-900 tracking-tight leading-none">Parcel Details</h1>
         </div>
      </header>

      <div className="flex-1 p-5 space-y-7">
         {/* Weight Toggle */}
         <div className="space-y-4">
             <h3 className="text-[16px] font-black text-gray-900 ml-1">Approximate Weight</h3>
             <div className="grid grid-cols-2 gap-3 bg-white p-2 rounded-[28px] border border-gray-50 shadow-sm">
                <button 
                   onClick={() => setWeight('Under 5kg')}
                   className={`py-5 rounded-[22px] flex flex-col items-center gap-2 transition-all ${
                       weight === 'Under 5kg' ? 'bg-primary text-white shadow-lg shadow-orange-200' : 'bg-transparent text-gray-400'
                   }`}
                >
                    <Scale size={24} />
                    <span className="text-[14px] font-black uppercase tracking-tight">Under 5 kg</span>
                </button>
                <button 
                   onClick={() => setWeight('Above 5kg')}
                   className={`py-5 rounded-[22px] flex flex-col items-center gap-2 transition-all ${
                       weight === 'Above 5kg' ? 'bg-primary text-white shadow-lg shadow-orange-200' : 'bg-transparent text-gray-400'
                   }`}
                >
                    <Box size={24} />
                    <span className="text-[14px] font-black uppercase tracking-tight">Above 5 kg</span>
                </button>
             </div>

             {/* Dynamic Price Preview */}
             <AnimatePresence mode="wait">
               <motion.div
                 key={weight}
                 initial={{ opacity: 0, y: -8 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 8 }}
                 className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl px-4 py-3"
               >
                 <ShieldCheck size={18} className="text-green-500 shrink-0" strokeWidth={2.5} />
                 <p className="text-[13px] font-black text-green-700">
                   Estimated fare: <span className="text-green-900">₹{priceRange.min} – ₹{priceRange.max}</span>
                   <span className="text-[10px] font-bold text-green-500 ml-1">based on distance</span>
                 </p>
               </motion.div>
             </AnimatePresence>
         </div>

         {/* Item Description */}
         <div className="space-y-3">
             <h3 className="text-[16px] font-black text-gray-900 ml-1">What are you sending?</h3>
             <div className={`bg-white rounded-[24px] p-2 border shadow-sm transition-all ${descError ? 'border-red-200' : 'border-gray-50'}`}>
                <textarea 
                   rows="3"
                   placeholder="e.g. My Laptop Charger and some clothes..."
                   className="w-full bg-gray-50/30 border-none rounded-2xl p-5 text-[15px] font-bold text-gray-900 focus:outline-none placeholder:text-gray-300 resize-none"
                   value={description}
                   onChange={(e) => {
                     setDescription(e.target.value);
                     if (e.target.value.trim().length >= 3) setDescError('');
                   }}
                />
             </div>
             <AnimatePresence>
               {descError && (
                 <motion.p
                   initial={{ opacity: 0, y: -4 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0 }}
                   className="text-[12px] font-black text-red-500 ml-2 flex items-center gap-1.5"
                 >
                   <AlertTriangle size={13} strokeWidth={3} />
                   {descError}
                 </motion.p>
               )}
             </AnimatePresence>
         </div>

         {/* Restrictions Warning */}
         <div className="bg-orange-50 border border-orange-100 rounded-[28px] p-5 flex gap-4">
             <AlertTriangle size={24} className="text-primary shrink-0 mt-0.5" strokeWidth={3} />
             <div className="space-y-1">
                <span className="text-[13px] font-black text-gray-800 uppercase tracking-tight">Restricted Items</span>
                <p className="text-[11px] font-bold text-gray-500 leading-normal">
                   Drugs, Alcohol, Explosives, and Items above ₹5,000 are not allowed for delivery.
                </p>
             </div>
         </div>
      </div>

      <div className="p-6 bg-white border-t border-gray-50 pb-10">
         <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full bg-[#1C2833] py-5 rounded-[28px] text-[18px] font-black text-white shadow-xl shadow-gray-200 active:bg-black transition-all flex items-center justify-center gap-2"
         >
            <span>Sender & Receiver</span>
            <ChevronRight size={20} className="opacity-40" />
         </motion.button>
      </div>
    </div>
  );
};

export default ParcelDetails;
