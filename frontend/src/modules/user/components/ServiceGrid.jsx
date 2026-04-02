import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServiceItem = ({ icon, label, path }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      whileTap={{ scale: 0.9 }}
      onClick={() => path && navigate(path)}
      className="flex flex-col items-center gap-2 cursor-pointer group"
    >
      <div className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] bg-white rounded-[24px] shadow-[0_8px_25px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center justify-center p-3 group-hover:shadow-md transition-all">
        <img src={icon} alt={label} className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
      </div>
      <span className="text-[12px] font-black text-gray-800 tracking-tight">{label}</span>
    </motion.div>
  );
};

const ServiceGrid = () => {
  const services = [
    { icon: '/1_Bike.png', label: 'Ride', path: '/ride/select-location' },
    { icon: '/5_Parcel.png', label: 'Delivery', path: '/parcel/type' },
    { icon: '/2_AutoRickshaw.png', label: 'Rental', path: '/rental' },
    { icon: '/4_Taxi.png', label: 'Outstation', path: '/intercity' },
  ];

  return (
    <div className="px-5 mb-4">
      <h2 className="text-[19px] font-black text-gray-900 mb-2 ml-1 tracking-tight">Services</h2>
      <div className="flex justify-between items-center gap-2">
        {services.map((service, index) => (
          <ServiceItem key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;
