import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Phone, User, Smile, Headset } from 'lucide-react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminChat = new URLSearchParams(location.search).get('admin') === 'true';

  const messages = isAdminChat ? [
    { sender: 'driver', text: "Hello! How can we help you today?", time: '12:45' },
  ] : [
    { sender: 'driver', text: "I've arrived at your location.", time: '12:45' },
    { sender: 'user', text: "Okay, coming in 2 minutes.", time: '12:46' },
  ];

  const quickReplies = isAdminChat 
    ? ["Payment Issue", "Ride Cancelled", "Lost Item", "Safety"]
    : ["Wait for me", "I'm coming", "Where exactly?", "Okay"];

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-lg mx-auto flex flex-col font-sans relative">
      {/* Chat Header */}
      <div className="bg-white px-5 py-6 flex items-center justify-between border-b border-gray-50 shadow-sm sticky top-0 z-20">
         <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-90 transition-all">
               <ArrowLeft size={24} className="text-gray-900" strokeWidth={3} />
            </button>
            <div className="flex items-center gap-3">
               <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isAdminChat ? 'bg-orange-100 text-primary' : 'bg-gray-100 overflow-hidden'}`}>
                     {isAdminChat ? <Headset size={20} /> : <img src="https://ui-avatars.com/api/?name=Kishan+Kumawat&background=f0f0f0&color=000" alt="Driver" />}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
               </div>
               <div>
                  <h3 className="text-[16px] font-black text-gray-900 leading-none">
                    {isAdminChat ? 'Redigo Support' : 'Kishan Kumawat'}
                  </h3>
                  <p className="text-[11px] font-bold text-green-600 mt-1 uppercase tracking-widest ">Active Now</p>
               </div>
            </div>
         </div>
         {!isAdminChat && (
            <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center active:scale-95 transition-all">
               <Phone size={18} className="text-gray-900" strokeWidth={3} />
            </button>
         )}
      </div>

      {/* Message Area */}
      <div className="flex-1 p-5 space-y-4 overflow-y-auto no-scrollbar">
         {messages.map((m, idx) => (
            <motion.div 
               key={idx} 
               initial={{ opacity: 0, x: m.sender === 'user' ? 20 : -20 }}
               animate={{ opacity: 1, x: 0 }}
               className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
               <div className={`max-w-[80%] px-4 py-3 rounded-[24px] shadow-sm ${
                  m.sender === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none border border-gray-50'
               }`}>
                  <p className="text-[15px] font-bold leading-relaxed">{m.text}</p>
                  <span className={`text-[10px] font-black mt-1 block uppercase ${m.sender === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                     {m.time}
                  </span>
               </div>
            </motion.div>
         ))}
      </div>

      {/* Floating Footer Area */}
      <div className="p-4 bg-white border-t border-gray-50 space-y-3 pb-8">
         {/* Quick Replies */}
         <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {quickReplies.map((reply, idx) => (
               <button 
                  key={idx}
                  onClick={() => setMessage(reply)}
                  className="shrink-0 px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-full text-[12px] font-black text-gray-500 hover:text-primary hover:border-primary active:scale-95 transition-all"
               >
                  {reply}
               </button>
            ))}
         </div>

         {/* Text Input */}
         <div className="flex items-center gap-2 bg-gray-50 rounded-[28px] p-2 pr-2 border border-gray-100">
            <div className="w-10 h-10 flex items-center justify-center text-gray-400">
               <Smile size={22} />
            </div>
            <input 
               type="text" 
               placeholder="Type a message..."
               className="flex-1 bg-transparent border-none text-[15px] font-bold text-gray-900 focus:outline-none placeholder:text-gray-300"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
            />
            <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
               message ? 'bg-primary text-white shadow-lg shadow-orange-100' : 'bg-gray-200 text-gray-400'
            }`}>
               <Send size={18} strokeWidth={3} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default Chat;

