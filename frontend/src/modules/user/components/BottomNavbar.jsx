import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Grid, Map, User } from 'lucide-react';

const NavItem = ({ icon: Icon, label, path, isActive, onClick }) => (
  <button
    onClick={() => onClick(path)}
    className={`flex flex-col items-center gap-1 flex-1 py-1.5 transition-all ${
      isActive ? 'text-slate-900' : 'text-slate-400'
    }`}
  >
    <div className={`rounded-xl px-3 py-2 transition-all ${isActive ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/12' : 'bg-transparent'}`}>
      <Icon size={20} strokeWidth={isActive ? 3 : 2} />
    </div>
    <span className={`text-[10px] uppercase tracking-[0.18em] font-black ${isActive ? 'opacity-100' : 'opacity-70'}`}>
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
    <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto border-t border-white/80 bg-white/92 backdrop-blur-xl px-4 py-2 pb-5 flex justify-between z-50 shadow-[0_-14px_40px_rgba(15,23,42,0.08)]">
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
