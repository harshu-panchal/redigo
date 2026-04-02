import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Wallet, History, User, Bell } from 'lucide-react';

const DriverBottomNav = () => {
    const location = useLocation();

    const navItems = [
        { icon: <Home size={20} />, label: 'Home', path: '/taxi/driver/home' },
        { icon: <Wallet size={20} />, label: 'Wallet', path: '/taxi/driver/wallet' },
        { icon: <History size={20} />, label: 'Activity', path: '/taxi/driver/history' },
        { icon: <User size={20} />, label: 'Profile', path: '/taxi/driver/profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex items-center justify-between z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => 
                            `flex flex-col items-center gap-1 transition-all ${
                                isActive ? 'text-taxi-secondary scale-110' : 'text-slate-400 opacity-60 hover:opacity-100'
                            }`
                        }
                    >
                        <div className={`p-2 rounded-2xl transition-colors ${isActive ? 'bg-taxi-primary/10 shadow-sm' : ''}`}>
                            {React.cloneElement(item.icon, { 
                                strokeWidth: isActive ? 2.5 : 2,
                                size: 20
                            })}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                            {item.label}
                        </span>
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default DriverBottomNav;
