import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, ChevronRight, Share2, Info, MapPin, Navigation, Receipt, Clock } from 'lucide-react';

const TIP_OPTIONS = [10, 20, 50, 100];

const RideComplete = () => {
  const [rating, setRating] = useState(0);
  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState('');
  const [showCustomTip, setShowCustomTip] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const fare = state.fare || 22;
  const paymentMethod = state.paymentMethod || 'Cash';
  const driver = state.driver || { name: 'Kishan Kumawat', vehicle: 'Grey Honda Shine', plate: 'MP09 CL 5308', rating: '4.9' };
  const pickup = state.pickup || 'Pipaliyahana, Indore';
  const drop = state.drop || 'Vijay Nagar, Indore';
  const stops = state.stops || [];
  const vehicle = state.vehicle || null;
  const otp = state.otp || '----';

  const effectiveTip = selectedTip ?? (showCustomTip ? parseInt(customTip || '0', 10) : 0);
  const totalBill = fare + effectiveTip;

  // Current time as ride end time
  const rideEndTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const rideDate    = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  // Auto-navigate to home after rating is given
  useEffect(() => {
    if (ratingSubmitted) {
      const timer = setTimeout(() => navigate('/'), 1500);
      return () => clearTimeout(timer);
    }
  }, [ratingSubmitted, navigate]);

  const handleRating = (num) => {
    setRating(num);
    setTimeout(() => setRatingSubmitted(true), 400);
  };

  const handleShare = () => {
    const stopsText = stops.length > 0 ? `\nVia: ${stops.join(' → ')}` : '';
    const receiptText = `Redigo Trip Receipt\nDate: ${rideDate} ${rideEndTime}\nRoute: ${pickup} → ${drop}${stopsText}\nFare: ₹${fare}${effectiveTip > 0 ? `\nTip: ₹${effectiveTip}` : ''}\nTotal: ₹${totalBill}\nPayment: ${paymentMethod}\nDriver: ${driver.name}\nVehicle: ${driver.vehicle || ''} (${driver.plate || ''})`;
    if (navigator.share) {
      navigator.share({ title: 'Redigo Trip Receipt', text: receiptText }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(receiptText).then(() => {
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2500);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F3F7] max-w-lg mx-auto relative font-sans">

      {/* Share Toast */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl text-sm font-black shadow-2xl whitespace-nowrap"
          >
            ✅ Receipt copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating Submitted Overlay */}
      <AnimatePresence>
        {ratingSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-white/95 z-50 flex flex-col items-center justify-center gap-4 max-w-lg mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white"
            >
              <CheckCircle2 size={40} strokeWidth={3} />
            </motion.div>
            <h2 className="text-xl font-black text-gray-900">Thanks for your feedback!</h2>
            <p className="text-sm font-bold text-gray-400">Taking you back to Home...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-5 space-y-4 pb-8">

        {/* ── SUCCESS HEADER ── */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-3 text-center pt-6 pb-2"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-200">
            <CheckCircle2 size={40} strokeWidth={3} />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none">You've Arrived!</h1>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1.5">Ride completed successfully</p>
          </div>
        </motion.div>

        {/* ── TRIP DETAILS CARD (Invoice) ── */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.07)] border border-gray-100"
        >
          {/* Invoice header */}
          <div className="bg-gradient-to-r from-[#1C2833] to-[#2C3E50] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Receipt size={20} className="text-orange-400" />
              <div>
                <p className="text-white font-black text-[15px] leading-tight">Trip Invoice</p>
                <p className="text-gray-400 text-[11px] font-bold">{rideDate} · {rideEndTime}</p>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-all px-3 py-1.5 rounded-full"
            >
              <Share2 size={14} className="text-white" />
              <span className="text-white text-[11px] font-black">Share</span>
            </button>
          </div>

          {/* Route section */}
          <div className="px-5 py-4 border-b border-gray-50">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Route</p>

            <div className="flex gap-3">
              <div className="flex flex-col items-center pt-1 gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-sm" />
                {stops.length > 0 && stops.map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="w-[1.5px] h-4 bg-dashed border-l border-dashed border-gray-200" />
                    <div className="w-3 h-3 rounded-full bg-blue-400 border-2 border-white shadow-sm" />
                  </React.Fragment>
                ))}
                <div className="w-[1.5px] h-4 border-l border-dashed border-gray-200" />
                <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-white shadow-sm" />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-[14px] font-black text-gray-900 leading-tight">{pickup}</p>
                  <p className="text-[11px] font-bold text-gray-400">Pickup</p>
                </div>
                {stops.map((s, i) => (
                  <div key={i} className="pt-1">
                    <p className="text-[14px] font-black text-blue-600 leading-tight">{s}</p>
                    <p className="text-[11px] font-bold text-gray-400">Stop {i + 1}</p>
                  </div>
                ))}
                <div className="pt-1">
                  <p className="text-[14px] font-black text-gray-900 leading-tight">{drop}</p>
                  <p className="text-[11px] font-bold text-gray-400">Drop</p>
                </div>
              </div>
            </div>
          </div>

          {/* Driver section */}
          <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <img
                src={`https://ui-avatars.com/api/?name=${(driver.name || 'D').replace(' ', '+')}&background=f0f0f0&color=000`}
                className="w-full h-full object-cover"
                alt="Driver"
              />
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-black text-gray-900 leading-tight">{driver.name}</p>
              <p className="text-[12px] font-bold text-gray-400">{driver.vehicle} · {driver.plate}</p>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-100 rounded-full px-2.5 py-1">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              <span className="text-[12px] font-black text-gray-800">{driver.rating || '4.9'}</span>
            </div>
          </div>

          {/* Fare breakdown */}
          <div className="px-5 py-4 space-y-2.5">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Fare Breakdown</p>

            <div className="flex justify-between items-center">
              <span className="text-[14px] font-bold text-gray-600">Base Fare</span>
              <span className="text-[14px] font-black text-gray-900">₹{fare}.00</span>
            </div>
            {effectiveTip > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-bold text-green-600">Tip 🙏</span>
                <span className="text-[14px] font-black text-green-600">₹{effectiveTip}.00</span>
              </div>
            )}
            <div className="border-t border-gray-100 pt-2.5 flex justify-between items-center">
              <span className="text-[16px] font-black text-gray-900">Total</span>
              <span className="text-[20px] font-black text-gray-900 tracking-tight">₹{totalBill}.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wide">Payment</span>
              <span className="text-[12px] font-black text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{paymentMethod}</span>
            </div>
          </div>
        </motion.div>

        {/* ── TIP SECTION ── */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-100"
        >
          <h3 className="text-[14px] font-black text-gray-900 mb-3 text-center uppercase tracking-widest">
            Tip your captain 🙏
          </h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {TIP_OPTIONS.map((amount) => (
              <motion.button
                key={amount}
                whileTap={{ scale: 0.93 }}
                onClick={() => {
                  setSelectedTip(selectedTip === amount ? null : amount);
                  setShowCustomTip(false);
                  setCustomTip('');
                }}
                className={`px-5 py-2.5 rounded-full text-[13px] font-black transition-all border ${
                  selectedTip === amount
                    ? 'bg-[#E85D04] text-white border-[#E85D04] shadow-lg shadow-orange-100'
                    : 'bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-200'
                }`}
              >
                ₹{amount}
              </motion.button>
            ))}
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => {
                setShowCustomTip(!showCustomTip);
                setSelectedTip(null);
              }}
              className={`px-5 py-2.5 rounded-full text-[13px] font-black transition-all border ${
                showCustomTip
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-gray-50 text-gray-600 border-gray-100'
              }`}
            >
              Custom
            </motion.button>
          </div>
          <AnimatePresence>
            {showCustomTip && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                  <span className="text-[16px] font-black text-gray-400">₹</span>
                  <input
                    type="number"
                    placeholder="Enter tip amount"
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    className="flex-1 bg-transparent border-none text-[15px] font-black text-gray-900 focus:outline-none placeholder:text-gray-300"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {effectiveTip > 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[12px] font-black text-green-600 mt-3">
              Includes ₹{effectiveTip} tip — Thank you! 🙏
            </motion.p>
          )}
        </motion.div>

        {/* ── RATING SECTION ── */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 text-center bg-white rounded-[32px] p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            How was your ride with {driver.name?.split(' ')[0]}?
          </h3>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <motion.button
                key={num}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRating(num)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  rating >= num ? 'bg-[#F48C06] text-white shadow-lg shadow-orange-100' : 'bg-gray-100 text-gray-300'
                }`}
              >
                <Star size={24} className={rating >= num ? 'fill-white' : ''} />
              </motion.button>
            ))}
          </div>
          {rating > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#E85D04] font-black text-sm uppercase tracking-widest"
            >
              {rating === 5 ? '⭐ Awesome Experience!' : rating >= 3 ? '👍 Thanks for rating!' : '📝 We will improve!'}
            </motion.p>
          )}
        </motion.div>

        {/* ── BOTTOM ACTIONS ── */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3 pb-4"
        >
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-100 py-3.5 rounded-[24px] text-sm font-black text-gray-900 shadow-sm active:scale-95 transition-all"
            >
              <Share2 size={18} />
              <span>Share Receipt</span>
            </button>
            <button
              onClick={() => navigate('/support')}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-100 py-3.5 rounded-[24px] text-sm font-black text-gray-900 shadow-sm active:scale-95 transition-all"
            >
              <Info size={18} />
              <span>Support</span>
            </button>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#1C2833] py-5 rounded-[28px] text-lg font-black text-white shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Back to Home</span>
            <ChevronRight size={22} className="opacity-50" />
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default RideComplete;
