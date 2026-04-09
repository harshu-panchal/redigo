import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ChevronRight,
  Package,
  ShieldCheck,
  TimerReset,
  Users,
} from 'lucide-react';

const VEHICLES = [
  {
    id: 'bike',
    name: 'Bike Courier',
    icon: '/1_Bike.png',
    description: 'Best for documents and light parcels.',
    capacity: 'Up to 5 kg',
    eta: '10-15 mins',
    badge: 'Fastest',
    accentClass: 'bg-[linear-gradient(135deg,#FFF7ED_0%,#FFE5C2_100%)]',
    priceMultiplier: 1,
  },
  {
    id: 'auto',
    name: 'Auto Parcel',
    icon: '/2_AutoRickshaw.png',
    description: 'Extra space for grocery bags and medium boxes.',
    capacity: 'Up to 20 kg',
    eta: '12-18 mins',
    badge: 'Popular',
    accentClass: 'bg-[linear-gradient(135deg,#F0FDF4_0%,#BBF7D0_100%)]',
    priceMultiplier: 1.35,
  },
  {
    id: 'cab',
    name: 'Mini Cab Cargo',
    icon: '/4_Taxi.png',
    description: 'Safer for large, fragile, or premium items.',
    capacity: 'Up to 50 kg',
    eta: '15-22 mins',
    badge: 'Safer',
    accentClass: 'bg-[linear-gradient(135deg,#EFF6FF_0%,#DBEAFE_100%)]',
    priceMultiplier: 1.75,
  },
];

const roundFare = (value) => Math.round(value / 5) * 5;

const ParcelVehicle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location.state || {};
  const [selectedVehicleId, setSelectedVehicleId] = useState('bike');

  const parcelType = routeState.parcelType || 'Documents';
  const weight = routeState.weight || 'Under 5kg';
  const description = routeState.description || '';
  const estimatedFare = routeState.estimatedFare || { min: 45, max: 80 };

  const vehicles = useMemo(
    () =>
      VEHICLES.map((vehicle) => ({
        ...vehicle,
        fare: {
          min: roundFare(estimatedFare.min * vehicle.priceMultiplier),
          max: roundFare(estimatedFare.max * vehicle.priceMultiplier),
        },
      })),
    [estimatedFare]
  );

  const selectedVehicle =
    vehicles.find((vehicle) => vehicle.id === selectedVehicleId) || vehicles[0];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F8FAFC_0%,#F3F4F6_38%,#EEF2F7_100%)] max-w-lg mx-auto flex flex-col font-sans relative overflow-hidden">
      <div className="absolute -top-16 right-[-40px] h-44 w-44 rounded-full bg-orange-100/60 blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-[-70px] h-52 w-52 rounded-full bg-sky-100/60 blur-3xl pointer-events-none" />

      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white/90 backdrop-blur-md px-5 py-4 flex items-center gap-3 border-b border-white/80 shadow-[0_4px_20px_rgba(15,23,42,0.05)] sticky top-0 z-20"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-[12px] border border-white/80 bg-white/90 flex items-center justify-center shadow-[0_4px_12px_rgba(15,23,42,0.07)] shrink-0"
        >
          <ArrowLeft size={18} className="text-slate-900" strokeWidth={2.5} />
        </motion.button>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-black uppercase tracking-[0.26em] text-slate-400">
            Parcel Delivery
          </p>
          <h1 className="text-[19px] font-black tracking-tight text-slate-900 leading-tight">
            Select Delivery Vehicle
          </h1>
        </div>
        <div className="rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-black text-slate-600 shadow-sm shrink-0">
          Step 3 of 4
        </div>
      </motion.header>

      <div className="flex-1 px-5 pt-5 pb-32 overflow-y-auto no-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
          className="rounded-[20px] border border-white/80 bg-white/85 p-4 shadow-[0_6px_18px_rgba(15,23,42,0.05)]"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
            Parcel Summary
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-[14px] bg-slate-50/90 px-2 py-3">
              <Package size={14} className="mx-auto text-orange-500" strokeWidth={2.4} />
              <p className="mt-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Type</p>
              <p className="mt-1 text-[11px] font-black text-slate-900 leading-tight">{parcelType}</p>
            </div>
            <div className="rounded-[14px] bg-slate-50/90 px-2 py-3">
              <Users size={14} className="mx-auto text-sky-500" strokeWidth={2.4} />
              <p className="mt-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Weight</p>
              <p className="mt-1 text-[11px] font-black text-slate-900 leading-tight">{weight}</p>
            </div>
            <div className="rounded-[14px] bg-slate-50/90 px-2 py-3">
              <ShieldCheck size={14} className="mx-auto text-emerald-500" strokeWidth={2.4} />
              <p className="mt-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Base Fare</p>
              <p className="mt-1 text-[11px] font-black text-slate-900 leading-tight">
                Rs {estimatedFare.min}-{estimatedFare.max}
              </p>
            </div>
          </div>
          {description ? (
            <p className="mt-3 text-[11px] font-bold text-slate-500 leading-relaxed">
              "{description}"
            </p>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
          className="mt-4 space-y-3"
        >
          {vehicles.map((vehicle, index) => {
            const isSelected = vehicle.id === selectedVehicleId;

            return (
              <motion.button
                key={vehicle.id}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.14 + index * 0.05, ease: 'easeOut' }}
                whileTap={{ scale: 0.985 }}
                onClick={() => setSelectedVehicleId(vehicle.id)}
                className={`w-full rounded-[22px] border px-4 py-4 text-left transition-all ${
                  isSelected
                    ? 'border-orange-200 bg-white shadow-[0_10px_28px_rgba(249,115,22,0.12)]'
                    : 'border-white/80 bg-white/88 shadow-[0_4px_14px_rgba(15,23,42,0.05)]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-16 h-16 rounded-[18px] flex items-center justify-center shrink-0 ${vehicle.accentClass}`}
                  >
                    <img
                      src={vehicle.icon}
                      alt={vehicle.name}
                      className="w-12 h-12 object-contain drop-shadow-sm"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-[15px] font-black text-slate-900 leading-tight">
                        {vehicle.name}
                      </h2>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                        {vehicle.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] font-bold text-slate-500 leading-relaxed">
                      {vehicle.description}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                      <span>{vehicle.capacity}</span>
                      <span className="flex items-center gap-1">
                        <TimerReset size={11} strokeWidth={2.5} />
                        {vehicle.eta}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[16px] font-black text-slate-900 leading-none">
                      Rs {vehicle.fare.min}-{vehicle.fare.max}
                    </p>
                    <div className="mt-2 flex justify-end">
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-500 shadow-[0_0_0_3px_rgba(249,115,22,0.12)]'
                            : 'border-slate-300 bg-white'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg px-5 pb-6 pt-3 bg-gradient-to-t from-[#EEF2F7] via-[#F3F4F6]/95 to-transparent pointer-events-none z-30">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            navigate('/parcel/contacts', {
              state: {
                ...routeState,
                vehicle: selectedVehicle,
                fare: selectedVehicle.fare.min,
                estimatedFare: selectedVehicle.fare,
              },
            })
          }
          className="pointer-events-auto w-full bg-slate-900 py-4 rounded-[18px] text-[15px] font-black text-white shadow-[0_8px_24px_rgba(15,23,42,0.18)] active:bg-black transition-all flex items-center justify-center gap-2"
        >
          <span>Next: Sender & Receiver</span>
          <ChevronRight size={17} className="opacity-50" strokeWidth={3} />
        </motion.button>
      </div>
    </div>
  );
};

export default ParcelVehicle;
