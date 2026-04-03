import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Wallet, Bell, Shield, LogOut, ChevronRight, HelpCircle, MapPin } from 'lucide-react';
import BottomNavbar from '../components/BottomNavbar';

const SettingRow = ({ icon: Icon, title, sub, color, onClick }) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex items-center gap-4 py-4 px-5 bg-white border-b border-gray-50 last:border-none cursor-pointer group active:bg-gray-50 transition-colors"
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={20} strokeWidth={2.5} />
    </div>
    <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-black text-gray-900 leading-none">{title}</h4>
        {sub && <p className="text-[11px] font-bold text-gray-400 mt-1 opacity-70 truncate">{sub}</p>}
    </div>
    <ChevronRight size={16} className="text-gray-200 group-hover:text-gray-400 transition-colors" strokeWidth={3} />
  </motion.div>
);

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-lg mx-auto flex flex-col font-sans mb-32">
       {/* PROFILE HEADER - COMPACT */}
       <header className="bg-white px-5 pt-12 pb-8 flex flex-col items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-orange-50 to-white opacity-50"></div>
          <div className="relative">
             <div className="w-[88px] h-[88px] rounded-[34px] bg-white p-1 border-2 border-primary/20 shadow-xl">
                <img src="/man.png?v=2" className="w-full h-full rounded-[28px] object-cover" alt="User" />
             </div>
             <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center p-1">
                <div className="w-full h-full bg-white/20 rounded-full"></div>
             </div>
          </div>
          <div className="text-center z-10">
             <h1 className="text-[18px] font-black text-gray-900 leading-none capitalize">hritik raghuwanshi</h1>
             <p className="text-[12px] font-bold text-gray-400 mt-1.5 opacity-80 uppercase tracking-widest">+91 98765 43210</p>
          </div>
       </header>

       {/* SETTINGS MENU - FULLY ACTIVATED */}
       <div className="flex-1 mt-4 px-4">
          <div className="bg-white rounded-[32px] overflow-hidden border border-gray-50 shadow-sm flex flex-col">
             <SettingRow 
                icon={User} 
                title="Profile Settings" 
                sub="Manage your personal info" 
                onClick={() => navigate('/profile/settings')}
                color="bg-orange-50 text-orange-600" 
             />
             <SettingRow 
                icon={Wallet} 
                title="Wallet" 
                sub="Balance, Transactions & Add Money" 
                onClick={() => navigate('/wallet')}
                color="bg-blue-50 text-blue-600" 
             />
             <SettingRow 
                icon={MapPin} 
                title="Saved Addresses" 
                sub="Home, Office & others" 
                onClick={() => navigate('/profile/addresses')}
                color="bg-green-50 text-green-600" 
             />
             <SettingRow 
                icon={Bell} 
                title="Notifications" 
                sub="Offers, News & Safety alerts" 
                onClick={() => navigate('/profile/notifications')}
                color="bg-purple-50 text-purple-600" 
             />
             <SettingRow 
                icon={Shield} 
                title="Security" 
                sub="Manage your privacy" 
                onClick={() => navigate('/profile/security')}
                color="bg-red-50 text-red-600" 
             />
             <SettingRow 
                icon={HelpCircle} 
                title="Support" 
                sub="Get help with your experience" 
                onClick={() => navigate('/support')}
                color="bg-gray-100 text-gray-700" 
             />
          </div>

          <button 
            className="w-full mt-8 flex items-center justify-center gap-3 py-5 bg-red-50 text-red-600 rounded-[28px] text-[15px] font-black uppercase tracking-widest active:scale-[0.98] transition-all hover:bg-red-100/50 shadow-sm border border-red-100"
            onClick={() => navigate('/login')}
          >
             <LogOut size={18} strokeWidth={3} />
             <span>Sign Out</span>
          </button>
       </div>

       <BottomNavbar />
    </div>
  );
};

export default Profile;

