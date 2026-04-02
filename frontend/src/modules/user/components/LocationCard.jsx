import React from 'react';
import { useNavigate } from 'react-router-dom';

const LocationCard = ({ location = "Fetching location..." }) => {
  const navigate = useNavigate();

  return (
    <div className="px-5 my-2">
      <div className="bg-white rounded-[24px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 transition-transform active:scale-[0.98]" onClick={() => navigate('/ride/select-location')}>
        <div className="flex items-start gap-4 mb-3">
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#E85D04">
               <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div className="pointer-events-none">
            <span className="text-[14px] text-gray-500 font-medium block">Pickup Location</span>
            <span className="text-[17px] text-gray-900 font-bold block mt-0.5">{location}</span>
          </div>
        </div>

        <div className="relative group pointer-events-none">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
             </svg>
          </div>
          <div className="w-full bg-[#f6f7f9] border-none text-[16px] text-gray-400 font-semibold rounded-full py-4 pl-12 pr-12">
            Where are you going ?
          </div>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none opacity-50">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
