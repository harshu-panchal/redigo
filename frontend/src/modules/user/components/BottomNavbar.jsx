import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Grid, Map, User } from 'lucide-react';

const NavItem = ({ icon: Icon, label, path, isActive, onClick }) => (
  <button 
    onClick={() => onClick(path)}
    className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all ${
      isActive ? 'text-gray-900 scale-110' : 'text-gray-400 opacity-60'
    }`}
  >
    <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-gray-100' : 'bg-transparent'}`}>
      <Icon size={20} strokeWidth={isActive ? 3 : 2} />
    </div>
    <span className={`text-[10px] uppercase tracking-widest font-black ${isActive ? 'opacity-100' : 'opacity-70'}`}>
      {label}
    </span>
  </button>
);

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Ride', path: '/' },
    { icon: Grid, label: 'History', path: '/activity' },
    { icon: Map, label: 'Travel', path: '/support' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-2 pb-5 flex justify-between z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => (
        <NavItem 
          key={item.label}
          {...item}
          isActive={location.pathname === item.path}
          onClick={(path) => navigate(path)}
        />
      ))}
    </div>
  );
};

export default BottomNavbar;
