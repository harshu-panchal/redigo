import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Wallet } from 'lucide-react';
import RedigoLogo from '@/assets/redigologo.png';

const fallingCoins = [
  { id: 1, left: '24%', delay: 0 },
  { id: 2, left: '50%', delay: 0.65 },
  { id: 3, left: '72%', delay: 1.2 },
];

const HeaderGreeting = ({ name = 'hritik raghuwanshi' }) => {
  const navigate = useNavigate();

  return (
    <div className="px-5 pt-6">
      <div className="flex items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative inline-flex items-center rounded-full border border-white/80 bg-white/90 px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-md"
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-4 inset-y-2 rounded-full bg-emerald-100/70 blur-md"
            animate={{ opacity: [0.3, 0.75, 0.3], scale: [0.92, 1.06, 0.92] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src={RedigoLogo}
            alt="Redigo"
            className="relative z-10 h-9 object-contain drop-shadow-sm"
            animate={{ y: [0, -2, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <button
          onClick={() => navigate('/wallet')}
          className="relative w-12 h-12 overflow-hidden rounded-full border border-white/80 bg-white/95 flex items-center justify-center shadow-[0_12px_30px_rgba(15,23,42,0.08)] shrink-0 active:scale-95 transition-transform"
        >
          <motion.div
            className="absolute inset-x-2 top-1 h-3 rounded-full bg-gradient-to-b from-amber-200/50 to-transparent"
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {fallingCoins.map((coin) => (
            <motion.span
              key={coin.id}
              aria-hidden="true"
              className="absolute top-1 block h-1.5 w-1.5 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 shadow-[0_1px_4px_rgba(245,158,11,0.45)]"
              style={{ left: coin.left }}
              animate={{
                y: [0, 10, 16],
                opacity: [0, 1, 1, 0],
                scale: [0.85, 1, 0.92],
              }}
              transition={{
                duration: 1.8,
                delay: coin.delay,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: 'easeIn',
              }}
            />
          ))}

          <motion.div
            className="relative z-10"
            animate={{ y: [0, -1, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Wallet size={20} className="text-gray-900" strokeWidth={2.5} />
          </motion.div>
        </button>
      </div>

      <div className="mt-4 rounded-[20px] border border-white/80 bg-white/88 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)] backdrop-blur-md">
        <h1 className="text-[24px] font-bold leading-tight tracking-tight text-gray-900">
          Good Morning, <span className="capitalize">{name}</span>
        </h1>

        <div className="mt-3 flex items-center gap-2 text-[12px] font-black text-gray-500">
          <MapPin size={14} className="text-orange-500" strokeWidth={2.5} />
          <span>Indore, Madhya Pradesh</span>
          <span className="text-gray-300">-</span>
          <span>Live availability across core zones</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderGreeting;
