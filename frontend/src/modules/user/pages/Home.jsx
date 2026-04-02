import React from 'react';
import HeaderGreeting from '../components/HeaderGreeting';
import LocationCard from '../components/LocationCard';
import ServiceGrid from '../components/ServiceGrid';
import ActionsSection from '../components/ActionsSection';
import PromoBanners from '../components/PromoBanners';
import ExplorerSection from '../components/ExplorerSection';
import BottomNavbar from '../components/BottomNavbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-28 max-w-lg mx-auto relative overflow-hidden font-sans no-scrollbar">
      {/* Header with User Name (Single Row) */}
      <HeaderGreeting name="hritik raghuwanshi" />

      {/* SEARCH/LOCATION TOP SECTION */}
      <LocationCard location="Fetching location..." />

      {/* QUICK SERVICES ICONS (Bike, Delivery, etc.) */}
      <ServiceGrid />

      {/* ACTION SECTION (Compact Ride/Delivery) */}
      <ActionsSection />

      {/* VERTICAL PROMO & HORIZONTAL "IN A HURRY" CARDS */}
      <PromoBanners />

      {/* EXPLORE CITY SECTION (Horizontal with images) */}
      <ExplorerSection />
      
      {/* City footer line art as background at the bottom before navbar */}
      <div className="absolute bottom-24 left-0 right-0 h-24 opacity-10 pointer-events-none">
         <img src="/city_skyline_footer.png" alt="City" className="w-full h-full object-bottom" />
      </div>

      {/* Fixed Sticky Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
};

export default Home;
