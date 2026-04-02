import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PromoBanners = () => {
  const navigate = useNavigate();

  return (
    <div className="px-5 mb-4 space-y-3">
      <div className="flex gap-4">
        {/* Banner 1: In a hurry? */}
        <motion.div 
            whileTap={{ scale: 0.97 }} 
            onClick={() => navigate('/ride/select-location')}
            className="flex-1 bg-white rounded-[32px] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col justify-center h-[130px] group cursor-pointer relative overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
             <img src="/2_AutoRickshaw.png" className="w-full h-full object-contain opacity-10 group-hover:scale-110 transition-transform duration-700" alt="Auto" />
          </div>
          <div className="relative z-10">
             <h3 className="text-[19px] font-black text-gray-900 leading-tight">In a hurry?</h3>
             <p className="text-[12px] font-bold text-orange-600 mt-1 uppercase tracking-widest">Auto for you</p>
          </div>
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all z-10">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
             </svg>
          </div>
        </motion.div>

        {/* Banner 2: Need Space? */}
        <motion.div 
            whileTap={{ scale: 0.97 }} 
            onClick={() => navigate('/ride/select-location')}
            className="flex-1 bg-white rounded-[32px] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col justify-center h-[130px] group cursor-pointer relative overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
             <img src="/4_Taxi.png" className="w-full h-full object-contain opacity-10 group-hover:scale-110 transition-transform duration-700" alt="Car" />
          </div>
          <div className="relative z-10">
             <h3 className="text-[19px] font-black text-gray-900 leading-tight">Need Space?</h3>
             <p className="text-[12px] font-bold text-blue-600 mt-1 uppercase tracking-widest">Car is here</p>
          </div>
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all z-10">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
             </svg>
          </div>
        </motion.div>
      </div>


      {/* Main Promo Banner */}
      <div className="bg-gradient-to-br from-[#EAF5FC] to-[#F0F7FF] rounded-[40px] p-4 pr-4 relative overflow-hidden flex items-center shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-white">
        <div className="relative z-10 flex-1 space-y-5">
          <div>
            <h3 className="text-[21px] font-black text-blue-950 leading-tight">Going a few kms away?</h3>
            <p className="text-[11px] font-extrabold text-blue-600 uppercase tracking-[0.2em] mt-1.5 opacity-80">First ride is on us!</p>
          </div>
          <motion.button 
             whileTap={{ scale: 0.95 }}
             onClick={() => navigate('/ride/select-location')}
             className="bg-blue-600 text-white px-7 py-3 rounded-full text-[13px] font-black shadow-lg shadow-blue-200 active:bg-blue-700 transition-all"
          >
            Ride Now
          </motion.button>
        </div>
        <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-48 opacity-100 pointer-events-none group-hover:scale-105 transition-transform duration-700">
          <img src="/ride_now_banner.png" alt="Promo" className="w-full drop-shadow-2xl" />
        </div>
      </div>
    </div>

  );
};

export default PromoBanners;
