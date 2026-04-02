import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Briefcase, Plus } from 'lucide-react';

const AddressSettings = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-lg mx-auto flex flex-col font-sans">
      <header className="bg-white p-5 flex items-center gap-6 border-b border-gray-50 sticky top-0 z-20">
         <button onClick={() => navigate(-1)} className="p-2 active:scale-95"><ArrowLeft size={24} /></button>
         <h1 className="text-[18px] font-black">Addresses</h1>
      </header>
      <div className="p-5 space-y-4">
         <div className="bg-white p-6 rounded-[32px] border border-gray-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 text-primary rounded-2xl flex items-center justify-center"><Home /></div>
            <div><p className="font-black">Home</p><p className="text-xs text-gray-400">Vijay Nagar, Indore</p></div>
         </div>
         <div className="bg-white p-6 rounded-[32px] border border-gray-50 opacity-60 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center"><Briefcase /></div>
            <div><p className="font-black">Work</p><p className="text-xs text-gray-400 italic">Add your office address</p></div>
         </div>
         <button className="w-full py-5 bg-gray-50 rounded-[32px] text-gray-600 font-bold flex items-center justify-center gap-2 mt-4">
            <Plus size={18} /> Add Landmark
         </button>
      </div>
    </div>
  );
};

export default AddressSettings;
