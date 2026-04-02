import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Search, ShieldCheck, AlertTriangle,
  Phone, MessageCircle, Star, Shield,
  CheckCircle2, MapPin, Navigation,
} from 'lucide-react';

// ---------- constants ----------
const generateOTP = () => String(Math.floor(1000 + Math.random() * 9000));

const MOCK_DRIVERS = [
  { name: 'Kishan Kumawat', rating: '4.9', vehicle: 'Grey Honda Shine', plate: 'MP09 CL 5308', phone: '+919876543210', eta: 2 },
  { name: 'Rajesh Patel',   rating: '4.7', vehicle: 'Black Royal Enfield', plate: 'MP09 AB 1234', phone: '+919876543211', eta: 3 },
  { name: 'Sunil Sharma',   rating: '4.8', vehicle: 'Blue Activa 6G',   plate: 'MP09 CD 9876', phone: '+919876543212', eta: 2 },
];

// Flow stages
// 'searching'  → finding a captain
// 'assigned'   → captain assigned, showing details, cancel visible, OTP hidden
// 'accepted'   → captain accepted ride, OTP revealed, cancel hidden
// 'completing' → ride ending animation
const STAGES = { SEARCHING: 'searching', ASSIGNED: 'assigned', ACCEPTED: 'accepted', COMPLETING: 'completing' };

// ---------- component ----------
const SearchingDriver = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const routeState = location.state || {};

  const [stage, setStage] = useState(STAGES.SEARCHING);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [otp]    = useState(generateOTP);
  const [driver] = useState(() => MOCK_DRIVERS[Math.floor(Math.random() * MOCK_DRIVERS.length)]);

  const timerRef = useRef(null);

  useEffect(() => {
    // Stage 1 → 2: after 5 s captain "found"
    timerRef.current = setTimeout(() => {
      setStage(STAGES.ASSIGNED);

      // Stage 2 → 3: after another 5 s captain "accepts"
      timerRef.current = setTimeout(() => {
        setStage(STAGES.ACCEPTED);

        // Stage 3 → 4: after another 5 s ride "completed"
        timerRef.current = setTimeout(() => {
          setStage(STAGES.COMPLETING);
          setTimeout(() => {
            navigate('/ride/complete', {
              state: {
                ...routeState,
                otp,
                driver,
                fare: routeState.fare || (routeState.vehicle?.price) || 22,
                paymentMethod: routeState.paymentMethod || 'Cash',
              },
            });
          }, 800);
        }, 5000);
      }, 5000);
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, []);

  const handleCancelSearch = () => {
    clearTimeout(timerRef.current);
    navigate('/');
  };

  const isSearching = stage === STAGES.SEARCHING;
  const isAssigned  = stage === STAGES.ASSIGNED;
  const isAccepted  = stage === STAGES.ACCEPTED || stage === STAGES.COMPLETING;

  return (
    <div className="min-h-screen bg-gray-100 max-w-lg mx-auto relative font-sans overflow-hidden">

      {/* Blurred Map Background */}
      <div className="absolute inset-0 z-0 scale-110">
        <img src="/map image.avif" className="w-full h-full object-cover blur-[2px] opacity-70" alt="Map View" />
      </div>

      {/* ── SEARCHING ANIMATION (visible only while searching) ── */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            key="pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#E85D04]/20 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E85D04]/10 rounded-full"
              />
              <div className="relative w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center p-4 border-4 border-[#E85D04]/10">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}>
                  <Search size={32} className="text-[#E85D04]" strokeWidth={3} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close / Cancel button (only while searching) */}
      {isSearching && (
        <div className="absolute top-8 right-6 z-20">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowCancelConfirm(true)}
            className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center border border-gray-100"
          >
            <X size={20} className="text-gray-900" strokeWidth={3} />
          </motion.button>
        </div>
      )}

      {/* Route Summary Pill */}
      <div className={`absolute top-8 z-20 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-white max-w-[65%] ${isSearching ? 'left-6' : 'left-6 right-6 max-w-none'}`}>
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Route</p>
        <p className="text-[13px] font-black text-gray-900 leading-tight line-clamp-1">
          {routeState.pickup || 'Pickup'} → {routeState.drop || 'Drop'}
        </p>
        {routeState.stops?.length > 0 && (
          <p className="text-[11px] font-bold text-blue-500 mt-0.5 line-clamp-1">
            Via {routeState.stops.join(' · ')}
          </p>
        )}
      </div>

      {/* ── BOTTOM CARD ── */}
      <div className="absolute bottom-10 left-5 right-5 z-20">
        <AnimatePresence mode="wait">

          {/* ---- SEARCHING CARD ---- */}
          {isSearching && (
            <motion.div
              key="searching-card"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="bg-white rounded-[32px] p-6 shadow-2xl space-y-5 border border-gray-50"
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-[22px] font-black text-gray-900 tracking-tight">Finding your captain...</h1>
                <p className="text-[14px] font-bold text-gray-400 capitalize">Connecting with drivers nearby</p>
              </div>

              <div className="flex justify-center">
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((dot) => (
                    <motion.div
                      key={dot}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: dot * 0.2 }}
                      className="w-2.5 h-2.5 bg-[#E85D04] rounded-full"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 py-2 border-y border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-200" />
                  <span className="text-[12px] font-black text-gray-800 uppercase tracking-widest leading-none">High Chance</span>
                </div>
                <div className="w-[1.5px] h-4 bg-gray-100" />
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-blue-500" />
                  <span className="text-[12px] font-black text-gray-800 uppercase tracking-widest leading-none">Safety Verified</span>
                </div>
              </div>

              <button
                onClick={() => setShowCancelConfirm(true)}
                className="w-full py-4 text-[14px] font-black text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest"
              >
                Cancel My Search
              </button>
            </motion.div>
          )}

          {/* ---- CAPTAIN ASSIGNED CARD (cancel visible, OTP hidden) ---- */}
          {isAssigned && (
            <motion.div
              key="assigned-card"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="bg-white rounded-[32px] shadow-2xl border border-gray-50 overflow-hidden"
            >
              {/* Green banner */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3 flex items-center gap-3">
                <CheckCircle2 size={20} className="text-white" strokeWidth={3} />
                <div>
                  <p className="text-white font-black text-[14px] leading-tight">Captain Found!</p>
                  <p className="text-green-100 text-[11px] font-bold">Waiting for captain to accept your ride</p>
                </div>
                <div className="ml-auto flex gap-1.5">
                  {[1,2,3].map(d => (
                    <motion.div key={d} animate={{ opacity:[0.3,1,0.3] }} transition={{ repeat:Infinity, duration:1.2, delay: d*0.25 }}
                      className="w-2 h-2 rounded-full bg-white/70"
                    />
                  ))}
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Driver Info */}
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div className="w-[68px] h-[68px] rounded-[24px] bg-white overflow-hidden border border-gray-100 p-1 shadow-md">
                      <img
                        src={`https://ui-avatars.com/api/?name=${driver.name.replace(' ', '+')}&background=f0f0f0&color=000`}
                        className="w-full h-full rounded-[18px] object-cover"
                        alt="Driver"
                      />
                    </div>
                    <div className="absolute -bottom-1.5 -right-1.5 bg-yellow-400 px-1.5 py-1 rounded-xl border-2 border-white flex items-center gap-1 shadow-lg">
                      <Star size={10} className="text-black fill-black" />
                      <span className="text-[9px] font-black text-black leading-none">{driver.rating}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[19px] font-black text-gray-900 leading-tight">{driver.name}</h3>
                    <p className="text-[13px] font-bold text-orange-500 mt-0.5 animate-pulse">Arriving in {driver.eta} mins</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-[13px] font-black text-gray-700">{driver.plate}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">· {driver.vehicle}</span>
                    </div>
                  </div>
                </div>

                {/* Actions row */}
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(`tel:${driver.phone}`)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 rounded-2xl py-3 text-sm font-black text-gray-900 border border-gray-100 active:scale-95 transition-all"
                  >
                    <Phone size={18} />
                    <span>Call</span>
                  </button>
                  <button
                    onClick={() => navigate('/ride/chat', { state: { driver } })}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 rounded-2xl py-3 text-sm font-black text-gray-900 border border-gray-100 active:scale-95 transition-all"
                  >
                    <MessageCircle size={18} />
                    <span>Chat</span>
                  </button>
                  <button
                    onClick={() => navigate('/support')}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 rounded-2xl py-3 text-sm font-black text-gray-900 border border-gray-100 active:scale-95 transition-all"
                  >
                    <Shield size={18} />
                    <span>Safety</span>
                  </button>
                </div>

                {/* OTP placeholder (hidden) */}
                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">🔒</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">OTP</p>
                    <p className="text-[13px] font-bold text-gray-400">Shown after captain accepts ride</p>
                  </div>
                </div>

                {/* Cancel button (visible here) */}
                <button
                  onClick={() => setShowCancelConfirm(true)}
                  className="w-full py-3.5 text-[13px] font-black text-red-400 hover:text-red-600 transition-colors uppercase tracking-widest border border-red-50 rounded-2xl hover:bg-red-50"
                >
                  Cancel Ride
                </button>
              </div>
            </motion.div>
          )}

          {/* ---- RIDE ACCEPTED CARD (OTP visible, cancel hidden) ---- */}
          {isAccepted && (
            <motion.div
              key="accepted-card"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="bg-white rounded-[32px] shadow-2xl border border-gray-50 overflow-hidden"
            >
              {/* Orange "Ride Accepted" banner */}
              <div className="bg-gradient-to-r from-[#E85D04] to-orange-500 px-5 py-3 flex items-center gap-3">
                <Navigation size={18} className="text-white" strokeWidth={3} />
                <div>
                  <p className="text-white font-black text-[14px] leading-tight">Ride Accepted!</p>
                  <p className="text-orange-100 text-[11px] font-bold">Your captain is on the way</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Driver Info */}
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div className="w-[68px] h-[68px] rounded-[24px] bg-white overflow-hidden border border-gray-100 p-1 shadow-md">
                      <img
                        src={`https://ui-avatars.com/api/?name=${driver.name.replace(' ', '+')}&background=f0f0f0&color=000`}
                        className="w-full h-full rounded-[18px] object-cover"
                        alt="Driver"
                      />
                    </div>
                    <div className="absolute -bottom-1.5 -right-1.5 bg-yellow-400 px-1.5 py-1 rounded-xl border-2 border-white flex items-center gap-1 shadow-lg">
                      <Star size={10} className="text-black fill-black" />
                      <span className="text-[9px] font-black text-black leading-none">{driver.rating}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[19px] font-black text-gray-900 leading-tight">{driver.name}</h3>
                    <p className="text-[13px] font-bold text-orange-500 mt-0.5 animate-pulse">Arriving in {driver.eta} mins</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-[13px] font-black text-gray-700">{driver.plate}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">· {driver.vehicle}</span>
                    </div>
                  </div>
                </div>

                {/* Actions row */}
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(`tel:${driver.phone}`)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 rounded-2xl py-3 text-sm font-black text-gray-900 border border-gray-100 active:scale-95 transition-all"
                  >
                    <Phone size={18} />
                    <span>Call</span>
                  </button>
                  <button
                    onClick={() => navigate('/ride/chat', { state: { driver } })}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 rounded-2xl py-3 text-sm font-black text-gray-900 border border-gray-100 active:scale-95 transition-all"
                  >
                    <MessageCircle size={18} />
                    <span>Chat</span>
                  </button>
                  <button
                    onClick={() => navigate('/support')}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 rounded-2xl py-3 text-sm font-black text-gray-900 border border-gray-100 active:scale-95 transition-all"
                  >
                    <Shield size={18} />
                    <span>Safety</span>
                  </button>
                </div>

                {/* OTP — now REVEALED */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl px-5 py-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Share OTP with Captain</p>
                    <p className="text-[11px] font-bold text-gray-400 mt-0.5">To start your ride</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {otp.split('').map((digit, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="w-10 h-12 bg-white rounded-xl border-2 border-orange-200 flex items-center justify-center shadow-sm"
                      >
                        <span className="text-[22px] font-black text-gray-900 tracking-tight">{digit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* NO cancel button here */}
                <div className="flex items-center justify-center gap-2 py-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Ride in Progress</span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancelConfirm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] max-w-lg mx-auto"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-sm bg-white rounded-[40px] p-8 z-[101] shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-5">
                <AlertTriangle size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Cancel ride?</h3>
              <p className="text-[14px] font-bold text-gray-400 mb-8 leading-relaxed">
                {isAssigned
                  ? 'A captain has been assigned. Are you sure you want to cancel?'
                  : "We're still looking for a driver nearby. Are you sure you want to stop?"}
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleCancelSearch}
                  className="w-full bg-[#1C2833] text-white py-4 rounded-full text-sm font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="w-full bg-white text-gray-400 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:text-gray-900 active:scale-95 transition-all"
                >
                  {isSearching ? 'Keep Searching' : 'Go Back'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchingDriver;
