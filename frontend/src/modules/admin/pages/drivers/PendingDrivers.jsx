import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronRight, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal,
  Download,
  Filter,
  ArrowLeft,
  ArrowRight,
  UserCheck,
  FileText,
  AlertCircle,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PendingDrivers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDrivers, setPendingDrivers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPendingDrivers = async () => {
      setIsLoading(true);
      try {
        // Valid token provided by user
        const providedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzdiZTZhYmJlOTJlYjYwMGYwMmQxNiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwibW9iaWxlIjoiOTk5OTk5OTk5OSIsInJvbGUiOiJzdXBlci1hZG1pbiIsImlhdCI6MTc3NTA0OTExNywiZXhwIjoxODA2NTg1MTE3fQ.5KJmXJwaVefWhnc97EqtArkA1z7ZOhsJwA9fbyRVPdQ';
        const storedToken = localStorage.getItem('adminToken');
        
        // Use provided token if stored is missing or invalid
        const token = (storedToken && storedToken !== 'undefined' && storedToken !== 'null') ? storedToken : providedToken;
        
        const response = await fetch('https://taxi-a276.onrender.com/api/v1/admin/drivers?page=1&limit=50', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const responseData = await response.json();
        if (response.ok && responseData.success) {
          const driversList = responseData.data?.results || [];
          
          // Filter for pending status (Adjusting based on approve status)
          const pending = driversList.filter(d => 
            d.approve === false || d.status === 'Pending' || d.status === 'In-Review'
          ).map(d => ({
            id: d._id,
            name: d.name || d.user_id?.name || 'Unknown',
            location: d.city || d.service_location?.name || (d.service_location_id ? `ID: ${d.service_location_id.substring(0, 8)}...` : 'All City'),
            phone: d.mobile || d.user_id?.mobile || 'N/A',
            transport: d.transport_type || 'N/A',
            docs: d.approve === false ? 'Pending Review' : 'Verified',
            status: d.approve ? 'Approved' : 'Pending', 
            reason: d.rejectionReason || '-',
            rating: d.rating || '0.0',
            registeredAt: d.createdAt ? new Date(d.createdAt).toLocaleString() : 'N/A'
          }));
          
          setPendingDrivers(pending);
        } else {
          setError(responseData.message || 'Failed to fetch pending drivers');
        }
      } catch (err) {
        console.error('Error fetching pending drivers:', err);
        setError('Network error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingDrivers();
  }, []);

  const filteredDrivers = pendingDrivers.filter(driver => 
    (driver.name && driver.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (driver.phone && driver.phone.includes(searchTerm)) ||
    (driver.location && driver.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 p-1 animate-in fade-in duration-700 font-sans text-gray-950">
      {/* HEADER */}
      <div className="flex items-start justify-between">
         <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Pending Drivers</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950 uppercase tracking-widest">Driver Mgmt</span>
               <ChevronRight size={14} />
               <span className="uppercase tracking-widest">Pending Drivers</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-200 text-gray-950 px-5 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
               <Download size={16} className="text-gray-400" /> Export List
            </button>
         </div>
      </div>

      {/* CONTROLS */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3 text-[13px] font-black uppercase tracking-widest text-gray-400">
            Show 
            <select 
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
              className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-gray-950 focus:outline-none focus:border-indigo-200 transition-all cursor-pointer shadow-inner"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            entries
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
               type="text" 
               placeholder="Search by name, location or phone..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-[20px] text-[13px] font-bold focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all shadow-inner"
            />
          </div>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50 text-[11px] font-black text-gray-400 uppercase tracking-[0.1em]">
                <th className="px-6 py-6 min-w-[200px]">Name</th>
                <th className="px-4 py-6">Service Location</th>
                <th className="px-4 py-6">Mobile Number</th>
                <th className="px-4 py-6">Transport Type</th>
                <th className="px-4 py-6">Document View</th>
                <th className="px-4 py-6 text-center">Approved Status</th>
                <th className="px-4 py-6 text-center">Declined Reason</th>
                <th className="px-4 py-6 text-center">Rating</th>
                <th className="px-4 py-6">Registered at</th>
                <th className="px-6 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan="10" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-indigo-50 border-t-indigo-500 rounded-full animate-spin"></div>
                      <p className="text-[14px] font-black text-gray-400 uppercase tracking-widest">Loading...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredDrivers.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-30">
                      <AlertCircle size={48} strokeWidth={1.5} />
                      <p className="text-[16px] font-black uppercase tracking-widest text-gray-950">No Data Found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="group hover:bg-indigo-50/20 transition-all duration-300">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-50 to-indigo-100 flex items-center justify-center font-black text-indigo-600 text-[13px] border border-indigo-200/50 shadow-sm group-hover:scale-110 transition-transform">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-[14px] font-black text-gray-950 leading-none">{driver.name}</p>
                          <p className="text-[10px] font-black text-indigo-500 mt-1.5 uppercase tracking-widest opacity-50">{driver.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-gray-600">
                         <span className="text-gray-950 font-black tracking-tight">{driver.location.includes(',') ? driver.location.split(',')[0] : driver.location}</span>
                         {driver.location.includes(',') && (
                           <>
                             <span className="text-gray-300">·</span>
                             <span className="text-[11px] uppercase">{driver.location.split(',')[1]}</span>
                           </>
                         )}
                      </div>
                    </td>
                    <td className="px-4 py-5 text-[13px] font-black text-gray-950">
                      {driver.phone}
                    </td>
                    <td className="px-4 py-5">
                      <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-black text-gray-600 uppercase tracking-widest">
                        {driver.transport}
                      </span>
                    </td>
                    <td className="px-4 py-5">
                      <button className="flex items-center gap-2 text-[11px] font-black text-indigo-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                        <FileText size={14} /> {driver.docs}
                      </button>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        driver.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-center text-[12px] font-bold text-gray-400 italic">
                      {driver.reason}
                    </td>
                    <td className="px-4 py-5 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100">
                         <Star size={12} className={driver.rating > 0 ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
                         <span className="text-[12px] font-black text-gray-950">{driver.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 whitespace-nowrap">
                       <p className="text-[12px] font-black text-gray-950 leading-none">{driver.registeredAt.split(',')[0]}</p>
                       <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase leading-none">{driver.registeredAt.split(',')[1]}</p>
                    </td>
                    <td className="px-6 py-5 text-right">
                       <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => navigate(`/admin/drivers/audit/${driver.id}`)}
                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                            title="Audit Documents"
                          >
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Approve">
                            <CheckCircle2 size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Reject">
                            <XCircle size={16} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION / FOOTER */}
      <div className="flex items-center justify-between p-2">
         <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
            Showing <span className="text-gray-950">1</span> to <span className="text-gray-950">{filteredDrivers.length}</span> of <span className="text-gray-950">{filteredDrivers.length}</span> entries
         </p>
         <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[11px] font-black text-gray-400 hover:text-gray-950 transition-all uppercase tracking-widest disabled:opacity-30" disabled>
               Prev
            </button>
            <div className="flex items-center gap-1">
               <button className="w-10 h-10 bg-indigo-600 text-white rounded-xl text-[13px] font-black shadow-lg shadow-indigo-200">1</button>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[11px] font-black text-gray-400 hover:text-gray-950 transition-all uppercase tracking-widest disabled:opacity-30" disabled>
               Next
            </button>
         </div>
      </div>

      {/* POLICY BOX */}
      <div className="bg-indigo-950 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 translate-x-4">
            <UserCheck size={120} strokeWidth={1} />
         </div>
         <div className="relative z-10 max-w-2xl">
            <h4 className="text-[16px] font-black uppercase tracking-[0.15em] mb-3">Verification Compliance</h4>
            <p className="text-[13px] font-bold text-indigo-200/80 leading-relaxed italic">
               "Drivers appearing in this list have submitted their basic profile and selected locations. System automated checks for document clarity are in progress. Manual audit is mandatory for Final Approval."
            </p>
         </div>
      </div>

    </div>
  );
};

export default PendingDrivers;
