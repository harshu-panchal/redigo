import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Clock3, ShieldCheck, Sparkles } from 'lucide-react';

const rotatingCards = [
  {
    icon: Clock3,
    iconClass: 'text-orange-600',
    title: 'In a hurry?',
    description: 'Auto for shorter wait times.',
    actionClass: 'bg-orange-50 text-orange-500',
    path: '/ride/select-location',
    images: [
      { src: '/2_AutoRickshaw.png', alt: 'Auto' },
      { src: '/1_Bike.png', alt: 'Bike' },
    ],
  },
  {
    icon: ShieldCheck,
    iconClass: 'text-blue-600',
    title: 'Need more space?',
    description: 'Cab for luggage or comfort.',
    actionClass: 'bg-blue-50 text-blue-500',
    path: '/ride/select-location',
    images: [
      { src: '/4_Taxi.png', alt: 'Taxi' },
      { src: '/white_sedan_banner_car.png', alt: 'Sedan' },
    ],
  },
];

const ImageCarousel = ({ images, className }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (images.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [images]);

  const activeImage = images[activeIndex];

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.img
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          className="w-full object-contain drop-shadow-xl"
          initial={{ opacity: 0, x: -18, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 18, scale: 0.94 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </AnimatePresence>
    </div>
  );
};

const PromoCard = ({ icon: Icon, iconClass, title, description, actionClass, path, images, onNavigate }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    onClick={() => onNavigate(path)}
    className="relative overflow-hidden rounded-[20px] border border-white/80 bg-white/88 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)]"
  >
    <div className={`flex items-center gap-2 ${iconClass}`}>
      <Icon size={12} strokeWidth={2.5} />
    </div>
    <h3 className="mt-4 text-[20px] font-black leading-tight tracking-tight text-gray-900">{title}</h3>
    <p className="mt-2 max-w-[150px] text-[12px] font-bold leading-relaxed text-gray-500">{description}</p>
    <div className={`mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full ${actionClass}`}>
      <ArrowRight size={18} strokeWidth={2.5} />
    </div>
    <ImageCarousel images={images} className="absolute bottom-0 right-0 w-[96px] opacity-95 pointer-events-none" />
  </motion.div>
);

const PromoBanners = () => {
  const navigate = useNavigate();

  return (
    <div className="px-5 space-y-4">
      <div className="mb-1 ml-1">
        <h2 className="text-[19px] font-black text-gray-900 tracking-tight">Recommended for you</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {rotatingCards.map((card) => (
          <PromoCard key={card.title} {...card} onNavigate={navigate} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[22px] border border-white/80 bg-[linear-gradient(135deg,#102033_0%,#1F3D63_100%)] p-5 shadow-[0_22px_50px_rgba(15,23,42,0.12)]"
      >
        <motion.div
          aria-hidden="true"
          className="absolute -top-10 right-10 h-28 w-28 rounded-full bg-cyan-300/12 blur-2xl"
          animate={{ x: [0, 16, 0], y: [0, -8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-16 h-24 w-24 rounded-full bg-amber-300/10 blur-2xl"
          animate={{ x: [0, -10, 0], y: [0, 8, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-[58%]">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-white/90 backdrop-blur-sm"
            animate={{ opacity: [0.78, 1, 0.78], y: [0, -1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={12} strokeWidth={2.5} />
            </motion.div>
          </motion.div>

          <motion.h3
            className="mt-4 text-[25px] font-black leading-tight tracking-tight text-white"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
          >
            Better savings on your next ride.
          </motion.h3>
          <motion.p
            className="mt-2 text-[12px] font-bold leading-relaxed text-white/70"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14, ease: 'easeOut' }}
          >
            Book quickly and save more.
          </motion.p>

          <motion.button
            whileTap={{ scale: 0.96 }}
            animate={{ y: [0, -1.5, 0], boxShadow: ['0 10px 24px rgba(255,255,255,0.12)', '0 14px 28px rgba(255,255,255,0.18)', '0 10px 24px rgba(255,255,255,0.12)'] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => navigate('/ride/select-location')}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-black text-slate-900 shadow-xl"
          >
            Ride Now
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <ArrowRight size={15} strokeWidth={3} />
            </motion.span>
          </motion.button>
        </div>

        <motion.div
          className="absolute -right-2 bottom-0 w-[170px] opacity-95 pointer-events-none"
          animate={{ y: [0, -5, 0], rotate: [0, -1.5, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/ride_now_banner.png" alt="Promo" className="w-full drop-shadow-2xl" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PromoBanners;
