import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  FileText, 
  Edit, 
  Lock, 
  Trash2, 
  Eye,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';

const ManageOwners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [owners, setOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  React.useEffect(() => {
    const fetchOwners = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzdiZTZhYmJlOTJlYjYwMGYwMmQxNiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwibW9iaWxlIjoiOTk5OTk5OTk5OSIsInJvbGUiOiJzdXBlci1hZG1pbiIsImlhdCI6MTc3NTA0OTExNywiZXhwIjoxODA2NTg1MTE3fQ.5KJmXJwaVefWhnc97EqtArkA1z7ZOhsJwA9fbyRVPdQ';
        
        const response = await fetch('https://taxi-a276.onrender.com/api/v1/admin/owner-management/manage-owners', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const resData = await response.json();
        if (response.ok && resData.success) {
          // Map API response to Component State
          const mapped = (resData.data?.results || []).map(o => ({
            id: o._id,
            company: o.service_location_id?.name || o.name || 'Personal',
            email: o.user_id?.email || 'N/A',
            mobile: o.user_id?.mobile || 'N/A',
            status: o.approve,
            doc_status: o.approve ? 'Verified' : 'Pending'
          }));
          setOwners(mapped);
          setMeta(resData.data?.paginator);
        } else {
          setError(resData.message || 'Failed to fetch owners');
        }
      } catch (err) {
        setError('Network error. Check connection.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOwners();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
         <div className="w-10 h-10 border-4 border-gray-100 border-t-emerald-500 rounded-full animate-spin"></div>
         <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Loading Fleet Owners...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
           <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight">Manage Owners</h1>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
           <span>Manage Owners</span>
           <ChevronRight size={12} />
           <span className="text-gray-900">Manage Owners</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
         {/* Top Actions */}
         <div className="p-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <button className="p-2 bg-emerald-500 text-white rounded-lg"><Plus size={18} /></button>
               <button className="p-2 bg-gray-100 text-gray-400 rounded-lg"><Plus size={18} /></button>
               <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 ml-4">
                  <span className="text-[11px] font-bold text-gray-500">show</span>
                  <select className="bg-transparent text-[11px] font-black text-gray-900 outline-none">
                     <option>10</option>
                  </select>
                  <span className="text-[11px] font-bold text-gray-500">entries</span>
               </div>
            </div>

            <div className="flex items-center gap-3">
               <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                  <input 
                     type="text" 
                     placeholder="Search owners..." 
                     className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[12px] font-medium outline-none focus:ring-1 focus:ring-indigo-600/20 transition-all"
                  />
               </div>
               <button className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-[12px] font-black transition-all">
                  <Filter size={16} /> Filters
               </button>
               <button className="bg-[#1e2746] hover:bg-indigo-900 text-white px-5 py-2 rounded-xl text-[12px] font-black transition-all flex items-center gap-2">
                  <Plus size={16} /> Add Manage Owner
               </button>
            </div>
         </div>

         {/* Owners Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-white border-b border-gray-50">
                     <th className="px-6 py-4 text-[11px] font-black text-gray-900 uppercase tracking-widest">Company Name</th>
                     <th className="px-6 py-4 text-[11px] font-black text-gray-900 uppercase tracking-widest">Email</th>
                     <th className="px-6 py-4 text-[11px] font-black text-gray-900 uppercase tracking-widest">Mobile Number</th>
                     <th className="px-6 py-4 text-[11px] font-black text-gray-900 uppercase tracking-widest">Document View</th>
                     <th className="px-6 py-4 text-[11px] font-black text-gray-900 uppercase tracking-widest">Approval Status</th>
                     <th className="px-6 py-4 text-[11px] font-black text-gray-900 uppercase tracking-widest">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {owners.map((owner, idx) => (
                     <tr key={idx} className="hover:bg-gray-50 border-b border-gray-50 transition-colors">
                        <td className="px-6 py-4 text-[13px] font-bold text-gray-600">{owner.company || '-'}</td>
                        <td className="px-6 py-4 text-[13px] font-medium text-gray-500">{owner.email}</td>
                        <td className="px-6 py-4 text-[13px] font-medium text-gray-500">{owner.mobile}</td>
                        <td className="px-6 py-4">
                           <button className="p-2 bg-indigo-50 text-[#1e2746] rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
                              <FileText size={16} />
                           </button>
                        </td>
                        <td className="px-6 py-4">
                           <div className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked={owner.status} readOnly />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                              <button className="p-1.5 bg-amber-50 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white transition-all"><Edit size={14} /></button>
                              <button className="p-1.5 bg-indigo-50 text-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white transition-all"><Lock size={14} /></button>
                              <button className="p-1.5 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                              <button className="p-1.5 bg-sky-50 text-sky-500 rounded-lg hover:bg-sky-500 hover:text-white transition-all"><Eye size={14} /></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         <div className="p-6 flex items-center justify-between bg-gray-50/50">
            <span className="text-[12px] font-bold text-gray-400">Showing 1 to 10 of 227 entries</span>
            <div className="flex items-center gap-1">
               <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] font-black text-gray-600 hover:bg-gray-50">Prev</button>
               {[1, 2, 3, 4, 5].map(p => (
                  <button key={p} className={`w-8 h-8 rounded-lg text-[12px] font-black transition-all ${p === 1 ? 'bg-[#1e2746] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>{p}</button>
               ))}
               <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] font-black text-gray-600 hover:bg-gray-50">Next</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ManageOwners;
