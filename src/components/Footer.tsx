import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 py-8 px-4 sm:px-6 mt-12 bg-[#06080d]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2 font-display font-bold text-slate-400">
          <div className="h-1.5 w-1.5 rounded-full bg-pink-500" />
          <span>SMART MIRROR</span>
          <span className="font-normal font-sans text-slate-600">· Over-Engineered Useless AI</span>
        </div>

        <div className="text-center sm:text-right text-[11px] text-slate-600">
          No facial images are analyzed, captured, or uploaded. Strictly for comedic effect.
        </div>
      </div>
    </footer>
  );
};
