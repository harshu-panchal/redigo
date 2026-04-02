import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ChevronRight, ChevronDown,
  Hash, Palette, Database, Info,
  CheckCircle2, MapPin, Truck, Car
} from 'lucide-react';
import RegistrationProgress from '../../../shared/components/RegistrationProgress';
import {
  getActiveServices,
  getActiveLocations,
  getVehicleTypesForLocation,
} from '../../../../app/serviceConfigStore';

// ─── Sub-Components ──────────────────────────────────────────────────────────

const SectionTitle = ({ step, title, subtitle }) => (
  <div className="flex items-start gap-4">
    <div className="w-8 h-8 rounded-full bg-taxi-primary/10 border border-taxi-primary/20 flex items-center justify-center shrink-0 mt-0.5">
      <span className="text-[13px] font-black text-taxi-primary">{step}</span>
    </div>
    <div>
      <h3 className="text-[16px] font-black text-taxi-text tracking-tight">{title}</h3>
      {subtitle && <p className="text-[12px] font-bold text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

const SelectDropdown = ({ label, value, onChange, options, placeholder, icon: Icon }) => {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.id === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-14 bg-white border-2 rounded-2xl pl-5 pr-5 flex items-center justify-between transition-all shadow-sm ${
          open ? 'border-taxi-primary shadow-xl shadow-taxi-primary/10' : 'border-slate-100'
        }`}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={18} className="text-slate-300 shrink-0" />}
          {selected ? (
            <div className="flex items-center gap-2">
              {selected.icon && <span className="text-xl">{selected.icon}</span>}
              <span className="text-[15px] font-black text-taxi-text">{selected.label}</span>
              {selected.state && <span className="text-[12px] font-bold text-slate-400">· {selected.state}</span>}
            </div>
          ) : (
            <span className="text-[14px] font-bold text-slate-300">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {options.length === 0 ? (
              <div className="px-5 py-4 text-[13px] font-bold text-slate-300 text-center">
                No options available
              </div>
            ) : (
              options.map((opt, i) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => { onChange(opt.id); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-slate-50 transition-colors ${
                    value === opt.id ? 'bg-taxi-primary/5' : ''
                  } ${i !== 0 ? 'border-t border-slate-50' : ''}`}
                >
                  {opt.icon && <span className="text-xl shrink-0">{opt.icon}</span>}
                  <div className="flex-1 min-w-0">
                    <p className={`text-[14px] font-black tracking-tight ${value === opt.id ? 'text-taxi-primary' : 'text-taxi-text'}`}>
                      {opt.label}
                    </p>
                    {opt.description && (
                      <p className="text-[11px] font-bold text-slate-400 mt-0.5">{opt.description}</p>
                    )}
                    {opt.state && (
                      <p className="text-[11px] font-bold text-slate-400 mt-0.5">{opt.state}</p>
                    )}
                  </div>
                  {value === opt.id && <CheckCircle2 size={16} className="text-taxi-primary shrink-0" />}
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

const StepVehicle = () => {
  const navigate = useNavigate();

  // Admin-controlled options
  const activeServices  = useMemo(() => getActiveServices(), []);
  const activeLocations = useMemo(() => getActiveLocations(), []);

  const [formData, setFormData] = useState({
    serviceType: '',    // 'taxi' | 'delivery' | 'both'
    locationId:  '',    // location id from admin config
    vehicleType: '',    // vehicle type id
    brand:       '',
    plate:       '',
    color:       '',
  });

  // Service options including "Both"
  const serviceOptions = [
    ...activeServices.map(s => ({
      id: s.id,
      label: s.label,
      icon: s.icon,
      description: s.description,
    })),
    { id: 'both', label: 'Both Services', icon: '🚀', description: 'Offer Taxi + Delivery' },
  ];

  // Location options based on admin config
  const locationOptions = activeLocations.map(l => ({
    id: l.id,
    label: l.city,
    state: l.state,
    icon: '📍',
  }));

  // Vehicle type options — filtered by chosen location + service
  const vehicleOptions = useMemo(() => {
    if (!formData.locationId || !formData.serviceType) return [];
    return getVehicleTypesForLocation(formData.locationId, formData.serviceType).map(v => ({
      id: v.id,
      label: v.label,
      icon: v.icon,
    }));
  }, [formData.locationId, formData.serviceType]);

  // Reset downstream when upstream changes
  const handleServiceChange = (val) => {
    setFormData(p => ({ ...p, serviceType: val, vehicleType: '' }));
  };

  const handleLocationChange = (val) => {
    setFormData(p => ({ ...p, locationId: val, vehicleType: '' }));
  };

  const canProceed =
    formData.serviceType &&
    formData.locationId &&
    formData.vehicleType &&
    formData.plate.trim().length >= 5;

  const handleSave = () => {
    if (!canProceed) return;
    navigate('/taxi/driver/step-documents');
  };

  return (
    <div className="min-h-screen bg-taxi-bg font-sans select-none overflow-x-hidden pb-36 flex flex-col pt-4">

      {/* Sticky Header + Progress */}
      <div className="sticky top-0 z-50 bg-taxi-bg/95 backdrop-blur-md px-6 pt-4 border-b border-slate-100/50 mb-2">
        <header className="flex items-center justify-between mb-2">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-taxi-text active:scale-90 transition-transform"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-black text-taxi-text tracking-tight uppercase">Registration</h1>
          </div>
          <div className="w-10" />
        </header>
        <RegistrationProgress currentStep={2} totalSteps={4} />
      </div>

      <main className="flex-1 px-6 pt-6 space-y-10">

        {/* Page title */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h2 className="text-2xl font-black text-taxi-text leading-tight tracking-tight">
            Vehicle &amp; Service Details
          </h2>
          <p className="text-[14px] font-bold text-slate-400">
            Tell us what type of service you want to offer and which vehicle you'll use.
          </p>
        </motion.div>

        {/* ── STEP 1: Choose Service Type ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <SectionTitle
            step="1"
            title="Choose Service Type"
            subtitle="Select the type of service you want to register for."
          />

          {/* Service cards */}
          <div className="grid grid-cols-1 gap-3">
            {serviceOptions.map((svc, i) => (
              <motion.button
                key={svc.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                type="button"
                onClick={() => handleServiceChange(svc.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                  formData.serviceType === svc.id
                    ? 'bg-taxi-primary/5 border-taxi-primary shadow-md shadow-taxi-primary/10'
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-colors ${
                  formData.serviceType === svc.id ? 'bg-taxi-primary/10' : 'bg-slate-50'
                }`}>
                  {svc.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`text-[16px] font-black tracking-tight leading-none ${
                    formData.serviceType === svc.id ? 'text-taxi-text' : 'text-taxi-text/70'
                  }`}>{svc.label}</h4>
                  <p className="text-[12px] font-bold text-slate-400 mt-1">{svc.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  formData.serviceType === svc.id
                    ? 'border-taxi-primary bg-taxi-primary'
                    : 'border-slate-200'
                }`}>
                  {formData.serviceType === svc.id && (
                    <div className="w-2 h-2 rounded-full bg-taxi-text" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── STEP 2: Choose Service Location ─────────────────────────── */}
        <AnimatePresence>
          {formData.serviceType && (
            <motion.div
              key="location-step"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-4"
            >
              <SectionTitle
                step="2"
                title="Choose Service Location"
                subtitle="Select the city where you'll be providing service. Only admin-approved locations are listed."
              />

              <SelectDropdown
                label="Service Location"
                value={formData.locationId}
                onChange={handleLocationChange}
                options={locationOptions}
                placeholder="Select your city..."
                icon={MapPin}
              />

              {locationOptions.length === 0 && (
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
                  <Info size={15} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[12px] font-bold text-amber-700">No service locations are currently active. Contact admin to add your city.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── STEP 3: Choose Vehicle Type ──────────────────────────────── */}
        <AnimatePresence>
          {formData.serviceType && formData.locationId && (
            <motion.div
              key="vehicle-type-step"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-4"
            >
              <SectionTitle
                step="3"
                title="Choose Vehicle Type"
                subtitle={`Vehicle types available in ${activeLocations.find(l => l.id === formData.locationId)?.city || 'your city'} for your chosen service.`}
              />

              {vehicleOptions.length > 0 ? (
                <SelectDropdown
                  label="Vehicle Type"
                  value={formData.vehicleType}
                  onChange={(val) => setFormData(p => ({ ...p, vehicleType: val }))}
                  options={vehicleOptions}
                  placeholder="Select vehicle type..."
                  icon={Car}
                />
              ) : (
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
                  <Info size={15} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[12px] font-bold text-amber-700">
                    No vehicle types are available for your selected service and location. Please contact admin to configure this.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── STEP 4: Vehicle Details (existing fields) ────────────────── */}
        <AnimatePresence>
          {formData.vehicleType && (
            <motion.div
              key="vehicle-details-step"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.05 }}
              className="space-y-6"
            >
              <SectionTitle
                step="4"
                title="Vehicle Details"
                subtitle="Enter your vehicle's specific information. This must match your RC book."
              />

              {/* Brand & Model */}
              <div className="space-y-2">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Vehicle Brand &amp; Model</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                    <Database size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g., Honda Shine, Maruti WagonR"
                    value={formData.brand}
                    onChange={(e) => setFormData(p => ({ ...p, brand: e.target.value }))}
                    className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-14 pr-5 text-[15px] font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm focus:shadow-xl focus:shadow-taxi-primary/10"
                  />
                </div>
              </div>

              {/* Number Plate */}
              <div className="space-y-2">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Number Plate</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                    <Hash size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="MP 09 AB 1234"
                    value={formData.plate}
                    onChange={(e) => setFormData(p => ({ ...p, plate: e.target.value.toUpperCase() }))}
                    className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-14 pr-5 text-base font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm font-mono uppercase placeholder:normal-case placeholder:text-slate-200 placeholder:text-[14px] focus:shadow-xl focus:shadow-taxi-primary/10"
                  />
                </div>
              </div>

              {/* Color */}
              <div className="space-y-2">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Color</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                    <Palette size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="White, Silver, Black..."
                    value={formData.color}
                    onChange={(e) => setFormData(p => ({ ...p, color: e.target.value }))}
                    className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-14 pr-5 text-[15px] font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm focus:shadow-xl focus:shadow-taxi-primary/10"
                  />
                </div>
              </div>

              {/* Notice */}
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-start gap-4 mx-1">
                <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[11px] font-bold text-blue-700/80 leading-relaxed">
                  Ensure the number plate matches your RC book. Incorrect information may delay your approval by up to 3 working days.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom spacer for fixed button */}
        <div className="h-8" />
      </main>

      {/* Fixed Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 pt-3 pb-8 bg-white/80 backdrop-blur-xl z-50 border-t border-slate-50">
        <motion.button
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleSave}
          disabled={!canProceed}
          className={`w-full h-14 py-4 rounded-2xl flex items-center justify-center gap-3 text-[17px] font-black transition-all tracking-tight uppercase ${
            canProceed
              ? 'bg-taxi-primary text-taxi-text shadow-xl shadow-taxi-primary/20 border border-taxi-primary/80 active:scale-95'
              : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-100'
          }`}
        >
          {canProceed ? (
            <>Save &amp; Continue <ChevronRight size={22} strokeWidth={3} /></>
          ) : (
            'Complete All Steps Above'
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default StepVehicle;
