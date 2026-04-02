import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Phone, HelpCircle, AlertCircle, XCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import BottomNavbar from '../../components/BottomNavbar';

const Support = () => {
  const navigate = useNavigate();

  const helpTopics = [
    { title: "Driver didn't arrive", icon: <XCircle size={20} className="text-red-500" /> },
    { title: "Safety concern", icon: <ShieldCheck size={20} className="text-blue-500" /> },
    { title: "I lost an item", icon: <HelpCircle size={20} className="text-orange-500" /> },
    { title: "Payment failure", icon: <AlertCircle size={20} className="text-gray-900" /> },
  ];

  const handleCall = () => {
    window.open('tel:+919876543210', '_self');
  };

  const handleChat = () => {
    navigate('/ride/chat?admin=true');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-lg mx-auto flex flex-col font-sans relative pb-32">
      <header className="bg-white px-5 py-5 flex items-center gap-4 border-b border-gray-50 sticky top-0 z-20">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-90 transition-all">
            <ArrowLeft size={22} className="text-gray-900" strokeWidth={3} />
         </button>
         <h1 className="text-[18px] font-black text-gray-900 tracking-tight">Help & Support</h1>
      </header>

      <div className="p-4 flex-1 space-y-4">
         {/* Live Contact Options - More Compact */}
         <div className="grid grid-cols-2 gap-3">
            <motion.div 
               whileTap={{ scale: 0.97 }}
               onClick={handleChat}
               className="bg-white border border-gray-100 rounded-[24px] p-4 shadow-sm flex flex-col items-center justify-center text-center gap-2 cursor-pointer group hover:border-primary transition-all"
            >
               <div className="w-10 h-10 bg-orange-50 text-primary rounded-xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                  <MessageCircle size={20} strokeWidth={2.5} />
               </div>
               <span className="text-[13px] font-black text-gray-900 leading-tight">Live Chat</span>
            </motion.div>
            <motion.div 
               whileTap={{ scale: 0.97 }}
               onClick={handleCall}
               className="bg-white border border-gray-100 rounded-[24px] p-4 shadow-sm flex flex-col items-center justify-center text-center gap-2 cursor-pointer group hover:border-blue-600 transition-all"
            >
               <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Phone size={20} strokeWidth={2.5} />
               </div>
               <span className="text-[13px] font-black text-gray-900 leading-tight">Call Support</span>
            </motion.div>
         </div>

         {/* Common Help Topics Area */}
         <div className="pt-2">
            <h3 className="text-[11px] font-black text-gray-400 mb-3 ml-1 uppercase tracking-widest opacity-60">Choose a Topic</h3>
            <div className="space-y-2.5">
               {helpTopics.map((topic, idx) => (
                  <motion.div 
                     key={idx} 
                     whileTap={{ scale: 0.98 }}
                     onClick={handleChat}
                     className="bg-white border border-gray-50 rounded-[20px] p-3.5 flex items-center justify-between shadow-sm cursor-pointer group hover:border-primary/30 transition-all"
                  >
                     <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-all">
                           {topic.icon}
                        </div>
                        <span className="text-[14px] font-bold text-gray-800 tracking-tight group-hover:text-primary transition-colors">{topic.title}</span>
                     </div>
                     <ChevronRight size={16} className="text-gray-300" strokeWidth={3} />
                  </motion.div>
               ))}
            </div>
         </div>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Support;
