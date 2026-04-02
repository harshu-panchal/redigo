import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  UserPlus, 
  Mail, 
  Phone, 
  Star, 
  Car, 
  FileText, 
  CheckCircle2, 
  Ban, 
  History, 
  Wallet, 
  ChevronDown, 
  ChevronRight, 
  ArrowUpRight, 
  ShieldCheck, 
  CreditCard, 
  X,
  Target
} from 'lucide-react';

const DriverStatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Offline: 'bg-gray-50 text-gray-400 border-gray-100',
    OnTrip: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    Suspended: 'bg-rose-50 text-rose-600 border-rose-100',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-black border flex items-center gap-1.5 w-fit ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-emerald-500' : status === 'OnTrip' ? 'bg-indigo-500' : status === 'Suspended' ? 'bg-rose-500' : 'bg-gray-400'}`}></span>
      {status}
    </span>
  );
};

const DriverList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrivers = async () => {
      setIsLoading(true);
      try {
        // Force use the valid token provided by user to fix 401
        const providedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzdiZTZhYmJlOTJlYjYwMGYwMmQxNiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwibW9iaWxlIjoiOTk5OTk5OTk5OSIsInJvbGUiOiJzdXBlci1hZG1pbiIsImlhdCI6MTc3NTA0OTExNywiZXhwIjoxODA2NTg1MTE3fQ.5KJmXJwaVefWhnc97EqtArkA1z7ZOhsJwA9fbyRVPdQ';
        const storedToken = localStorage.getItem('adminToken');
        
        // Priority: storedToken if valid, otherwise providedToken
        const token = (storedToken && storedToken !== 'undefined' && storedToken !== 'null') ? storedToken : providedToken;
        
        const response = await fetch('https://taxi-a276.onrender.com/api/v1/admin/drivers?page=1&limit=50', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const responseData = await response.json();
        if (response.ok && responseData.success) {
          // Mapping data.data.results based on actual API response
          const driversList = responseData.data?.results || [];
          
          // Filter for Approved drivers only
          const approved = driversList.filter(d => 
            d.approve === true || d.status === 'Active' || d.status === 'Approved'
          ).map(d => ({
            id: d._id,
            name: d.name || `${d.user_id?.name || 'Unknown'}`,
            email: d.user_id?.email || 'N/A',
            phone: d.mobile || d.user_id?.mobile || 'N/A',
            vehicle: d.transport_type || 'Not Assigned',
            plate: d.car_number || 'No Plate',
            rides: d.total_rides || 0,
            rating: d.rating || 0,
            wallet: d.wallet_balance !== undefined ? `₹${d.wallet_balance}` : '₹0',
            status: d.active ? 'Active' : 'Offline',
            joined: d.createdAt ? new Date(d.createdAt).toLocaleDateString() : 'N/A',
            serviceLocation: d.city || d.service_location?.name || 'Global'
          }));
          
          setDrivers(approved);
        } else {
          setError(responseData.message || 'Failed to fetch drivers');
        }
      } catch (err) {
        console.error('Error fetching drivers:', err);
        setError('Network error occurred while fetching drivers.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const toggleSelectAll = () => {
    if (selectedRows.length === drivers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(drivers.map(d => d.id));
    }
  };

  const toggleRowSelect = (id) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleMenu = (e, userId) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  const filteredDrivers = drivers.filter(d => 
    (d.name && d.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (d.email && d.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (d.plate && d.plate.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 p-1 animate-in fade-in duration-700 relative text-gray-950 font-sans">
      {/* HEADER */}
      <div className="flex items-start justify-between">
         <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Approved Drivers</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950">Fleet Management</span>
               <ChevronRight size={14} />
               <span>Active Operators</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-200 text-gray-950 px-5 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
               <Download size={16} className="text-gray-400" /> Export List
            </button>
            <button className="bg-black text-white px-5 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-md">
               <UserPlus size={16} /> Add New Driver
            </button>
         </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="flex flex-wrap items-center gap-2">
            <div className="px-4 py-2 bg-black text-white text-[12px] font-black rounded-xl cursor-pointer">All Operators</div>
            <div className="px-4 py-2 bg-gray-50 text-gray-500 text-[12px] font-black rounded-xl border border-gray-100 hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-2">
               Service Type <ChevronDown size={14} />
            </div>
            <div className="px-4 py-2 bg-gray-50 text-gray-500 text-[12px] font-black rounded-xl border border-gray-100 hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-2">
               Online Status <ChevronDown size={14} />
            </div>
         </div>
         <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
               type="text" 
               placeholder="Search by name, plate, or phone..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-bold focus:ring-2 focus:ring-gray-100 outline-none transition-all"
            />
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
         {/* TABLE */}
         <div className="xl:col-span-3">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-visible overflow-hidden">
               <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b border-gray-50 text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/20">
                           <th className="px-6 py-5 w-10">
                              <div 
                                onClick={toggleSelectAll}
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${selectedRows.length === drivers.length ? 'bg-black border-black text-white' : 'border-gray-200 hover:border-gray-300'}`}
                              >
                                 {selectedRows.length === drivers.length && <CheckCircle2 size={12} />}
                              </div>
                           </th>
                           <th className="px-4 py-5">Operator Detail</th>
                           <th className="px-4 py-5 text-center">Work Summary</th>
                           <th className="px-4 py-5">Service Location</th>
                           <th className="px-4 py-5">Status</th>
                           <th className="px-4 py-5 text-center">Wallet</th>
                           <th className="px-6 py-5 text-right w-10"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {isLoading && (
                          <tr>
                            <td colSpan="7" className="px-6 py-20 text-center">
                               <div className="flex flex-col items-center gap-3">
                                  <div className="w-10 h-10 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
                                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Fetching Fleet Data...</p>
                               </div>
                            </td>
                          </tr>
                        )}
                        {!isLoading && error && (
                          <tr>
                            <td colSpan="6" className="px-6 py-20 text-center">
                               <div className="flex flex-col items-center gap-3 text-rose-500">
                                  <Ban size={40} strokeWidth={1.5} />
                                  <p className="text-[13px] font-bold">{error}</p>
                                  <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-gray-950 text-white text-[11px] font-black rounded-lg">Try Again</button>
                               </div>
                            </td>
                          </tr>
                        )}
                        {!isLoading && !error && filteredDrivers.length === 0 && (
                          <tr>
                            <td colSpan="6" className="px-6 py-20 text-center">
                               <div className="flex flex-col items-center gap-3 text-gray-400">
                                  <Search size={40} strokeWidth={1.5} />
                                  <p className="text-[13px] font-bold">No drivers found matching your criteria</p>
                               </div>
                            </td>
                          </tr>
                        )}
                        {!isLoading && !error && filteredDrivers.map((driver) => (
                           <tr key={driver.id} className={`group hover:bg-gray-50/50 transition-all ${selectedRows.includes(driver.id) ? 'bg-indigo-50/30' : ''}`}>
                              <td className="px-6 py-4">
                                 <div 
                                   onClick={() => toggleRowSelect(driver.id)}
                                   className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${selectedRows.includes(driver.id) ? 'bg-black border-black text-white' : 'border-gray-100 group-hover:border-gray-300'}`}
                                 >
                                    {selectedRows.includes(driver.id) && <CheckCircle2 size={12} />}
                                 </div>
                              </td>
                              <td className="px-4 py-6">
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 text-gray-950 font-black text-[14px] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                                       {driver.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                       <p className="text-[14px] font-bold text-gray-950 tracking-tight leading-none mb-1.5">{driver.name}</p>
                                       <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400">
                                          <span className="flex items-center gap-1 text-gray-800"><Car size={12} /> {driver.vehicle}</span>
                                          <span className="uppercase tracking-widest bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">{driver.plate}</span>
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-4 py-6 text-center">
                                 <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-1.5 text-[14px] font-black text-gray-950">
                                       <Target size={14} className="text-gray-300" /> {driver.rides}
                                       <div className="w-1 h-1 rounded-full bg-gray-300 mx-1"></div>
                                       {driver.rating} <Star size={12} className="fill-orange-400 text-orange-400" />
                                    </div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5">Rides & Rating</p>
                                 </div>
                              </td>
                              <td className="px-4 py-6">
                                 <div className="flex flex-col">
                                    <p className="text-[13px] font-black text-gray-950 truncate max-w-[120px]">{driver.serviceLocation}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Region</p>
                                 </div>
                              </td>
                              <td className="px-4 py-6">
                                 <DriverStatusBadge status={driver.status} />
                              </td>
                              <td className="px-4 py-6 text-center">
                                 <p className="text-[15px] font-black text-gray-950 tracking-tight">{driver.wallet}</p>
                                 <p className="text-[10px] font-black text-emerald-500 uppercase flex items-center justify-center gap-1 mt-1"><ArrowUpRight size={10} /> POSITIVE</p>
                              </td>
                              <td className="px-6 py-6 text-right">
                                 <div className="relative">
                                    <button 
                                      onClick={(e) => toggleMenu(e, driver.id)}
                                      className="p-2.5 text-gray-400 hover:text-gray-950 hover:bg-gray-100 rounded-xl transition-all"
                                    >
                                       <MoreHorizontal size={20} />
                                    </button>
                                    {activeMenu === driver.id && (
                                       <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                                          <button className="w-full text-left px-5 py-3 text-[12px] font-black text-gray-700 hover:bg-gray-50 flex items-center gap-4 transition-colors">
                                             <FileText size={16} className="text-gray-400" /> Activity Logs
                                          </button>
                                          <button className="w-full text-left px-5 py-3 text-[12px] font-black text-gray-700 hover:bg-gray-50 flex items-center gap-4 transition-colors">
                                             <ShieldCheck size={16} className="text-emerald-500" /> Audits
                                          </button>
                                          <button className="w-full text-left px-5 py-3 text-[12px] font-black text-gray-700 hover:bg-gray-50 flex items-center gap-4 transition-colors">
                                             <CreditCard size={16} className="text-indigo-500" /> Settlements
                                          </button>
                                          <div className="h-px bg-gray-50 my-2 mx-3"></div>
                                          <button className="w-full text-left px-5 py-3 text-[12px] font-black text-rose-600 hover:bg-rose-50 flex items-center gap-4 transition-colors">
                                             <Ban size={16} /> Suspend Access
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

         {/* STATS SIDEBAR */}
         <div className="space-y-6">
            <div className="bg-white p-8 rounded-[36px] border border-gray-100 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 text-gray-950 scale-[3] -rotate-12 translate-x-1/2 translate-y-1/2"><Car size={100} strokeWidth={1} /></div>
               <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-8 relative z-10">Unit Statistics</h4>
               
               <div className="space-y-8 relative z-10">
                  <div className="flex flex-col items-center text-center">
                     <p className="text-x font-black text-gray-950 mb-1">Active Now</p>
                     <p className="text-5xl font-black text-gray-950 tracking-tighter mb-4">421</p>
                     <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg">
                        <ArrowUpRight size={14} /> +12% INCREASE
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-8">
                     <div>
                        <p className="text-xl font-black text-gray-900 leading-none">1,240</p>
                        <p className="text-[9px] font-black text-gray-400 uppercase mt-1.5 tracking-widest tracking-tighter">On-Duty Fleet</p>
                     </div>
                     <div>
                        <p className="text-xl font-black text-rose-500 leading-none">12.5%</p>
                        <p className="text-[9px] font-black text-gray-400 uppercase mt-1.5 tracking-widest tracking-tighter">Inactive Pool</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-gray-950 p-8 rounded-[36px] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-20"><Wallet size={100} strokeWidth={1} /></div>
               <div className="relative z-10">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 leading-none">Net Fleet Payout</p>
                  <p className="text-4xl font-black mb-2 tracking-tighter leading-none">₹8,42,000</p>
                  <p className="text-[12px] font-black text-emerald-400 flex items-center gap-2 mt-4 leading-none">
                     <ArrowUpRight size={16} /> +₹1.2M <span className="text-gray-500">PAID TODAY</span>
                  </p>
                  <button className="w-full mt-10 py-5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all">
                     Process Settlement
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DriverList;
