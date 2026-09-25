import React from 'react';
import { ShieldAlert, CheckCircle2, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl border border-pink-500/30 bg-[#0d101a] p-6 sm:p-8 shadow-2xl shadow-pink-500/20 text-center"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-400">
          <ShieldAlert className="h-7 w-7 animate-pulse" />
        </div>

        <div className="mb-2 text-xs font-mono tracking-widest uppercase text-pink-400">
          SYSTEM OVERRIDE // EXCEPTION CAUGHT
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-4">
          Impossible. The AI said you're beautiful.
        </h3>

        <div className="space-y-3 text-sm text-slate-300 leading-relaxed text-left rounded-xl bg-white/[0.03] border border-white/5 p-4 mb-6">
          <p>
            Our neural network evaluated 175 billion non-existent tensor weights across 64 hypothetical layers. The computed probability of your aesthetic magnificence is exactly <span className="font-mono text-pink-300 font-semibold">100.000%</span>.
          </p>
          <p className="text-slate-400 text-xs">
            Any fleeting feelings of self-doubt or imposter syndrome have been classified as an unsanctioned firmware anomaly and formally rejected by the consensus algorithm.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-pink-500/25 hover:from-pink-400 hover:to-indigo-500 transition-all text-sm"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>I Accept The AI's Verdict</span>
          </button>
        </div>
      </div>
    </div>
  );
};
