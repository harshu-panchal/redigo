import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServiceItem = ({ icon, label, path, accentClass }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      onClick={() => path && navigate(path)}
      className="flex w-[90px] shrink-0 flex-col items-center gap-2 cursor-pointer group"
    >
      <div className={`w-[76px] h-[76px] md:w-[82px] md:h-[82px] rounded-[18px] border border-white/80 shadow-[0_12px_28px_rgba(15,23,42,0.06)] flex items-center justify-center p-2 transition-all group-hover:-translate-y-0.5 ${accentClass}`}>
        <img src={icon} alt={label} className="w-full h-full scale-110 object-contain drop-shadow-md group-hover:scale-[1.18] transition-transform duration-300" />
      </div>
      <span className="min-h-[30px] text-center text-[11px] leading-[1.15] font-black text-gray-800 tracking-tight">{label}</span>
    </motion.div>
  );
};

const ServiceGrid = () => {
  const services = [
    { icon: '/1_Bike.png', label: 'Bike Taxi', path: '/ride/select-location', accentClass: 'bg-[#FFF8EE]' },
    { icon: '/5_Parcel.png', label: 'Parcel Delivery', path: '/parcel/type', accentClass: 'bg-[#FFFBEF]' },
    { icon: '/rental_service_icon.png', label: 'Bike Rental', path: '/rental', accentClass: 'bg-[#F3F7FF]' },
    { icon: '/4_Taxi.png', label: 'Auto & Cab', path: '/ride/select-location', accentClass: 'bg-[#F9F7FF]' },
    { icon: '/white_sedan_banner_car.png', label: 'Workshop & RSA', path: '/workshop-rsa', accentClass: 'bg-[#F2FBF7]' },
  ];

  return (
    <div className="px-5">
      <div className="rounded-[20px] border border-white/80 bg-white/88 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.07)] backdrop-blur-md">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-[19px] font-black text-gray-900 tracking-tight">Services</h2>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
          {services.map((service, index) => (
            <ServiceItem key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;
