import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, CheckCircle2, ChevronRight, ShieldCheck, X } from 'lucide-react';

// Simulate: first-time user hasn't uploaded DL yet
const IS_KYC_DONE = false;

const RentalKYC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  if (!state.vehicle) { navigate('/rental'); return null; }

  const [dlImage, setDlImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(IS_KYC_DONE);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    setDlImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (!dlImage && !done) return;
    setUploading(true);
    setTimeout(() => { setUploading(false); setDone(true); }, 1500);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F8FAFC_0%,#F3F4F6_38%,#EEF2F7_100%)] max-w-lg mx-auto font-sans pb-28 relative overflow-hidden">
      <div className="absolute -top-16 right-[-40px] h-44 w-44 rounded-full bg-orange-100/60 blur-3xl pointer-events-none" />

      <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-md px-5 pt-10 pb-4 sticky top-0 z-20 border-b border-white/80 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-[12px] border border-white/80 bg-white/90 flex items-center justify-center shadow-[0_4px_12px_rgba(15,23,42,0.07)] shrink-0">
            <ArrowLeft size={18} className="text-slate-900" strokeWidth={2.5} />
          </motion.button>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.26em] text-slate-400">Step 4 of 5 · KYC Verification</p>
            <h1 className="text-[18px] font-black tracking-tight text-slate-900 leading-tight">Driving License</h1>
          </div>
        </div>
      </motion.header>

      <div className="px-5 pt-5 space-y-4">
        {/* Info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="flex items-start gap-3 rounded-[16px] border border-white/80 bg-white/90 px-4 py-3.5 shadow-[0_4px_14px_rgba(15,23,42,0.04)]">
          <div className="w-8 h-8 rounded-[10px] bg-blue-50 flex items-center justify-center shrink-0">
            <ShieldCheck size={15} className="text-blue-500" strokeWidth={2} />
          </div>
          <p className="text-[12px] font-bold text-slate-500 leading-relaxed">
            Upload a clear photo of your valid Driving License. This is a one-time verification — you won't need to do this again.
          </p>
        </motion.div>

        {/* Upload area */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-[20px] border border-white/80 bg-white/90 shadow-[0_4px_14px_rgba(15,23,42,0.05)] overflow-hidden">
          {done ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 size={28} className="text-emerald-500" strokeWidth={2} />
              </div>
              <p className="text-[15px] font-black text-slate-900">KYC Verified</p>
              <p className="text-[12px] font-bold text-slate-400">Your driving license is on file.</p>
            </div>
          ) : preview ? (
            <div className="relative">
              <img src={preview} alt="DL preview" className="w-full h-48 object-cover" />
              <button onClick={() => { setPreview(null); setDlImage(null); }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                <X size={14} className="text-white" />
              </button>
            </div>
          ) : (
            <button onClick={() => inputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center py-10 gap-3 border-2 border-dashed border-slate-200 rounded-[20px] active:bg-slate-50 transition-all">
              <div className="w-12 h-12 rounded-[14px] bg-slate-50 flex items-center justify-center">
                <Upload size={20} className="text-slate-400" strokeWidth={2} />
              </div>
              <div className="text-center">
                <p className="text-[13px] font-black text-slate-700">Tap to upload DL photo</p>
                <p className="text-[11px] font-bold text-slate-400 mt-0.5">JPG, PNG · Max 5MB</p>
              </div>
            </button>
          )}
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={e => handleFile(e.target.files?.[0])} />
        </motion.div>

        {/* Upload button (only if image selected but not yet verified) */}
        <AnimatePresence>
          {preview && !done && (
            <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              whileTap={{ scale: 0.97 }} onClick={handleUpload} disabled={uploading}
              className="w-full bg-blue-600 text-white py-3.5 rounded-[16px] text-[13px] font-black flex items-center justify-center gap-2 shadow-[0_6px_16px_rgba(37,99,235,0.25)]">
              {uploading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Upload size={14} strokeWidth={3} /> Submit for Verification</>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg px-5 pb-6 pt-3 bg-gradient-to-t from-[#EEF2F7] via-[#F3F4F6]/95 to-transparent pointer-events-none z-30">
        <motion.button whileTap={{ scale: 0.98 }} disabled={!done}
          onClick={() => navigate('/rental/deposit', { state: { ...state } })}
          className={`pointer-events-auto w-full py-4 rounded-[18px] text-[15px] font-black text-white shadow-[0_8px_24px_rgba(15,23,42,0.18)] flex items-center justify-center gap-2 transition-all ${done ? 'bg-slate-900' : 'bg-slate-300'}`}>
          Continue to Deposit <ChevronRight size={17} strokeWidth={3} className="opacity-50" />
        </motion.button>
      </div>
    </div>
  );
};

export default RentalKYC;
