import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionCard = ({ title, subtitle, image, bgColor, textColor, buttonColor, buttonText, path }) => {
  const navigate = useNavigate();
  
  return (
    <div className={`relative flex-1 rounded-[32px] p-4 md:p-5 overflow-hidden ${bgColor} group transition-all active:scale-[0.98] shadow-sm`}>
      <div className="relative z-10 flex flex-col h-full justify-between pr-8">
        <div className="max-w-[130px] mb-4">
          <h3 className={`text-[19px] font-black leading-tight tracking-tight ${textColor}`}>{title}</h3>
          <p className={`text-[11px] font-bold mt-1 opacity-70 leading-tight ${textColor}`}>{subtitle}</p>
        </div>
        <div className="mt-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(path);
            }}
            className={`px-4 py-2.5 rounded-full text-[13px] font-black whitespace-nowrap shadow-xl shadow-black/5 transition-all active:scale-95 ${buttonColor} text-white self-start`}
          >
            {buttonText}
          </button>
        </div>
      </div>
      <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-[115px] md:w-[135px] opacity-90 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
        <img src={image} alt={title} className="w-full h-auto object-contain drop-shadow-2xl" />
      </div>
    </div>
  );
};


const ActionsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="px-5 mb-4">
      <h2 className="text-[19px] font-black text-gray-900 mb-2 ml-1 tracking-tight">What do you need today?</h2>

      <div className="flex gap-4">
        {/* Ride Now Section */}
        <ActionCard 
          title="Ride Now"
          subtitle="Bikes & Autos available"
          image="/1_Bike.png"
          bgColor="bg-[#FFF4E6]"
          textColor="text-[#8B4513]"
          buttonColor="bg-[#E85D04]"
          buttonText="Book Ride"
          path="/ride/select-location"
        />

        {/* Delivery Section */}
        <ActionCard 
          title="Delivery"
          subtitle="SEND ANYTHING"
          image="/5_Parcel.png"
          bgColor="bg-[#F0EEFF]"
          textColor="text-[#483D8B]"
          buttonColor="bg-[#6366F1]"
          buttonText="Send Now"
          path="/parcel/type"
        />
      </div>
    </div>
  );
};

export default ActionsSection;
