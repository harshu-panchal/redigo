import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, X, Plus, Minus } from 'lucide-react';

const SelectLocation = () => {
  const [pickup, setPickup] = useState('Pipaliyahana, Indore');
  const [drop, setDrop] = useState('');
  const [stops, setStops] = useState([]);          // array of stop strings
  const [activeInput, setActiveInput] = useState('drop'); // 'pickup' | 'drop' | stopIdx
  const [mapToast, setMapToast] = useState(false);
  const navigate = useNavigate();

  // All known locations — filtered live as user types
  const allResults = [
    { title: 'Vijay Nagar', address: 'Vijay Nagar, Indore, Madhya Pradesh' },
    { title: 'Vijay Nagar Square', address: 'Vijay Nagar Square, Bhagyashree Colony, Indore' },
    { title: 'Vijayawada', address: 'Vijayawada, Andhra Pradesh, India' },
    { title: 'Vijay Nagar Police Station', address: 'Vijay Nagar Police Station, Sector D, Indore' },
    { title: 'Rajwada', address: 'Rajwada, Old Palasia, Indore, MP' },
    { title: 'Bhawarkua', address: 'Bhawarkua, Indore, Madhya Pradesh' },
    { title: 'MG Road', address: 'MG Road, Indore, Madhya Pradesh' },
    { title: 'Palasia Square', address: 'Palasia Square, AB Road, Indore' },
    { title: 'LIG Colony', address: 'LIG Colony, Indore, Madhya Pradesh' },
    { title: 'Scheme No 54', address: 'Scheme No 54, Vijay Nagar, Indore' },
    { title: 'Bhangadh', address: 'Bhangadh, Indore, Madhya Pradesh' },
    { title: 'AB Road', address: 'AB Road, Indore, Madhya Pradesh' },
    { title: 'Geeta Bhawan', address: 'Geeta Bhawan, Indore, Madhya Pradesh' },
    { title: 'Sapna Sangeeta', address: 'Sapna Sangeeta Road, Indore, MP' },
    { title: 'Mahalaxmi Nagar', address: 'Mahalaxmi Nagar, Indore, Madhya Pradesh' },
  ];

  const getQuery = () => {
    if (activeInput === 'pickup') return pickup;
    if (activeInput === 'drop') return drop;
    if (typeof activeInput === 'number') return stops[activeInput] || '';
    return '';
  };

  const query = getQuery();

  const searchResults = query.trim().length >= 1
    ? allResults.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.address.toLowerCase().includes(query.toLowerCase())
      )
    : allResults.slice(0, 6);

  const showMapToast = () => {
    setMapToast(true);
    setTimeout(() => setMapToast(false), 2500);
  };

  // Add a new empty stop
  const addStop = () => {
    setStops(prev => [...prev, '']);
    setActiveInput(stops.length); // focus the new stop
  };

  // Remove a stop by index
  const removeStop = (idx) => {
    setStops(prev => prev.filter((_, i) => i !== idx));
    setActiveInput('drop');
  };

  // Update a stop value
  const updateStop = (idx, val) => {
    setStops(prev => prev.map((s, i) => i === idx ? val : s));
  };

  // When a suggestion is tapped
  const handleSelectResult = (title) => {
    if (activeInput === 'pickup') {
      setPickup(title);
      setActiveInput('drop');
    } else if (activeInput === 'drop') {
      navigate('/ride/select-vehicle', {
        state: {
          pickup: pickup || 'Pipaliyahana, Indore',
          drop: title,
          stops: stops.filter(s => s.trim().length > 0),
        },
      });
    } else if (typeof activeInput === 'number') {
      updateStop(activeInput, title);
      // Move to next stop or drop
      if (activeInput < stops.length - 1) {
        setActiveInput(activeInput + 1);
      } else {
        setActiveInput('drop');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white max-w-lg mx-auto font-sans">

      {/* Map Picker Toast */}
      <AnimatePresence>
        {mapToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl text-sm font-black shadow-2xl whitespace-nowrap"
          >
            🗺️ Map Picker — Coming Soon!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-3 flex items-center gap-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-90 transition-all">
          <ArrowLeft size={24} className="text-gray-900" strokeWidth={2.5} />
        </button>
        <h1 className="text-[20px] font-extrabold text-gray-900 tracking-tight">Where to?</h1>
      </div>

      {/* Input Card */}
      <div className="px-5">
        <div className="bg-white rounded-[24px] p-3 shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-gray-100">
          <div className="space-y-3">

            {/* Pickup Row */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-0.5 shrink-0">
                <div className="w-5 h-5 rounded-full border-2 border-green-700 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-700" />
                </div>
              </div>
              <div
                className={`flex-1 flex items-center bg-gray-50 rounded-xl px-3 py-2.5 transition-all ${activeInput === 'pickup' ? 'ring-2 ring-green-200' : ''}`}
                onClick={() => setActiveInput('pickup')}
              >
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={() => setActiveInput('pickup')}
                  placeholder="Your pickup location"
                  className="w-full bg-transparent border-none text-[15px] font-bold text-gray-900 focus:outline-none placeholder:text-gray-300"
                />
                {pickup.length > 0 && (
                  <button onClick={() => setPickup('')} className="ml-2 shrink-0">
                    <X size={16} className="text-gray-300 hover:text-gray-600 transition-colors" />
                  </button>
                )}
              </div>
            </div>

            {/* Dotted connector */}
            <div className="ml-[9px] h-2 w-[1.5px] border-l-[1.5px] border-dotted border-gray-300" />

            {/* Dynamic Stops */}
            <AnimatePresence>
              {stops.map((stop, idx) => (
                <motion.div
                  key={`stop-${idx}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-0.5 shrink-0">
                      <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      </div>
                    </div>
                    <div
                      className={`flex-1 flex items-center bg-blue-50 rounded-xl px-3 py-2.5 transition-all ${activeInput === idx ? 'ring-2 ring-blue-200' : ''}`}
                      onClick={() => setActiveInput(idx)}
                    >
                      <input
                        type="text"
                        value={stop}
                        autoFocus={activeInput === idx}
                        placeholder={`Stop ${idx + 1} location...`}
                        onFocus={() => setActiveInput(idx)}
                        onChange={(e) => updateStop(idx, e.target.value)}
                        className="w-full bg-transparent border-none text-[15px] font-bold text-gray-900 focus:outline-none placeholder:text-blue-300"
                      />
                      {stop.length > 0 && (
                        <button onClick={() => updateStop(idx, '')} className="ml-2 shrink-0">
                          <X size={16} className="text-blue-300 hover:text-blue-600 transition-colors" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => removeStop(idx)}
                      className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0 active:scale-90 transition-all"
                    >
                      <Minus size={14} className="text-red-400" strokeWidth={3} />
                    </button>
                  </div>
                  {/* Connector after each stop */}
                  <div className="ml-[9px] mt-3 h-2 w-[1.5px] border-l-[1.5px] border-dotted border-gray-300" />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Drop Row */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-0.5 shrink-0">
                <div className="w-5 h-5 rounded-full border-2 border-orange-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                </div>
              </div>
              <div
                className={`flex-1 flex items-center bg-gray-50 rounded-xl px-3 py-2.5 transition-all ${activeInput === 'drop' ? 'ring-2 ring-orange-200' : ''}`}
                onClick={() => setActiveInput('drop')}
              >
                <input
                  type="text"
                  value={drop}
                  autoFocus={activeInput === 'drop'}
                  placeholder="Enter drop location..."
                  onFocus={() => setActiveInput('drop')}
                  onChange={(e) => setDrop(e.target.value)}
                  className="w-full bg-transparent border-none text-[15px] font-bold text-gray-900 focus:outline-none placeholder:text-gray-300"
                />
                {drop.length > 0 && (
                  <button onClick={() => setDrop('')} className="ml-2 shrink-0">
                    <X size={16} className="text-gray-300 hover:text-gray-600 transition-colors" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Action Pills */}
      <div className="flex gap-3 px-5 my-4">
        <button
          onClick={showMapToast}
          className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-100 rounded-full py-2.5 shadow-sm active:scale-95 transition-all text-sm font-black text-gray-800"
        >
          <MapPin size={16} className="text-gray-900" />
          <span>Select on map</span>
        </button>
        <button
          onClick={addStop}
          className="flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 shadow-sm active:scale-95 transition-all text-sm font-black border bg-blue-50 border-blue-200 text-blue-600"
        >
          <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center">
            <Plus size={12} className="text-white" strokeWidth={3} />
          </div>
          <span>Add stop {stops.length > 0 ? `(${stops.length})` : ''}</span>
        </button>
      </div>

      {/* Stop count chips */}
      {stops.length > 0 && (
        <div className="px-5 mb-2">
          <div className="flex gap-2 flex-wrap">
            {stops.map((s, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-full px-3 py-1">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-[11px] font-black text-blue-700 truncate max-w-[100px]">
                  {s.trim() || `Stop ${idx + 1}`}
                </span>
                <button onClick={() => removeStop(idx)}>
                  <X size={11} className="text-blue-400 hover:text-blue-700" strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="px-5 mb-4">
        <h2 className="text-[17px] font-extrabold text-gray-900 mb-2 ml-1">
          {query.trim().length > 0 ? 'Search Results' : 'Popular Locations'}
        </h2>

        {searchResults.length > 0 ? (
          <div className="space-y-1">
            {searchResults.map((result, idx) => (
              <motion.div
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectResult(result.title)}
                className="flex gap-4 py-2 group cursor-pointer"
              >
                <div className="mt-1 opacity-40 group-hover:opacity-100 shrink-0 transition-opacity">
                  <MapPin size={20} className="text-gray-400" />
                </div>
                <div className="flex-1 pb-3 border-b border-gray-50">
                  <h4 className="text-[16px] font-black text-gray-900 leading-tight">{result.title}</h4>
                  <p className="text-[13px] text-gray-400 font-bold mt-0.5 line-clamp-1">{result.address}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-[15px] font-black text-gray-400">No results for <span className="text-gray-700">"{query}"</span></p>
            <p className="text-[12px] font-bold text-gray-300 mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectLocation;
