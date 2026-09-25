import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface TopBarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onScanClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ soundEnabled, onToggleSound, onScanClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#090b10]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Zone 1: Single text wordmark */}
        <a href="#mirror" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-white hover:text-pink-300 transition-colors">
          <div className="h-2 w-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
          <span>SMART MIRROR</span>
        </a>

        {/* Zone 2: Clean 4-6 text links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#mirror" className="hover:text-white transition-colors">Virtual Mirror</a>
          <a href="#algorithm" className="hover:text-white transition-colors">Algorithm Status</a>
          <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
          <a href="#science" className="hover:text-white transition-colors">Scientific Review</a>
        </nav>

        {/* Zone 3: Primary action + sound control */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onScanClick();
            }}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-pink-500/20 hover:from-pink-400 hover:to-indigo-500 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Start Mirror</span>
          </button>
        </div>
      </div>
    </header>
  );
};
