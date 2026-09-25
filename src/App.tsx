import { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { SmartMirror } from './components/SmartMirror';
import { AlgorithmStatus } from './components/AlgorithmStatus';
import { SpecsSection } from './components/SpecsSection';
import { EasterEggModal } from './components/EasterEggModal';
import { Footer } from './components/Footer';
import { sound } from './utils/audio';

export default function App() {
  const [complimentsCount, setComplimentsCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('smart_mirror_compliments');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [confidence, setConfidence] = useState<number>(100);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [easterEggOpen, setEasterEggOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('smart_mirror_compliments', complimentsCount.toString());
    } catch {
      // LocalStorage not available
    }
  }, [complimentsCount]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
  };

  const handleIncrementCompliments = () => {
    setComplimentsCount((prev) => prev + 1);
  };

  const handleTopBarScan = () => {
    const mirrorElem = document.getElementById('mirror');
    if (mirrorElem) {
      mirrorElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col selection:bg-pink-500/30 selection:text-pink-200">
      {/* Top Navigation */}
      <TopBar
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onScanClick={handleTopBarScan}
      />

      {/* Main Content Flow */}
      <main className="flex-1 flex flex-col items-center w-full">
        {/* Central Smart Mirror Stage */}
        <SmartMirror
          complimentsCount={complimentsCount}
          onIncrementCompliments={handleIncrementCompliments}
          onOpenEasterEggModal={() => setEasterEggOpen(true)}
          confidence={confidence}
          setConfidence={setConfidence}
          isScanning={isScanning}
          setIsScanning={setIsScanning}
        />

        {/* Beauty Algorithm Status Panel */}
        <AlgorithmStatus
          complimentsCount={complimentsCount}
          confidence={confidence}
          isScanning={isScanning}
        />

        {/* Over-Engineering Architecture & Scientific Review */}
        <SpecsSection />
      </main>

      {/* Easter Egg Modal for "What if I'm not?" */}
      <EasterEggModal
        isOpen={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
