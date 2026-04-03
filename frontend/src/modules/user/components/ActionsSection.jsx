import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ActionCard = ({ title, description, image, surfaceClass, titleClass, buttonClass, buttonText, path }) => {
  const navigate = useNavigate();

  return (
    <div className={`relative min-h-[182px] flex-1 overflow-hidden rounded-[20px] border border-white/80 px-5 pt-5 pb-2 shadow-[0_18px_40px_rgba(15,23,42,0.07)] ${surfaceClass}`}>
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="max-w-[126px]">
          <h3 className={`text-[24px] font-black leading-none tracking-tight ${titleClass}`}>{title}</h3>
          <p className="mt-3 text-[12px] font-bold leading-relaxed text-gray-600">{description}</p>
        </div>

        <div className="mt-auto -ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(path);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-black whitespace-nowrap shadow-md shadow-black/5 transition-all active:scale-95 ${buttonClass} text-white self-start`}
          >
            {buttonText}
            <ArrowRight size={12} strokeWidth={3} />
          </button>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 w-[104px] opacity-95 pointer-events-none">
        <img src={image} alt={title} className="w-full h-auto object-contain drop-shadow-2xl" />
      </div>
    </div>
  );
};

const ActionsSection = () => {
  return (
    <div className="px-5">
      <div className="mb-3 ml-1">
        <h2 className="text-[19px] font-black text-gray-900 tracking-tight">What do you need today?</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ActionCard
          title="Ride"
          description="Bike taxis, autos, and cabs."
          image="/1_Bike.png"
          surfaceClass="bg-[linear-gradient(135deg,#FFF8ED_0%,#FFE8CC_100%)]"
          titleClass="text-[#7C3A00]"
          buttonClass="bg-[#F97316]"
          buttonText="Book Now"
          path="/ride/select-location"
        />

        <ActionCard
          title="Delivery"
          description="Parcel pickup across the city."
          image="/5_Parcel.png"
          surfaceClass="bg-[linear-gradient(135deg,#F6F2FF_0%,#E8E1FF_100%)]"
          titleClass="text-[#4C3D91]"
          buttonClass="bg-[#6366F1]"
          buttonText="Send Now"
          path="/parcel/type"
        />
      </div>
    </div>
  );
};

export default ActionsSection;
