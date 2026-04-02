import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Fuel, Shield, ChevronRight, Star, Info } from 'lucide-react';

const DURATION_TABS = ['Hourly', 'Half-Day', 'Daily'];

const vehicles = [
  {
    id: 'activa',
    name: 'Honda Activa 6G',
    tag: '⚡ Most Popular',
    tagColor: 'bg-orange-50 text-orange-600 border-orange-100',
    image: '/2_AutoRickshaw.png',
    rating: '4.8',
    fuel: 'Petrol · Full tank provided',
    prices: { Hourly: 59, 'Half-Day': 249, Daily: 399 },
    kmLimit: { Hourly: '20 km', 'Half-Day': '80 km', Daily: '150 km' },
    features: ['Helmet included', 'GPS tracking', '24/7 roadside assist'],
    color: 'from-orange-50 to-white',
    accent: 'bg-orange-500',
  },
  {
    id: 'splendor',
    name: 'Hero Splendor+',
    tag: '💸 Best Value',
    tagColor: 'bg-green-50 text-green-600 border-green-100',
    image: '/1_Bike.png',
    rating: '4.6',
    fuel: 'Petrol · Full tank provided',
    prices: { Hourly: 45, 'Half-Day': 189, Daily: 299 },
    kmLimit: { Hourly: '25 km', 'Half-Day': '100 km', Daily: '180 km' },
    features: ['Helmet included', 'GPS tracking'],
    color: 'from-green-50 to-white',
    accent: 'bg-green-500',
  },
  {
    id: 'pulsar',
    name: 'Bajaj Pulsar 150',
    tag: '🏍️ Sport Ride',
    tagColor: 'bg-blue-50 text-blue-600 border-blue-100',
    image: '/1_Bike.png',
    rating: '4.7',
    fuel: 'Petrol · Full tank provided',
    prices: { Hourly: 79, 'Half-Day': 349, Daily: 549 },
    kmLimit: { Hourly: '30 km', 'Half-Day': '100 km', Daily: '200 km' },
    features: ['Helmet included', 'GPS tracking', 'Insurance covered'],
    color: 'from-blue-50 to-white',
    accent: 'bg-blue-500',
  },
  {
    id: 'royal-enfield',
    name: 'Royal Enfield Classic 350',
    tag: '👑 Premium',
    tagColor: 'bg-purple-50 text-purple-600 border-purple-100',
    image: '/1_Bike.png',
    rating: '4.9',
    fuel: 'Petrol · Full tank provided',
    prices: { Hourly: 149, 'Half-Day': 599, Daily: 999 },
    kmLimit: { Hourly: '30 km', 'Half-Day': '100 km', Daily: '200 km' },
    features: ['Helmet included', 'GPS tracking', 'Insurance covered', 'Priority support'],
    color: 'from-purple-50 to-white',
    accent: 'bg-purple-500',
  },
];

const BikeRentalHome = () => {
  const [selectedDuration, setSelectedDuration] = useState('Hourly');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FB] max-w-lg mx-auto font-sans pb-10">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-6 sticky top-0 z-20 shadow-sm border-b border-gray-50">
        <div className="flex items-center gap-4 mb-5">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-90 transition-all">
            <ArrowLeft size={24} className="text-gray-900" strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="text-[22px] font-black text-gray-900 leading-none tracking-tight">Bike Rentals</h1>
            <p className="text-[12px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">Self-drive · No driver needed</p>
          </div>
        </div>

        {/* Duration Tabs */}
        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl">
          {DURATION_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedDuration(tab)}
              className={`flex-1 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all ${
                selectedDuration === tab
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="mx-5 mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
        <Info size={18} className="text-blue-500 shrink-0 mt-0.5" strokeWidth={2.5} />
        <div>
          <p className="text-[12px] font-black text-blue-900">
            {selectedDuration === 'Hourly' && 'Minimum 2 hours · Extra km charged ₹3/km'}
            {selectedDuration === 'Half-Day' && '6 hours · Extra km charged ₹2.5/km'}
            {selectedDuration === 'Daily' && '24 hours · Extra km charged ₹2/km · Free return pickup'}
          </p>
        </div>
      </div>

      {/* Vehicle Cards */}
      <div className="px-5 mt-5 space-y-4">
        {vehicles.map((v, idx) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="bg-white rounded-[32px] overflow-hidden border border-gray-50 shadow-sm"
          >
            {/* Card Top — Gradient + Image */}
            <div className={`bg-gradient-to-r ${v.color} p-5 flex items-center justify-between`}>
              <div className="space-y-2">
                <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${v.tagColor}`}>
                  {v.tag}
                </span>
                <h3 className="text-[17px] font-black text-gray-900 leading-tight">{v.name}</h3>
                <div className="flex items-center gap-1.5">
                  <Star size={12} className="text-yellow-500 fill-yellow-400" />
                  <span className="text-[12px] font-black text-gray-600">{v.rating}</span>
                  <span className="text-[11px] font-bold text-gray-300 ml-1">· {v.kmLimit[selectedDuration]} limit</span>
                </div>
              </div>
              <img src={v.image} alt={v.name} className="h-20 w-24 object-contain drop-shadow-md" />
            </div>

            {/* Card Bottom — Details + CTA */}
            <div className="p-5 space-y-4">
              <div className="flex flex-wrap gap-2">
                {v.features.map(f => (
                  <span key={f} className="text-[10px] font-black bg-gray-50 text-gray-500 px-2.5 py-1 rounded-full border border-gray-100">
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[12px] font-bold text-gray-400">
                <Fuel size={14} className="text-gray-300" />
                <span>{v.fuel}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[26px] font-black text-gray-900 tracking-tighter">₹{v.prices[selectedDuration]}</span>
                    <span className="text-[13px] font-bold text-gray-400">
                      /{selectedDuration === 'Hourly' ? 'hr' : selectedDuration === 'Half-Day' ? '6hr' : 'day'}
                    </span>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/ride/select-location', { state: { isRental: true, vehicle: v, duration: selectedDuration } })}
                  className="bg-[#1C2833] text-white px-6 py-3.5 rounded-2xl text-[13px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl active:scale-95 transition-all"
                >
                  Book Now <ChevronRight size={16} strokeWidth={3} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Safety Note */}
      <div className="mx-5 mt-6 flex items-center gap-3 bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <Shield size={20} className="text-gray-400 shrink-0" />
        <p className="text-[12px] font-bold text-gray-400 leading-relaxed">
          All bikes are insured, regularly serviced, and GPS-tracked. Valid driving license required at pickup.
        </p>
      </div>
    </div>
  );
};

export default BikeRentalHome;
