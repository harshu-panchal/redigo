import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bike, Box, ChevronRight, Calendar, Clock, Headset } from 'lucide-react';
import BottomNavbar from '../components/BottomNavbar';

const ActivityItem = ({ id, type, title, address, date, time, status, price, onClick }) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(id)}
    className="bg-white rounded-[24px] p-4 mb-3 border border-gray-50 shadow-sm flex items-center gap-4 cursor-pointer hover:border-gray-100 transition-all active:bg-gray-50/50"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
        type === 'ride' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
    }`}>
        {type === 'ride' ? <Bike size={22} strokeWidth={2.5} /> : <Box size={22} strokeWidth={2.5} />}
    </div>
    <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
            <h4 className="text-[15px] font-black text-gray-900 leading-none truncate">{title}</h4>
            <span className="text-[14px] font-black text-gray-900">₹{price}</span>
        </div>
        <p className="text-[12px] font-bold text-gray-400 mt-1 truncate max-w-[180px]">{address}</p>
        <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                <Calendar size={11} strokeWidth={3} />
                <span>{date}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                <Clock size={11} strokeWidth={3} />
                <span>{time}</span>
            </div>
            <span className={`text-[9px] font-black px-2 py-0.5 rounded leading-none ${
                status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
                {status.toUpperCase()}
            </span>
        </div>
    </div>
    <ChevronRight size={16} className="text-gray-200" strokeWidth={3} />
  </motion.div>
);

const Activity = () => {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const activities = [
    { id: '8231', type: 'ride', title: 'Ride with Kishan Kumawat', address: 'Vijay Nagar, Indore', date: '29 Mar', time: '12:45 PM', status: 'Completed', price: '22' },
    { id: '4492', type: 'parcel', title: 'Gift for Rahul', address: 'Bhawarkua, Indore', date: '28 Mar', time: '11:20 AM', status: 'Completed', price: '45' },
    { id: '1105', type: 'ride', title: 'Ride with Rajesh', address: 'LIG Colony, Indore', date: '28 Mar', time: '09:12 AM', status: 'Cancelled', price: '0' },
  ];

  // Filter based on active tab
  const filtered = activities.filter((a) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Rides') return a.type === 'ride';
    if (activeTab === 'Parcels') return a.type === 'parcel';
    return false; // Support tab shows empty state
  });

  const handleItemClick = (item) => {
    if (item.type === 'parcel') {
      navigate(`/parcel/detail/${item.id}`);
    } else {
      navigate(`/ride/detail/${item.id}`);
    }
  };




  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-lg mx-auto flex flex-col font-sans pb-32">
      <header className="bg-white px-5 py-8 flex items-center gap-6 sticky top-0 z-20 border-b border-gray-50/50 shadow-sm">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-95 transition-all">
            <ArrowLeft size={24} className="text-gray-900" strokeWidth={3} />
         </button>
         <div>
            <h1 className="text-[20px] font-extrabold text-gray-900 tracking-tight leading-none uppercase tracking-widest text-xs opacity-50 mb-2">My Bookings</h1>
            <h2 className="text-[17px] font-black text-gray-950 leading-none">Recent Activity</h2>
         </div>
      </header>

      <div className="px-5 py-4 flex gap-2 overflow-x-auto no-scrollbar">
          {['All', 'Rides', 'Parcels', 'Support'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-6 py-2.5 rounded-full text-[12px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab ? 'bg-primary text-white shadow-lg shadow-orange-100 scale-100' : 'bg-gray-50 text-gray-400'
                }`}
              >
                {tab}
              </button>
          ))}
      </div>

      <div className="flex-1 px-5 pt-2">
         {activeTab === 'Support' ? (
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col items-center justify-center py-20 text-center gap-5"
           >
             <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center">
               <Headset size={36} className="text-primary" />
             </div>
             <div className="space-y-1">
               <h3 className="text-[17px] font-black text-gray-900">No support tickets</h3>
               <p className="text-[13px] font-bold text-gray-400">You haven't raised any support tickets yet.</p>
             </div>
             <button
               onClick={() => navigate('/support')}
               className="mt-2 bg-primary text-white px-8 py-3.5 rounded-full text-sm font-black uppercase tracking-widest shadow-lg shadow-orange-100 active:scale-95 transition-all"
             >
               Contact Us
             </button>
           </motion.div>
         ) : filtered.length === 0 ? (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="flex flex-col items-center justify-center py-20 text-center gap-3"
           >
             <div className="text-5xl">📭</div>
             <p className="text-[15px] font-black text-gray-400">No {activeTab.toLowerCase()} found</p>
           </motion.div>
         ) : (
           filtered.map((a, idx) => (
             <ActivityItem
               key={idx}
               {...a}
               onClick={() => handleItemClick(a)}
             />
           ))
         )}
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Activity;

