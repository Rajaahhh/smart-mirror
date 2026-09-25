import React from 'react';
import {
  Cpu,
  CheckCircle,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  HeartHandshake,
  Activity,
} from 'lucide-react';

interface AlgorithmStatusProps {
  complimentsCount: number;
  confidence: number;
  isScanning: boolean;
}

export const AlgorithmStatus: React.FC<AlgorithmStatusProps> = ({
  complimentsCount,
  confidence,
  isScanning,
}) => {
  return (
    <section id="algorithm" className="w-full max-w-4xl mx-auto py-6 px-4 sm:px-6">
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-pink-400 mb-1">
              <Activity className="h-3.5 w-3.5 animate-pulse text-pink-400" />
              <span>DIAGNOSTIC TELEMETRY ENGINE</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">
              Funny Statistics Panel
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Empirical metrics computed in real-time by the neural flattery algorithm.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-2 flex items-center gap-3">
              <HeartHandshake className="h-5 w-5 text-pink-400" />
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Compliments Generated</div>
                <div className="font-mono text-xl font-bold text-white tabular-nums">
                  {complimentsCount}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-2 flex items-center gap-3">
              <Cpu className="h-5 w-5 text-indigo-400" />
              <div>
                <div className="text-[11px] text-slate-400 font-medium">AI Confidence</div>
                <div className="font-mono text-xl font-bold text-pink-400 tabular-nums">
                  {confidence.toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 6 exact required metrics from prompt:
            1. Facial Analysis: COMPLETE
            2. Beauty Detection: 100%
            3. AI Confidence: 100%
            4. Neural Network: Definitely Real
            5. Scientific Evidence: Questionable
            6. Compliments Generated: 0 (increases with each scan) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
          {/* 1. Facial Analysis: COMPLETE */}
          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 flex items-start justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Facial Analysis</span>
              <span className="text-sm font-semibold text-white mt-1 block">
                {isScanning ? 'SCANNING...' : 'COMPLETE'}
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <CheckCircle className="h-3.5 w-3.5" /> OK
            </span>
          </div>

          {/* 2. Beauty Detection: 100% */}
          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 flex items-start justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Beauty Detection</span>
              <span className="text-sm font-semibold text-pink-300 mt-1 block">
                100%
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-pink-400">
              <ShieldCheck className="h-3.5 w-3.5" /> MAX
            </span>
          </div>

          {/* 3. AI Confidence: 100% */}
          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 flex items-start justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium block">AI Confidence</span>
              <span className="text-sm font-semibold text-white mt-1 block">
                100%
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" /> INFALLIBLE
            </span>
          </div>

          {/* 4. Neural Network: Definitely Real */}
          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 flex items-start justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Neural Network</span>
              <span className="text-sm font-semibold text-white mt-1 block">
                Definitely Real
              </span>
            </div>
            <span className="text-xs font-mono text-indigo-400">Active</span>
          </div>

          {/* 5. Scientific Evidence: Questionable */}
          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 flex items-start justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Scientific Evidence</span>
              <span className="text-sm font-semibold text-amber-200 mt-1 block">
                Questionable
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-mono text-amber-400/80">
              <HelpCircle className="h-3.5 w-3.5" /> Unchecked
            </span>
          </div>

          {/* 6. Compliments Generated: [count] */}
          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 flex items-start justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Compliments Generated</span>
              <span className="text-sm font-semibold text-white mt-1 font-mono tabular-nums">
                {complimentsCount}
              </span>
            </div>
            <span className="text-xs font-mono text-pink-400">+1 per scan</span>
          </div>
        </div>

        {/* Real-time confidence bar */}
        <div className="rounded-2xl bg-black/40 border border-white/5 p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium">Beauty Analysis Certainty Vector</span>
            <span className="font-mono text-pink-400 font-bold tabular-nums">
              {confidence.toFixed(0)}% (Unquestionable)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out shadow-[0_0_12px_#ec4899]"
              style={{ width: `${confidence}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-[11px] text-slate-500 font-mono">
            <span>Minimum Viable Flattery</span>
            <span>Mathematical Fact</span>
          </div>
        </div>
      </div>
    </section>
  );
};

