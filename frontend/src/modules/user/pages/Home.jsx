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
    <div className="min-h-screen bg-[linear-gradient(180deg,#F8FAFC_0%,#F3F4F6_38%,#EEF2F7_100%)] pb-32 max-w-lg mx-auto relative overflow-hidden font-sans no-scrollbar">
      <div className="absolute -top-16 right-[-40px] h-44 w-44 rounded-full bg-orange-100/60 blur-3xl pointer-events-none" />
      <div className="absolute top-52 left-[-60px] h-52 w-52 rounded-full bg-emerald-100/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-28 right-[-40px] h-40 w-40 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-5 pb-6">
        <HeaderGreeting name="hritik raghuwanshi" />
        <LocationCard location="Fetching location..." />
        <ServiceGrid />
        <ActionsSection />
        <PromoBanners />
        <ExplorerSection />
      </div>

      <div className="absolute bottom-24 left-0 right-0 h-24 opacity-[0.08] pointer-events-none">
        <img src="/city_skyline_footer.png" alt="City" className="w-full h-full object-bottom" />
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Home;
