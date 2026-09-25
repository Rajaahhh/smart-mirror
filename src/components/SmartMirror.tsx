import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  CameraOff,
  Sparkles,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Check,
  Copy,
  Maximize2,
  Minimize2,
  Lock,
} from 'lucide-react';
import { sound } from '../utils/audio';
import { triggerSparkles } from '../utils/confetti';

interface SmartMirrorProps {
  complimentsCount: number;
  onIncrementCompliments: () => void;
  onOpenEasterEggModal?: () => void;
  confidence: number;
  setConfidence: (val: number) => void;
  isScanning: boolean;
  setIsScanning: (val: boolean) => void;
}

export const SmartMirror: React.FC<SmartMirrorProps> = ({
  complimentsCount,
  onIncrementCompliments,
  confidence: _confidence,
  setConfidence,
  isScanning,
  setIsScanning,
}) => {
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanStepIndex, setScanStepIndex] = useState<number>(0);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [resultRevealed, setResultRevealed] = useState<boolean>(false);
  const [revealHeading, setRevealHeading] = useState<string>('YOU LOOK BEAUTIFUL');
  const [isGlitchingError, setIsGlitchingError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreenMirror, setIsFullscreenMirror] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mirrorContainerRef = useRef<HTMLDivElement | null>(null);

  // Exact 6 fake analysis messages requested:
  const scanSteps = [
    'Initializing beauty sensors…',
    'Scanning facial symmetry…',
    'Analyzing visual data…',
    'Consulting neural network…',
    'Calculating beauty coefficient…',
    'Result confirmed…',
  ];

  // Request real front-facing camera with exact parameters specified
  const startCamera = async () => {
    sound.playClick();
    setCameraError(null);

    if (
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setCameraError("No camera detected. Even our useless AI can't fix this one.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setCameraActive(true);
      setCameraError(null);
    } catch (err: unknown) {
      const error = err as { name?: string; message?: string };
      if (
        error.name === 'NotAllowedError' ||
        error.name === 'PermissionDeniedError'
      ) {
        setCameraError(
          'The mirror needs camera access to see you. Please allow camera permission and try again.'
        );
      } else if (
        error.name === 'NotFoundError' ||
        error.name === 'DevicesNotFoundError'
      ) {
        setCameraError(
          "No camera detected. Even our useless AI can't fix this one."
        );
      } else {
        setCameraError(
          'The mirror needs camera access to see you. Please allow camera permission and try again.'
        );
      }
      setCameraActive(false);
    }
  };

  // Immediate stop of all camera media tracks
  const stopCamera = () => {
    sound.playClick();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Fake AI scan execution
  const executeScan = useCallback(
    (isSecondaryCheck = false) => {
      if (isScanning) return;
      sound.playClick();
      setIsScanning(true);
      setResultRevealed(false);
      setIsGlitchingError(false);
      setScanProgress(0);
      setScanStepIndex(0);
      setConfidence(0);

      const totalDuration = 2600; // 2.6 seconds
      const stepDuration = totalDuration / scanSteps.length;
      const startTime = Date.now();

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progressRatio = Math.min(1, elapsed / totalDuration);

        setScanProgress(Math.floor(progressRatio * 100));
        setConfidence(Math.floor(progressRatio * 100));

        const currentStep = Math.min(
          scanSteps.length - 1,
          Math.floor(elapsed / stepDuration)
        );
        setScanStepIndex(currentStep);

        if (elapsed % 420 < 55) {
          sound.playScanBlip(620 + progressRatio * 380);
        }

        if (progressRatio >= 1) {
          clearInterval(interval);
          setIsScanning(false);
          setConfidence(100);
          setResultRevealed(true);
          setRevealHeading(
            isSecondaryCheck
              ? 'We checked again. Still beautiful.'
              : 'YOU LOOK BEAUTIFUL'
          );
          onIncrementCompliments();

          sound.playRevealChime();
          setTimeout(() => {
            triggerSparkles(canvasRef.current);
          }, 120);
        }
      }, 45);
    },
    [isScanning, onIncrementCompliments, scanSteps.length, setConfidence, setIsScanning]
  );

  // Easter Egg Handler: "WHAT IF I'M NOT?" -> "ERROR 404: UGLY NOT FOUND." -> "YOU LOOK BEAUTIFUL."
  const handleEasterEgg = () => {
    sound.playParadoxTone();
    setIsGlitchingError(true);

    setTimeout(() => {
      setIsGlitchingError(false);
      setRevealHeading('YOU LOOK BEAUTIFUL');
      sound.playRevealChime();
    }, 2800);
  };

  const copyAffirmation = () => {
    sound.playClick();
    const text = `Certified by Smart Mirror v1.0:\n"${revealHeading}"\nAI confidence: 100% · After extensive scientific research, our AI has reached this completely unbiased conclusion.`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      })
      .catch(() => {});
  };

  const toggleFullscreen = () => {
    sound.playClick();
    setIsFullscreenMirror(!isFullscreenMirror);
  };

  return (
    <section id="mirror" className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-10">
      {/* Title & Concept Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/5 px-3 py-1 text-xs font-mono text-pink-300 mb-3">
          <Sparkles className="h-3 w-3 text-pink-400" />
          <span>DELIBERATELY USELESS AI SYSTEM</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
          Smart Mirror
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-lg mx-auto">
          An over-engineered AI mirror with one sacred purpose: looking at you through your webcam and asserting the undisputed truth.
        </p>
      </div>

      {/* Main Mirror Frame */}
      <div
        ref={mirrorContainerRef}
        className={`relative transition-all duration-300 ${
          isFullscreenMirror
            ? 'fixed inset-0 z-50 bg-[#07090e] p-4 sm:p-8 flex flex-col justify-center items-center'
            : 'w-full'
        }`}
      >
        <div className="w-full rounded-3xl p-1 bg-gradient-to-b from-white/20 via-pink-500/25 to-indigo-500/25 shadow-2xl shadow-purple-950/50">
          <div className="relative rounded-[22px] bg-[#0c0f18] overflow-hidden border border-white/10">
            {/* Mirror Frame Header Bar */}
            <div className="relative z-20 flex items-center justify-between border-b border-white/10 px-5 py-3 bg-black/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                {/* LIVE MIRROR Badge requested */}
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono font-medium text-slate-300">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      cameraActive
                        ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse'
                        : 'bg-slate-500'
                    }`}
                  />
                  <span>LIVE MIRROR</span>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <span className="text-slate-600">|</span>
                  <span>OPTICAL PROTOCOL v1.0</span>
                </div>
              </div>

              {/* Top frame controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                  title={isFullscreenMirror ? 'Exit Fullscreen' : 'Fullscreen Mirror View'}
                  aria-label={isFullscreenMirror ? 'Exit Fullscreen' : 'Fullscreen Mirror View'}
                >
                  {isFullscreenMirror ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Video & Display Stage */}
            <div className="relative min-h-[380px] sm:min-h-[480px] flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-gradient-to-b from-[#0b0e16] via-[#080a11] to-[#06080e]">
              {/* Particle Sparkle Canvas */}
              <canvas
                ref={canvasRef}
                className="pointer-events-none absolute inset-0 z-30 h-full w-full"
              />

              {/* REAL WEBCAM FEED: Flipped horizontally via scale-x-[-1] */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`absolute inset-0 h-full w-full object-cover scale-x-[-1] transition-opacity duration-500 ${
                  cameraActive ? 'opacity-90' : 'opacity-0 pointer-events-none'
                }`}
              />

              {/* Futuristic Cybernetic HUD Graphics Around the Video */}
              <div className="pointer-events-none absolute inset-0 z-10">
                {/* 4 Tech Corner Brackets */}
                <div className="absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2 border-pink-500/60 rounded-tl-lg" />
                <div className="absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2 border-pink-500/60 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-indigo-500/60 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-indigo-500/60 rounded-br-lg" />

                {/* HUD Crosshairs & Grid Coordinates */}
                <div className="absolute top-5 left-16 text-[10px] font-mono text-pink-400/70 tracking-widest hidden sm:block">
                  CAM_FEED // 1080P_MIRROR_FLIP [X-INVERT]
                </div>
                <div className="absolute top-5 right-16 text-[10px] font-mono text-indigo-400/70 tracking-widest hidden sm:block">
                  BEAUTY_COEFF: 1.000000 [CONSTANT]
                </div>
                <div className="absolute bottom-5 left-16 text-[10px] font-mono text-slate-500 hidden sm:block">
                  TARGET_LOCK: ACTIVE
                </div>
                <div className="absolute bottom-5 right-16 text-[10px] font-mono text-slate-500 hidden sm:block">
                  BIAS: MAXIMUM_FLATTERY
                </div>

                {/* Concentric scanning circular reticle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`h-64 w-64 sm:h-80 sm:w-80 rounded-full border border-pink-500/20 transition-all duration-500 ${
                      isScanning
                        ? 'border-pink-500/70 scale-105 animate-pulse-ring'
                        : 'opacity-40'
                    }`}
                  />
                  <div
                    className={`absolute h-44 w-44 sm:h-56 sm:w-56 rounded-full border border-dashed border-indigo-400/30 transition-all ${
                      isScanning ? 'border-indigo-400/80 animate-radar' : 'opacity-30'
                    }`}
                  />
                  {isScanning && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent shadow-[0_0_20px_#ec4899] animate-scan-line" />
                  )}
                </div>
              </div>

              {/* Soft glass reflection vignette */}
              <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-black/30 to-black/80" />

              {/* OVERLAY STATES */}
              <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-lg w-full">
                {/* 1. CAMERA PERMISSION / HARDWARE ERROR STATE */}
                {cameraError && (
                  <div className="p-6 rounded-2xl bg-black/85 border border-amber-500/40 backdrop-blur-xl text-center max-w-md animate-in fade-in duration-300">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <p className="text-sm text-amber-200 leading-relaxed font-medium mb-4">
                      {cameraError}
                    </p>
                    <button
                      onClick={startCamera}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-pink-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg active:scale-95 transition-all"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>TRY AGAIN</span>
                    </button>
                  </div>
                )}

                {/* 2. CAMERA INACTIVE (STANDBY) PROMPT */}
                {!cameraActive && !cameraError && (
                  <div className="flex flex-col items-center py-8">
                    <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                      <Camera className="h-8 w-8 text-pink-400 animate-pulse" />
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                      Mirror Standby
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-xs mb-6">
                      Click <strong className="text-white">START MIRROR</strong> below to activate your webcam feed with 100% private local reflection.
                    </p>
                  </div>
                )}

                {/* 3. SCANNING IN PROGRESS OVER LIVE CAMERA */}
                {isScanning && (
                  <div className="flex flex-col items-center py-6 w-full max-w-sm rounded-2xl bg-black/60 border border-pink-500/30 p-6 backdrop-blur-md animate-in zoom-in-95">
                    <div className="relative mb-4 flex h-16 w-16 items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-pink-500/50 animate-ping" />
                      <Sparkles className="h-8 w-8 text-pink-400 animate-spin" style={{ animationDuration: '4s' }} />
                    </div>

                    <div className="h-7 mb-3 flex items-center justify-center">
                      <p className="font-mono text-sm font-semibold text-pink-300 animate-pulse">
                        {scanSteps[scanStepIndex]}
                      </p>
                    </div>

                    <div className="w-full bg-white/10 rounded-full h-2 p-0.5 border border-white/10 mb-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-75 shadow-[0_0_12px_#ec4899]"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between w-full text-[11px] font-mono text-slate-400">
                      <span>Neural Pass {scanStepIndex + 1}/{scanSteps.length}</span>
                      <span className="text-pink-400 font-bold tabular-nums">{scanProgress}%</span>
                    </div>
                  </div>
                )}

                {/* 4. RESULT REVEALED */}
                {!isScanning && resultRevealed && cameraActive && (
                  <div className="flex flex-col items-center py-4 w-full rounded-2xl bg-black/60 border border-pink-500/30 p-5 sm:p-7 backdrop-blur-md animate-in zoom-in-95 duration-400">
                    {/* Easter Egg Glitch Error State */}
                    {isGlitchingError ? (
                      <div className="animate-pulse py-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-500/20 px-4 py-1 text-xs font-mono font-bold text-red-300 mb-3 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                          <AlertTriangle className="h-4 w-4" />
                          <span>FATAL PARADOX EXCEPTION</span>
                        </div>
                        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-200 to-red-400 drop-shadow-[0_0_25px_rgba(239,68,68,0.8)]">
                          ERROR 404: UGLY NOT FOUND.
                        </h2>
                        <p className="mt-2 text-xs font-mono text-slate-400">
                          Query cancelled. Restoring empirical truth...
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Dramatic Large Glowing Headline */}
                        <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-300 drop-shadow-[0_0_35px_rgba(236,72,153,0.7)]">
                          ✨ {revealHeading} ✨
                        </h2>

                        {/* Under it: AI confidence: 100% */}
                        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/15 px-3.5 py-1 text-xs font-mono font-semibold text-pink-300 shadow-[0_0_12px_rgba(236,72,153,0.3)]">
                          <ShieldCheck className="h-3.5 w-3.5 text-pink-400" />
                          <span>AI confidence: 100%</span>
                        </div>

                        {/* And required conclusion quote */}
                        <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                          “After extensive scientific research, our AI has reached this completely unbiased conclusion.”
                        </p>

                        {/* Actions: "I DON'T BELIEVE YOU", "WHAT IF I'M NOT?", Copy */}
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                          {/* "I DON'T BELIEVE YOU" button */}
                          <button
                            onClick={() => executeScan(true)}
                            className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-2.5 text-xs font-semibold text-white shadow-lg active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                          >
                            <RefreshCw className="h-3.5 w-3.5 text-pink-400" />
                            <span>I DON'T BELIEVE YOU</span>
                          </button>

                          {/* Easter egg button: "WHAT IF I'M NOT?" */}
                          <button
                            onClick={handleEasterEgg}
                            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2.5 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                          >
                            <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
                            <span>WHAT IF I'M NOT?</span>
                          </button>

                          {/* Share / Copy button */}
                          <button
                            onClick={copyAffirmation}
                            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Copy result"
                          >
                            {copied ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-emerald-300">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5 text-slate-400" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Inner Frame Info Bar */}
            <div className="border-t border-white/10 bg-black/60 px-5 py-2.5 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-slate-300 font-medium">
                  🔒 Camera stays on your device. No video is uploaded or stored.
                </span>
              </div>

              <div className="hidden sm:block text-[11px] font-mono text-slate-500">
                Compliments: {complimentsCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BELOW THE MIRROR CONTROLS AS SPECIFIED:
          "Below the mirror: SMART MIRROR v1.0 And a button: START MIRROR. Once the camera starts, replace the button with: STOP CAMERA"
          "After the camera is running, provide a button: SCAN MY BEAUTY" */}
      <div className="mt-6 flex flex-col items-center justify-center text-center">
        <div className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">
          SMART MIRROR v1.0
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Main camera toggle button: START MIRROR / STOP CAMERA */}
          {!cameraActive ? (
            <button
              onClick={startCamera}
              className="group relative inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Camera className="h-5 w-5" />
              <span>START MIRROR</span>
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 px-6 py-4 text-sm font-semibold text-slate-200 hover:text-white shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <CameraOff className="h-4 w-4 text-red-400" />
              <span>STOP CAMERA</span>
            </button>
          )}

          {/* SCAN MY BEAUTY button (provided after camera is running) */}
          {cameraActive && (
            <button
              onClick={() => executeScan(false)}
              disabled={isScanning}
              className="group relative inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-pink-500/35 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer"
            >
              <Sparkles className="h-5 w-5 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="tracking-wide">SCAN MY BEAUTY</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

