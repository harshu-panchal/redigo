import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Smartphone } from 'lucide-react';

const SecuritySettings = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-lg mx-auto flex flex-col font-sans">
      <header className="bg-white p-5 flex items-center gap-6 border-b border-gray-50 sticky top-0 z-20">
         <button onClick={() => navigate(-1)} className="p-2 active:scale-95"><ArrowLeft size={24} /></button>
         <h1 className="text-[18px] font-black">Security</h1>
      </header>
      <div className="p-5 space-y-4">
         <div className="bg-white p-6 rounded-[32px] border border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center"><Lock /></div>
               <div><p className="font-black">Fingerprint Lock</p><p className="text-xs text-gray-400">Secure your app</p></div>
            </div>
            <div className="w-12 h-6 bg-green-500 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div></div>
         </div>
         <div className="bg-white p-6 rounded-[32px] border border-gray-50 flex items-center gap-4 opacity-60">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center"><Smartphone /></div>
            <div><p className="font-black">Active Devices</p><p className="text-xs text-gray-400">Current: Pixel 7 Pro</p></div>
         </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
