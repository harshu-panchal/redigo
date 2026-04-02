import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Box, Gift, FileText, ShoppingBag, Smartphone, LayoutGrid, ChevronRight } from 'lucide-react';

const ParcelType = () => {
  const [selectedType, setSelectedType] = useState('Documents');
  const navigate = useNavigate();

  const categories = [
    { id: '1', title: 'Documents', icon: <FileText size={20} />, desc: 'Office files, paper' },
    { id: '2', title: 'Groceries', icon: <ShoppingBag size={20} />, desc: 'Daily veggies' },
    { id: '3', title: 'Gifts', icon: <Gift size={20} />, desc: 'Cake, gift box' },
    { id: '4', title: 'Clothes', icon: <Box size={20} />, desc: 'Laundry, dresses' },
    { id: '5', title: 'Electronics', icon: <Smartphone size={20} />, desc: 'Phone, cables' },
    { id: '6', title: 'Others', icon: <LayoutGrid size={20} />, desc: 'Any other item' },
  ];

  return (
    <div className="h-screen bg-[#FDFDFD] max-w-lg mx-auto flex flex-col font-sans relative overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-4 border-b border-gray-50 shadow-sm shrink-0">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-90 transition-all">
            <ArrowLeft size={20} className="text-gray-900" strokeWidth={3} />
         </button>
         <div>
            <h1 className="text-[18px] font-extrabold text-gray-900 tracking-tight leading-none">Parcel Type</h1>
            <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">What are you sending?</p>
         </div>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-4 overflow-y-auto">
        <h2 className="text-[15px] font-black text-gray-900">Select Category</h2>
        <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
                <motion.div 
                    key={cat.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedType(cat.title)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 ${
                        selectedType === cat.title 
                        ? 'border-primary bg-orange-50/50 shadow-md shadow-orange-100/50 scale-100' 
                        : 'border-gray-50 bg-white hover:border-gray-200'
                    }`}
                >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedType === cat.title ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                        {cat.icon}
                    </div>
                    <div>
                        <span className={`text-[12px] font-black tracking-tight block leading-tight ${
                            selectedType === cat.title ? 'text-gray-900' : 'text-gray-500'
                        }`}>{cat.title}</span>
                        <span className="text-[9px] font-bold text-gray-400 leading-tight mt-0.5 opacity-80 block">{cat.desc}</span>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

      {/* Button Sticky Area */}
      <div className="p-4 bg-white border-t border-gray-50 shrink-0">
         <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/parcel/details', { state: { parcelType: selectedType } })}
            className="w-full bg-[#1C2833] py-4 rounded-2xl text-[16px] font-black text-white shadow-xl shadow-gray-200 active:bg-black transition-all flex items-center justify-center gap-2"
         >
            <span>Next: Item Details</span>
            <ChevronRight size={18} className="opacity-40" />
         </motion.button>
      </div>
    </div>
  );
};

export default ParcelType;
