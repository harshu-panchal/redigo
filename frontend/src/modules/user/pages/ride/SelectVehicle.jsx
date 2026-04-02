import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, ChevronRight, X, Banknote, CreditCard, ChevronDown } from 'lucide-react';

const VehicleItem = ({ icon, name, capacity, badge, sublabel, eta, dropTime, price, isSelected, onClick }) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`p-4 border-b border-gray-50 flex items-center gap-4 cursor-pointer relative transition-all ${
      isSelected ? 'bg-blue-50/10 border-2 border-[#1E88E5] rounded-[24px] shadow-sm my-2 mx-1' : 'bg-white'
    }`}
  >
    <div className="w-[70px] h-[70px] shrink-0 p-1 flex items-center justify-center bg-gray-50/50 rounded-2xl">
      <img src={icon} alt={name} className="w-full h-full object-contain drop-shadow-sm" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 flex-wrap">
        <h4 className="text-[17px] font-black text-gray-900 leading-tight">{name}</h4>
        <div className="flex items-center gap-0.5 text-gray-400">
          <User size={13} strokeWidth={3} />
          <span className="text-[12px] font-black">{capacity}</span>
        </div>
        {badge && (
          <span className="bg-[#E0F2F1] text-[#00796B] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest leading-none">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-1">
        <p className="text-[13px] font-bold text-gray-800 leading-tight">{sublabel}</p>
        <p className="text-[11px] font-bold text-gray-400 mt-0.5">
           • {eta} mins away • Drop {dropTime} pm
        </p>
      </div>
    </div>
    <div className="text-right shrink-0">
      <span className="text-[18px] font-black text-gray-900 leading-tight tracking-tighter">₹{price}</span>
    </div>
  </motion.div>
);

const SelectVehicle = () => {
  const [selected, setSelected] = useState('bike');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location.state || {};
  const pickup = routeState.pickup || 'Pipaliyahana, Indore';
  const drop = routeState.drop || 'Vijay Nagar, Indore';
  const stops = routeState.stops || [];

  const vehicles = [
    { id: 'bike', icon: '/1_Bike.png', name: 'Bike', capacity: 1, badge: 'FASTEST', sublabel: 'Quick Bike rides', eta: 2, dropTime: '12:24', price: 22 },
    { id: 'economy', icon: '/4_Taxi.png', name: 'Cab Economy', capacity: 4, sublabel: 'Affordable, daily rides', eta: 2, dropTime: '12:25', price: 106 },
    { id: 'auto', icon: '/2_AutoRickshaw.png', name: 'Auto', capacity: 3, sublabel: 'Auto, daily rides', eta: 2, dropTime: '12:25', price: 40 },
    { id: 'daily', icon: '/4_Taxi.png', name: 'Cab Daily', capacity: 4, sublabel: 'Quality, daily rides', badge: 'SAVE 30%', eta: 2, dropTime: '12:25', price: 79 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 max-w-lg mx-auto relative font-sans overflow-hidden">
      {/* Map Header */}
      <div className="h-[43%] w-full relative bg-gray-200">
        <img src="/map image.avif" className="w-full h-full object-cover" alt="Map View" />
        
        <div className="absolute top-6 left-5 right-5 z-20 flex items-center gap-3">
            <button 
                onClick={() => navigate(-1)}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center shrink-0 active:scale-95 transition-all"
            >
                <ArrowLeft size={20} className="text-gray-900" strokeWidth={3} />
            </button>
            <div className="flex-1 bg-white rounded-full px-5 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.1)] flex items-center gap-3 active:scale-[0.98] transition-all cursor-pointer">
                <span className="text-[15px] font-black text-gray-800 truncate flex-1 tracking-tight">world Cup S...</span>
                <X size={18} className="text-gray-400 hover:text-gray-900 transition-colors" />
            </div>
        </div>

        {/* PROMO BANNER — dismissable */}
        {showPromo && (
          <div className="absolute bottom-6 left-5 right-5 bg-white/90 backdrop-blur-md border border-white rounded-[24px] overflow-hidden flex items-center pr-3 z-30 shadow-[0_12px_45px_rgba(0,0,0,0.08)]">
             <div className="p-4 py-3 flex-1">
                <h5 className="text-[13px] font-black leading-tight text-blue-950">Going a few kms away? <br/>Cab is meters away.</h5>
                <p className="text-[9px] font-extrabold text-blue-700 mt-1 uppercase tracking-wider">Use code GOFREE on 1st Cab ride.</p>
             </div>
             <div className="w-[85px] h-[65px] relative">
                <img src="/ride_now_banner.png" className="w-full h-full object-cover rounded-xl" alt="Promo Car" />
             </div>
             <div className="ml-3 pl-1 border-l border-gray-100 h-6 flex items-center">
                <button onClick={() => setShowPromo(false)} className="active:scale-90 transition-all">
                  <X size={14} className="text-gray-400 hover:text-gray-800 transition-colors" />
                </button>
             </div>
          </div>
        )}
      </div>

      {/* Vehicle Selection Sheet */}
      <div className="absolute bottom-0 left-0 right-0 top-[40%] bg-white rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,0,0.05)] flex flex-col z-40 overflow-hidden">
         <div className="flex-1 overflow-y-auto no-scrollbar pt-6 px-3 pb-36">
            {vehicles.map((v) => (
              <VehicleItem 
                key={v.id} 
                {...v} 
                isSelected={selected === v.id}
                onClick={() => setSelected(v.id)}
              />
            ))}
         </div>

         {/* Bottom Control Bar */}
         <div className="absolute bottom-0 left-0 right-0 bg-white p-5 border-t border-gray-50 flex flex-col gap-4 shadow-2xl">
            <div 
                className="flex items-center justify-between px-4 pb-1 group cursor-pointer active:opacity-60 transition-all"
                onClick={() => setShowPaymentModal(true)}
            >
               <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                     {paymentMethod === 'Cash' ? <Banknote size={20} strokeWidth={3} /> : <CreditCard size={20} strokeWidth={3} />}
                  </div>
                  <span className="text-[15px] font-black text-gray-950 tracking-tight">{paymentMethod}</span>
                  <ChevronDown size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
               </div>
               <ChevronRight size={20} className="text-gray-300" />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const selectedVehicleData = vehicles.find(v => v.id === selected);
                navigate('/ride/searching', {
                  state: {
                    pickup,
                    drop,
                    stops,
                    vehicle: selectedVehicleData,
                    paymentMethod,
                    fare: selectedVehicleData?.price || 22,
                  },
                });
              }}
              className="w-full bg-[#f8e001] py-5 rounded-[24px] text-[18px] font-black text-[#1C2833] shadow-lg shadow-yellow-500/10 transition-all uppercase tracking-tight active:bg-yellow-400"
            >
              Book {selected === 'bike' ? 'Bike' : selected === 'auto' ? 'Auto' : 'Cab'}
            </motion.button>
         </div>
      </div>

      {/* PAYMENT SELECTION MODAL */}
      <AnimatePresence>
        {showPaymentModal && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowPaymentModal(false)}
               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] max-w-lg mx-auto"
            />
            <motion.div 
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               exit={{ y: "100%" }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white rounded-t-[40px] p-6 z-[101] shadow-2xl pb-10"
            >
               <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6"></div>
               <h3 className="text-xl font-black text-gray-900 mb-6 text-center">Select Payment Method</h3>
               
               <div className="space-y-3">
                  <div 
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'Cash' ? 'border-[#E85D04] bg-orange-50/50' : 'border-gray-50 bg-gray-50/30'}`}
                    onClick={() => { setPaymentMethod('Cash'); setShowPaymentModal(false); }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                        <Banknote size={24} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                        <p className="font-black text-gray-900 text-lg">Cash</p>
                        <p className="text-xs font-bold text-gray-400">Pay after ride</p>
                    </div>
                    {paymentMethod === 'Cash' && <div className="w-6 h-6 rounded-full bg-[#E85D04] flex items-center justify-center text-white"><X size={14} className="rotate-45" strokeWidth={3} /></div>}
                  </div>

                  <div 
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'Online Payment' ? 'border-[#E85D04] bg-orange-50/50' : 'border-gray-50 bg-gray-50/30'}`}
                    onClick={() => { setPaymentMethod('Online Payment'); setShowPaymentModal(false); }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                        <CreditCard size={24} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                        <p className="font-black text-gray-900 text-lg">Online Payment</p>
                        <p className="text-xs font-bold text-gray-400">UPI, Cards or Wallets</p>
                    </div>
                    {paymentMethod === 'Online Payment' && <div className="w-6 h-6 rounded-full bg-[#E85D04] flex items-center justify-center text-white"><X size={14} className="rotate-45" strokeWidth={3} /></div>}
                  </div>
               </div>

               <button 
                onClick={() => setShowPaymentModal(false)}
                className="w-full mt-8 py-4 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
               >
                Close
               </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectVehicle;
