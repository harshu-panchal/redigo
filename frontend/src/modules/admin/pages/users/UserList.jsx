import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  UserPlus, 
  Mail, 
  Phone, 
  Star, 
  History, 
  Ban,
  ShieldCheck,
  ChevronDown,
  X,
  CreditCard,
  User as UserIcon,
  Trash2,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Printer,
  Copy,
  ChevronRight,
  ArrowRight,
  UserCheck,
  Edit2,
  Lock,
  ToggleRight as ToggleIcon,
  ToggleLeft
} from 'lucide-react';

const StatusToggle = ({ status, onToggle }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onToggle(); }}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${status === 'Active' ? 'bg-emerald-500' : 'bg-gray-200'}`}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${status === 'Active' ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

import UserModal from './UserModal';

const UserList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('This Year');
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = React.useState(null);
  const [users, setUsers] = useState([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzdiZTZhYmJlOTJlYjYwMGYwMmQxNiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwibW9iaWxlIjoiOTk5OTk5OTk5OSIsInJvbGUiOiJzdXBlci1hZG1pbiIsImlhdCI6MTc3NTA0OTExNywiZXhwIjoxODA2NTg1MTE3fQ.5KJmXJwaVefWhnc97EqtArkA1z7ZOhsJwA9fbyRVPdQ';

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://taxi-a276.onrender.com/api/v1/admin/users?page=1&limit=50', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const resData = await response.json();
      if (response.ok && resData.success) {
        const mapped = (resData.data?.results || []).map(u => ({
          id: u._id,
          name: u.name || 'Anonymous',
          email: u.email || 'N/A',
          phone: u.mobile || 'N/A',
          rides: 0,
          rating: 0.0,
          wallet: `₹${u.wallet_balance || 0}`,
          status: u.active ? 'Active' : 'Suspended',
          joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'
        }));
        setUsers(mapped);
      } else {
        setError(resData.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  // Hook 1: Data Fetching
  React.useEffect(() => {
    fetchUsers();
  }, []);

  // Hook 2: Menu Closing
  useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  // Logic & Handlers
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? false : true;
      const response = await fetch(`https://taxi-a276.onrender.com/api/v1/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ active: newStatus })
      });
      if (response.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus ? 'Active' : 'Suspended' } : u));
      }
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this passenger? This action cannot be undone.')) {
      try {
        const response = await fetch(`https://taxi-a276.onrender.com/api/v1/admin/users/${userId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          setUsers(users.filter(u => u.id !== userId));
        }
      } catch (err) {
        console.error('Failed to delete user', err);
      }
    }
  };

  const handleModalSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const url = editingUser 
        ? `https://taxi-a276.onrender.com/api/v1/admin/users/${editingUser.id}`
        : 'https://taxi-a276.onrender.com/api/v1/admin/users';
      
      const method = editingUser ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setIsModalOpen(false);
        fetchUsers(); // Refresh list
      } else {
        alert(resData.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Error submitting form', err);
      alert('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredUsers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredUsers.map(u => u.id));
    }
  };

  const toggleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rideId => rideId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleMenu = (e, userId) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  // Conditional Return after Hooks
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
         <div className="w-10 h-10 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
         <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Fetching Passengers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1 animate-in fade-in duration-700 relative text-gray-950 font-sans">
      <div className="flex items-start justify-between">
         <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Passengers</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950">Overview</span>
               <ChevronRight size={14} />
               <span>All Customers</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-200 text-gray-950 px-5 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
               <Download size={16} className="text-gray-400" /> Export
            </button>
            <button 
              onClick={handleAddUser}
              className="bg-black text-white px-5 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
            >
               <UserPlus size={16} /> New User
            </button>
         </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1 bg-black text-white text-[12px] font-bold rounded-lg cursor-pointer">All Users</div>
         </div>
         <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
               type="text" 
               placeholder="Search customers..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-bold focus:ring-2 focus:ring-gray-100 outline-none transition-all"
            />
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
         <div className="xl:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-visible">
               <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b border-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                           <th className="px-6 py-5">
                              <div 
                                onClick={toggleSelectAll}
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${selectedRows.length === filteredUsers.length && filteredUsers.length > 0 ? 'bg-black border-black text-white' : 'border-gray-200 hover:border-gray-300'}`}
                              >
                                 {selectedRows.length === filteredUsers.length && filteredUsers.length > 0 && <CheckCircle2 size={12} />}
                              </div>
                           </th>
                           <th className="px-4 py-5 font-bold">User</th>
                           <th className="px-4 py-5 font-bold text-center">Status Toggle</th>
                           <th className="px-4 py-5 font-bold">Rating</th>
                           <th className="px-4 py-5 font-bold">Wallet</th>
                           <th className="px-4 py-5 font-bold">Joined</th>
                           <th className="px-6 py-5 text-right font-bold"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {filteredUsers.map((user) => (
                           <tr key={user.id} className={`group hover:bg-gray-50/50 transition-all ${selectedRows.includes(user.id) ? 'bg-gray-50/80 shadow-inner' : ''}`}>
                              <td className="px-6 py-4">
                                 <div 
                                   onClick={(e) => { e.stopPropagation(); toggleRowSelect(user.id); }}
                                   className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${selectedRows.includes(user.id) ? 'bg-black border-black text-white' : 'border-gray-100 group-hover:border-gray-300'}`}
                                 >
                                    {selectedRows.includes(user.id) && <CheckCircle2 size={12} />}
                                 </div>
                              </td>
                              <td className="px-4 py-4">
                                 <div className="flex items-center gap-3 font-sans">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 text-gray-900 font-bold text-[13px] flex items-center justify-center shadow-sm">
                                       {user.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                       <p className="text-[14px] font-black text-gray-900 tracking-tight leading-none">{user.name}</p>
                                       <p className="text-[12px] text-gray-400 mt-1.5 font-bold">{user.email}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-4 py-4 text-center">
                                 <StatusToggle status={user.status} onToggle={() => handleToggleStatus(user.id, user.status)} />
                              </td>
                              <td className="px-4 py-4">
                                 <div className="flex items-center gap-1 text-[13px] font-black text-gray-900">
                                    {user.rating} <Star size={12} className="fill-gray-950 text-gray-950" />
                                 </div>
                              </td>
                              <td className="px-4 py-4">
                                 <p className="text-[13px] font-black text-gray-950 tracking-tighter">{user.wallet}</p>
                              </td>
                              <td className="px-4 py-4">
                                 <p className="text-[12px] font-black text-gray-400 border border-gray-100 rounded-lg px-2 py-1 w-fit uppercase tracking-tighter">{user.joined}</p>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <div className="relative">
                                    <button 
                                      onClick={(e) => toggleMenu(e, user.id)}
                                      className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
                                    >
                                       <MoreHorizontal size={18} />
                                    </button>
                                    {activeMenu === user.id && (
                                       <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                          <button 
                                            onClick={() => navigate(`/admin/users/${user.id}`)}
                                            className="w-full text-left px-4 py-2.5 text-[12px] font-black text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                             <UserCheck size={14} className="text-emerald-500" /> View Profile
                                          </button>
                                          <button 
                                            onClick={() => handleEditUser(user)}
                                            className="w-full text-left px-4 py-2.5 text-[12px] font-black text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                             <Edit2 size={14} className="text-blue-500" /> Edit Profile
                                          </button>
                                          <button 
                                            onClick={() => handleEditUser(user)}
                                            className="w-full text-left px-4 py-2.5 text-[12px] font-black text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                             <Lock size={14} className="text-amber-500" /> Update Password
                                          </button>
                                          <div className="h-px bg-gray-50 my-1.5 mx-2"></div>
                                          <button 
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="w-full text-left px-4 py-2.5 text-[12px] font-black text-rose-600 hover:bg-rose-50 flex items-center gap-3">
                                             <Trash2 size={14} /> Delete User
                                          </button>
                                       </div>
                                    )}
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden">
               <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-8 px-1">User Stats Summary</h4>
               
               <div className="flex flex-col items-center mb-10">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                     <svg className="w-full h-full -rotate-90 scale-110">
                        <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-50" />
                        <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="402" strokeDashoffset="44" className="text-emerald-500 transition-all duration-1000" />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-3xl font-black text-gray-950 leading-none">89%</p>
                        <p className="text-[10px] font-black text-gray-400 mt-2 uppercase tracking-widest">Active</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-5">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[13px] font-bold text-gray-500">Active users</span>
                     </div>
                     <span className="text-[13px] font-black text-gray-950">1.24k</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                        <span className="text-[13px] font-bold text-gray-500">Blocked users</span>
                     </div>
                     <span className="text-[13px] font-black text-gray-950">42</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                     <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                        <span className="text-[13px] font-bold text-gray-500">New this week</span>
                     </div>
                     <span className="text-[13px] font-black text-gray-950">128</span>
                  </div>
               </div>

               <div className="mt-10 grid grid-cols-2 gap-8">
                  <div>
                     <p className="text-2xl font-black text-gray-950 tracking-tighter">4.8k</p>
                     <p className="text-[9px] font-black text-gray-400 uppercase mt-2 tracking-widest leading-none">Total Rides</p>
                  </div>
                  <div>
                     <p className="text-2xl font-black text-rose-500 tracking-tighter">12%</p>
                     <p className="text-[9px] font-black text-gray-400 uppercase mt-2 tracking-widest leading-none">Churn Rate</p>
                  </div>
               </div>
            </div>

            <div className="bg-gray-950 p-8 rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-20"><ArrowUpRight size={100} strokeWidth={1} /></div>
               <div className="relative z-10">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 px-1">Wallet Balance Pool</p>
                  <p className="text-4xl font-black mb-1 tracking-tighter">₹8,42,010</p>
                  <p className="text-[12px] font-bold text-emerald-400 flex items-center gap-2 mt-4">
                     <ArrowUpRight size={16} /> +24.8% <span className="text-gray-500">from last month</span>
                  </p>
                  <button className="w-full mt-12 py-4 bg-white text-gray-950 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all hover:bg-gray-100 shadow-xl">
                     View Ledger
                  </button>
               </div>
            </div>
         </div>
      </div>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleModalSubmit}
        editingUser={editingUser}
        isLoading={isSubmitting}
      />

      {selectedRows.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-950 text-white px-8 py-4 rounded-[28px] shadow-2xl flex items-center gap-8 animate-in slide-in-from-bottom-10 duration-500 z-[100] border border-white/10 min-w-[500px]">
           <div className="flex items-center gap-3 pr-8 border-r border-white/20">
              <button 
                onClick={() => setSelectedRows([])}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                 <X size={16} />
              </button>
              <p className="text-[14px] font-black tracking-tight leading-none">
                 {selectedRows.length} <span className="text-gray-500 uppercase text-[10px] font-black ml-2 tracking-widest">Selected</span>
              </p>
           </div>
           
           <div className="flex items-center gap-8">
              <button className="flex items-center gap-2 text-[12px] font-black hover:text-indigo-400 transition-colors cursor-pointer uppercase tracking-widest">
                 <Printer size={16} className="text-gray-500" /> Print
              </button>
              <button className="flex items-center gap-2 text-[12px] font-black hover:text-indigo-400 transition-colors cursor-pointer uppercase tracking-widest">
                 <Copy size={16} className="text-gray-500" /> Duplicate
              </button>
              <button className="flex items-center gap-2 text-[12px] font-black hover:text-indigo-400 transition-colors cursor-pointer uppercase tracking-widest">
                 <Download size={16} className="text-gray-500" /> Export
              </button>
              <button className="p-2 text-gray-500 hover:text-white transition-colors ml-4">
                 <MoreHorizontal size={18} />
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
