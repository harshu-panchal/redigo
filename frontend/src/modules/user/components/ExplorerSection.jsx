import React from 'react';

const ExplorerSection = () => {
  const cities = [
    { title: 'Airport Indore', image: '/airport_illustration.png', label: '10 min', code: 'IDR' },
    { title: 'Indore Junction', image: '/train_station_illustration.png', label: '5 min', code: 'JCT' },
    { title: 'Rajwada', image: '/city_skyline_footer.png', label: '15 min', code: 'RAJ' }
  ];

  return (
    <div className="px-5 mb-4">
      <h2 className="text-[19px] font-black text-gray-900 mb-2 ml-1 tracking-tight">Explore Indore</h2>
      
      <div className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-6 px-1">
        {cities.map((city, idx) => (
          <div key={idx} className="flex-shrink-0 w-[210px] group transition-all active:scale-[0.98] cursor-pointer">
            <div className="rounded-[32px] bg-white border border-gray-50 shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden h-[130px] transition-all relative group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
               <img 
                 src={city.image} 
                 alt={city.title} 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-white/50 z-10">
                  <p className="text-[9px] font-black text-primary tracking-widest uppercase">{city.code}</p>
               </div>
            </div>
            <div className="mt-2 px-2 translate-y-0 group-hover:-translate-y-1 transition-transform">
               <h4 className="text-[15px] font-black text-gray-900 leading-tight tracking-tight group-hover:text-primary transition-colors flex items-center justify-between">
                  {city.title}
                  <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center -rotate-45 group-hover:bg-primary/10 transition-all">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-primary transition-colors">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
               </h4>
               <p className="text-[11px] text-gray-400 font-bold mt-1 tracking-tight">
                  Just {city.label} from your location
               </p>
            </div>
          </div>
        ))}
        
        {/* Skeleton View All Card */}
        <div className="flex-shrink-0 w-[160px] flex flex-col justify-center items-center gap-3 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-[32px] active:scale-95 transition-all text-gray-400 font-black group hover:border-primary/30 hover:bg-white transition-all h-[130px] self-start">
           <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                 <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
           </div>
           <span className="text-[13px] tracking-tight">View All</span>
        </div>
      </div>
      
      {/* Scroll indicator dots */}
      <div className="flex justify-center gap-2 mt-2">
         <div className="w-10 h-1.5 bg-gray-900 rounded-full"></div>
         <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
         <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
      </div>
    </div>


  );
};

export default ExplorerSection;
