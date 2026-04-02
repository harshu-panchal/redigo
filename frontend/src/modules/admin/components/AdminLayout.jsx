import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Car, 
  Settings, 
  LogOut, 
  Menu, 
  Bell,
  Search,
  IndianRupee,
  ShieldAlert,
  Layers,
  MapPin,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Package,
  Command,
  Gift,
  Briefcase,
  TrendingUp,
  Zap,
  Share2,
  ChevronDown as ChevronDownIcon
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, isCollapsed }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-200 group ${
        isActive 
          ? 'bg-white/10 text-white' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`
    }
  >
    <Icon size={18} className="shrink-0" />
    {!isCollapsed && <span className="font-semibold text-[13px] tracking-tight">{label}</span>}
  </NavLink>
);

const SidebarGroup = ({ icon: Icon, label, subItems, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all duration-200 group text-gray-400 hover:text-white hover:bg-white/5`}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className="shrink-0" />
          {!isCollapsed && <span className="font-semibold text-[13px] tracking-tight">{label}</span>}
        </div>
        {!isCollapsed && (
          <ChevronRight size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
        )}
      </button>
      
      {!isCollapsed && isOpen && (
        <div className="pl-9 pr-2 space-y-1 mt-1">
           {subItems.map((item, idx) => {
             if (item.subItems) {
               return <NestedGroup key={idx} {...item} />;
             }
             return (
               <NavLink
                 key={idx}
                 to={item.path}
                 className={({ isActive }) =>
                   `block px-3 py-2 rounded-lg text-[12px] font-medium transition-all ${
                     isActive ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                   }`
                 }
               >
                 <span className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                    {item.label}
                 </span>
               </NavLink>
             );
           })}
        </div>
      )}
    </div>
  );
};

const NestedGroup = ({ label, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="space-y-1">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all"
      >
        <span className="flex items-center gap-2 text-[12px] font-medium">
           <div className="w-1 h-1 rounded-full bg-gray-500"></div>
           {label}
        </span>
        <ChevronRight size={12} className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="pl-4 space-y-1">
          {subItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-[11px] font-medium transition-all ${
                  isActive ? 'text-white bg-white/5' : 'text-gray-600 hover:text-gray-400'
                }`
              }
            >
              • {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isCollapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Auth Check
  React.useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && !window.location.pathname.includes('/admin/login')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/admin/dashboard' },
    { 
       icon: Users, 
       label: 'Customer Mgmt', 
       subItems: [
         { label: 'User List', path: '/admin/users' },
         { label: 'Delete Request Users', path: '/admin/users/delete-requests' },
         { label: 'User Bulk Upload', path: '/admin/users/bulk-upload' },
       ]
    },
    { 
       icon: Car, 
       label: 'Driver Mgmt', 
       subItems: [
         { label: 'Pending Drivers', path: '/admin/drivers/pending' },
         { label: 'Approved Drivers', path: '/admin/drivers' },
         { label: 'Subscription', path: '/admin/drivers/subscription' },
         { label: 'Drivers Ratings', path: '/admin/drivers/ratings' },
         { 
           label: 'Driver Wallet', 
           subItems: [
             { label: 'Withdrawal Requests', path: '/admin/drivers/wallet/withdrawals' },
             { label: 'Negative Balance Drivers', path: '/admin/drivers/wallet/negative' },
           ]
         },
         { label: 'Delete Request Drivers', path: '/admin/drivers/delete-requests' },
         { label: 'Driver Needed Documents', path: '/admin/drivers/documents' },
         { label: 'Driver Bulk Upload', path: '/admin/drivers/bulk-upload' },
         { label: 'Payment Methods', path: '/admin/drivers/payment-methods' },
         { label: '⚙️ Service Config', path: '/admin/drivers/service-config' },
       ]
    },
    { 
       icon: Briefcase, 
       label: 'Owner Management', 
       subItems: [
         { label: 'Owner Dashboard', path: '/admin/owners/dashboard' },
         { label: 'Manage Owners', path: '/admin/owners' },
         { label: 'Owner Wallet', path: '/admin/owners/wallet' },
         { 
           label: 'Fleet Management', 
           subItems: [
             { label: 'Fleet Drivers', path: '/admin/fleet/drivers' },
             { label: 'Blocked Fleet Drivers', path: '/admin/fleet/blocked' },
             { label: 'Fleet Needed Document', path: '/admin/fleet/documents' },
             { label: 'Manage Fleet', path: '/admin/fleet/manage' },
           ]
         },
         { label: 'Owner Needed Document', path: '/admin/owners/documents' },
         { label: 'Deleted Owners', path: '/admin/owners/deleted' },
         { label: 'Bookings', path: '/admin/owners/bookings' },
       ]
    },
    { 
       icon: Share2, 
       label: 'Referral Management', 
       subItems: [
         { label: 'Referral Dashboard', path: '/admin/referrals/dashboard' },
         { label: 'Referral Settings', path: '/admin/referrals/settings' },
         { label: 'Active Referrals', path: '/admin/referrals/active' },
       ]
    },
    { icon: TrendingUp, label: 'Promotions Management', path: '/admin/promotions' },
    { icon: IndianRupee, label: 'Price Management', path: '/admin/pricing' },
    { icon: Layers, label: 'Finance', path: '/admin/finance' },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans text-gray-900 overflow-hidden">
      <aside 
        className={`bg-[#0F172A] border-r border-white/5 transition-all duration-300 flex flex-col relative z-50 h-screen ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center px-6 justify-between border-b border-white/5">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
                   <Command size={20} />
                </div>
                {!isCollapsed && <span className="text-lg font-bold tracking-tight text-white">Redigo</span>}
             </div>
             <button onClick={() => setCollapsed(!isCollapsed)} className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-md transition-all hidden lg:block">
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
             </button>
          </div>

          {!isCollapsed && (
            <div className="px-4 mt-6 mb-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" size={14} />
                <input type="text" placeholder="Search menu..." className="w-full bg-white/5 border-none rounded-lg py-2 pl-9 pr-4 text-[12px] text-white placeholder:text-gray-500 focus:ring-1 focus:ring-white/20 transition-all shadow-inner" />
              </div>
            </div>
          )}

          <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto no-scrollbar scroll-smooth">
            {menuItems.map((item, idx) => (
              item.subItems ? (
                <SidebarGroup key={idx} {...item} isCollapsed={isCollapsed} />
              ) : (
                <SidebarItem key={idx} {...item} isCollapsed={isCollapsed} />
              )
            ))}
            <div className={`mt-8 mb-4 px-3 text-[10px] font-bold text-gray-500 tracking-widest uppercase ${isCollapsed ? 'opacity-0' : ''}`}>System</div>
            <SidebarItem icon={Bell} label="Notifications" path="/admin/notifications" isCollapsed={isCollapsed} />
            <SidebarItem icon={Settings} label="Settings" path="/admin/settings" isCollapsed={isCollapsed} />
          </nav>

          <div className="p-4 border-t border-white/5 mt-auto">
             <div className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-all ${isCollapsed ? 'justify-center' : ''}`}>
                <div className="w-8 h-8 rounded-full bg-indigo-500 border border-white/10 flex items-center justify-center text-white text-[10px] font-black">SA</div>
                {!isCollapsed && (
                   <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-white truncate leading-tight">Super Admin</p>
                      <p className="text-[10px] text-gray-500 truncate mt-0.5">Admin Ops</p>
                   </div>
                )}
             </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f0f4f8]">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
             <MapPin size={14} className="text-slate-400" />
             <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Global Filter</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1 mr-4 pr-4 border-r border-gray-100 leading-none">
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Search size={18} /></button>
                <button className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"><Zap size={18} /></button>
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Bell size={18} /></button>
             </div>
             <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5 hover:bg-gray-100 cursor-pointer transition-all group relative">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all"><Users size={14} /></div>
                <span className="text-[11px] font-black text-gray-950">Admin</span>
                <ChevronDownIcon size={14} className="text-gray-300" />
                
                {/* Dropdown for Logout */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all transform origin-top-right group-hover:scale-100 scale-95 z-50 p-2">
                   <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                   >
                     <LogOut size={16} />
                     <span className="text-[12px] font-bold">Logout Session</span>
                   </button>
                </div>
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          <div className="p-6 pb-20"><Outlet /></div>
        </main>
        
        <footer className="h-12 bg-white border-t border-gray-100 flex items-center justify-between px-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
           <div>2026 © Appzeto.</div>
           <div>Design & Develop by Appzeto</div>
           <div className="flex items-center gap-2">App version <span className="text-emerald-600 italic">2.1</span></div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
