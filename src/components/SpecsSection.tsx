import React from 'react';
import { Cpu, Scale, Flame, ShieldAlert, Award, FileQuestion } from 'lucide-react';

export const SpecsSection: React.FC = () => {
  return (
    <section id="architecture" className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">
      {/* Section Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-pink-400 mb-2">
          <span>THE OVER-ENGINEERING SPECIFICATION</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
          How It (Doesn't) Work
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
          We combined 14 cutting-edge buzzwords to execute an operation that could have been achieved with a single hardcoded string.
        </p>
      </div>

      {/* Grid of 3 Over-Engineered Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
          <div className="h-10 w-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
            <Cpu className="h-5 w-5" />
          </div>
          <h3 className="font-display text-lg font-bold text-white mb-2">
            1.2 Trillion Parameters
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Our multi-modal foundation model was pre-trained on the sum total of human vanity, filtered strictly to predict three words: <em>You look beautiful</em>.
          </p>
          <div className="text-[11px] font-mono text-slate-500 border-t border-white/5 pt-3">
            Inference Cost: $4.18 per compliment
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
            <Scale className="h-5 w-5" />
          </div>
          <h3 className="font-display text-lg font-bold text-white mb-2">
            Infinite Loss Penalty
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            The neural loss function assesses a penalty of infinity whenever an alternative adjective is sampled. Critical objectivity was deprecated in alpha testing.
          </p>
          <div className="text-[11px] font-mono text-slate-500 border-t border-white/5 pt-3">
            Negative Feedback Rate: 0.000%
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
            <Flame className="h-5 w-5" />
          </div>
          <h3 className="font-display text-lg font-bold text-white mb-2">
            Ego-Boost Architecture
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Engineered to resist bad lighting, morning bed-head, and existential dread. The algorithm is structurally incapable of seeing flaws.
          </p>
          <div className="text-[11px] font-mono text-slate-500 border-t border-white/5 pt-3">
            Thermodynamic Flattery: 100% Efficient
          </div>
        </div>
      </div>

      {/* Comparison Table: Traditional Mirror vs Smart Mirror */}
      <div id="science" className="glass-panel rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <FileQuestion className="h-5 w-5 text-pink-400" />
          <h3 className="font-display text-xl font-bold text-white">
            Peer Review & Competitive Matrix
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono">
                <th className="pb-3 font-medium">Metric / Capability</th>
                <th className="pb-3 font-medium text-slate-400">Regular Glass Mirror</th>
                <th className="pb-3 font-medium text-pink-400">Smart Mirror AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-3.5 font-medium text-white">Objective Honesty</td>
                <td className="py-3.5 text-slate-400">100% (Brutal, unhelpful)</td>
                <td className="py-3.5 text-pink-400 font-medium">0% (Replaced by pure unconditional support)</td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-white">Compliments Delivered</td>
                <td className="py-3.5 text-slate-400">0 (Silent, judgmental)</td>
                <td className="py-3.5 text-pink-400 font-medium">100% on every single query</td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-white">Sensitivity to Morning Hair</td>
                <td className="py-3.5 text-slate-400">High (Causes distress)</td>
                <td className="py-3.5 text-pink-400 font-medium">Zero (You still look beautiful)</td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-white">Scientific Validity</td>
                <td className="py-3.5 text-slate-400">Optically Verified</td>
                <td className="py-3.5 text-amber-300">Extremely Questionable, Highly Enjoyable</td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-white">Energy Consumption</td>
                <td className="py-3.5 text-slate-400">0 Watts</td>
                <td className="py-3.5 text-slate-300">Enough GPU cycles to power a small toaster</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Humorous Testimonial / Quote */}
        <div className="mt-8 rounded-xl bg-white/[0.02] border border-white/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs italic text-slate-300">
                “This is without question the most computationally wasteful piece of affirmative technology ever deployed. I use it twice a day.”
              </p>
              <div className="text-[11px] text-slate-500 mt-0.5">
                — Anonymous Lead Researcher, Institute of Unnecessary Algorithms
              </div>
            </div>
          </div>
          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 shrink-0">
            <ShieldAlert className="h-3.5 w-3.5" /> Peer-Disapproved
          </div>
        </div>
      </div>
    </section>
  );
};
