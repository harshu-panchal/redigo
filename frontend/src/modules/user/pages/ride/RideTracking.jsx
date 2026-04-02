import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, AlertTriangle, Shield, Star, ChevronLeft, X, Share2 } from 'lucide-react';

const RideTracking = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  // Pull data passed from SearchingDriver
  const otp = state.otp || '1234';
  const fare = state.fare || 22;
  const paymentMethod = state.paymentMethod || 'Cash';
  const driver = state.driver || {
    name: 'Kishan Kumawat',
    rating: '4.9',
    vehicle: 'Grey Honda Shine',
    plate: 'MP09 CL 5308',
    phone: '+919876543210',
    eta: 2,
  };
  const pickupLocation = state.pickup || 'Pipaliyahana, Indore';
  const dropLocation = state.drop || 'Vijay Nagar, Indore';

  const handleCall = () => {
    window.open(`tel:${driver.phone}`);
  };

  const handleShare = () => {
    const shareText = `I'm riding with Redigo!\nDriver: ${driver.name} (${driver.plate})\nFrom: ${pickupLocation}\nTo: ${dropLocation}\nTrack me live on Redigo.`;
    if (navigator.share) {
      navigator.share({ title: 'Track My Ride', text: shareText }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(shareText).then(() => {
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2500);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 max-w-lg mx-auto relative font-sans overflow-hidden">

      {/* Share Toast */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] bg-gray-900 text-white px-5 py-3 rounded-2xl text-sm font-black shadow-2xl whitespace-nowrap"
          >
            ✅ Ride details copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <img src="/map image.avif" className="w-full h-full object-cover grayscale-[20%] contrast-[1.1]" alt="Tracking Map" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-6 w-11 h-11 bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center border border-white z-10 active:scale-90 transition-all focus:outline-none"
        >
          <ChevronLeft size={22} className="text-gray-900" strokeWidth={3} />
        </button>
      </div>

      {/* Route Summary Pill */}
      <div className="absolute top-8 left-20 right-6 z-10 bg-white/90 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg border border-white">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{pickupLocation} → {dropLocation}</p>
      </div>

      {/* Safety Badge */}
      <div className="absolute top-24 right-6 z-10 flex items-center justify-end pointer-events-none">
        <div
          className="pointer-events-auto bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full flex items-center gap-2 shadow-2xl border border-gray-50 active:scale-95 transition-all cursor-pointer"
          onClick={() => navigate('/support')}
        >
          <Shield size={16} className="text-blue-500" strokeWidth={3} />
          <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest leading-none">Safety Toolkit</span>
        </div>
      </div>

      {/* Driver Bottom Sheet */}
      <motion.div
        animate={{ y: drawerOpen ? 0 : 350 }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,0,0.12)] z-20 flex flex-col pt-3"
      >
        <div
          className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-4 cursor-pointer"
          onClick={() => setDrawerOpen(!drawerOpen)}
        />

        <div className="px-6 pb-8 space-y-6">
          {/* Driver Info Row */}
          <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-[76px] h-[76px] rounded-[28px] bg-white overflow-hidden border border-gray-100 p-1 shadow-md"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${driver.name.replace(' ', '+')}&background=f0f0f0&color=000`}
                  className="w-full h-full rounded-[22px] object-cover"
                  alt="Driver"
                />
              </motion.div>
              <div className="absolute -bottom-1.5 -right-1.5 bg-yellow-400 p-1.5 rounded-xl border-2 border-white flex items-center gap-1 shadow-lg">
                <Star size={11} className="text-black fill-black" strokeWidth={3} />
                <span className="text-[10px] font-black text-black leading-none">{driver.rating}</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-[19px] font-black text-gray-900 leading-tight tracking-tight">{driver.name}</h3>
                  <p className="text-[14px] font-bold text-orange-600 animate-pulse mt-0.5">Arriving in {driver.eta} mins</p>
                </div>
                <div className="text-right">
                  <span className="text-[15px] font-black text-gray-900 tracking-tight block">{driver.plate}</span>
                  <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase block mt-0.5">{driver.vehicle}</span>
                </div>
              </div>
              {/* OTP Badge */}
              <div className="mt-3 flex items-center gap-2">
                <div className="bg-gray-50 border border-gray-100 rounded-full px-3 py-1 flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">OTP</span>
                  <span className="text-[15px] font-black text-primary tracking-[0.1em] border-l border-gray-200 pl-2 leading-none">{otp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Call */}
            <div
              onClick={handleCall}
              className="flex flex-col items-center gap-2.5 cursor-pointer group active:scale-95 transition-all"
            >
              <div className="w-full aspect-square bg-[#F8F9FA] rounded-[24px] flex items-center justify-center border border-gray-50 group-hover:bg-green-50 group-hover:border-green-100 transition-all shadow-sm">
                <Phone size={22} className="text-gray-900 group-hover:text-green-600 transition-colors" />
              </div>
              <span className="text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-widest leading-none">Call</span>
            </div>

            {/* Chat */}
            <div
              onClick={() => navigate('/ride/chat')}
              className="flex flex-col items-center gap-2.5 cursor-pointer group active:scale-95 transition-all"
            >
              <div className="w-full aspect-square bg-[#F8F9FA] rounded-[24px] flex items-center justify-center border border-gray-50 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all shadow-sm">
                <MessageCircle size={22} className="text-gray-900 group-hover:text-blue-500 transition-colors" />
              </div>
              <span className="text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-widest leading-none">Chat</span>
            </div>

            {/* Share Live */}
            <div
              onClick={handleShare}
              className="flex flex-col items-center gap-2.5 cursor-pointer group active:scale-95 transition-all"
            >
              <div className="w-full aspect-square bg-blue-50 rounded-[24px] flex items-center justify-center border border-blue-100 group-hover:bg-blue-100/50 transition-all shadow-sm">
                <Share2 size={20} className="text-blue-500" strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-black text-gray-400 group-hover:text-gray-800 uppercase tracking-widest truncate leading-none">Share</span>
            </div>

            {/* Help / SOS */}
            <div
              onClick={() => navigate('/support')}
              className="flex flex-col items-center gap-2.5 cursor-pointer group active:scale-95 transition-all"
            >
              <div className="w-full aspect-square bg-[#F8F9FA] rounded-[24px] flex items-center justify-center border border-gray-50 group-hover:bg-red-50 group-hover:border-red-100 transition-all shadow-sm">
                <AlertTriangle size={22} className="text-gray-900 group-hover:text-red-500 transition-colors" />
              </div>
              <span className="text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-widest leading-none">Help</span>
            </div>
          </div>

          {/* Fare + Cancel Row */}
          <div className="bg-[#F8F9FA] rounded-[32px] p-5 flex items-center justify-between border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Fare</span>
              <div className="flex items-center gap-2">
                <span className="text-[22px] font-black text-gray-900 tracking-tighter">₹{fare}.00</span>
                <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full leading-none uppercase tracking-wider">
                  {paymentMethod}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="relative z-10 bg-white border border-red-50 text-red-500 font-black text-[11px] uppercase tracking-widest px-6 py-3 rounded-full transition-all active:scale-95 hover:bg-red-50 hover:text-red-600 shadow-sm"
            >
              Cancel Ride
            </button>
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full -translate-y-12 translate-x-12" />
          </div>
        </div>
      </motion.div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] max-w-lg mx-auto"
              onClick={() => setShowCancelConfirm(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-sm bg-white rounded-[40px] p-8 z-[101] shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-6">
                <AlertTriangle size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Cancel your ride?</h3>
              <p className="text-[14px] font-bold text-gray-400 mb-8 leading-relaxed">
                Your captain is already on the way. Are you sure you want to cancel?
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-[#1C2833] text-white py-4 rounded-full text-sm font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                >
                  Yes, Cancel Ride
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="w-full bg-white text-gray-400 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:text-gray-900 active:scale-95 transition-all"
                >
                  No, Go Back
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RideTracking;
