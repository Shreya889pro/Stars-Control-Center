import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "Initializing STARS Protocol…",
  "Connecting to Satellite Network…",
  "Establishing Secure Uplink…",
  "Loading Soldier Telemetry…",
  "Mapping Threat Zones…",
  "System Online.",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex(prev => {
        if (prev >= MESSAGES.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => Math.min(prev + 2, 100));
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 scanline" />

      {/* Radar */}
      <div className="relative w-32 h-32 mb-10">
        <div className="absolute inset-0 rounded-full border border-primary/30" />
        <div className="absolute inset-3 rounded-full border border-primary/20" />
        <div className="absolute inset-6 rounded-full border border-primary/10" />
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="radar-sweep absolute top-1/2 left-1/2 w-1/2 h-[2px] origin-left"
            style={{ background: "linear-gradient(90deg, hsl(155 100% 50% / 0.8), transparent)" }} />
        </div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary pulse-dot" />
      </div>

      <h1 className="font-orbitron text-2xl md:text-3xl tracking-[0.3em] text-primary text-glow mb-6">
        S.T.A.R.S.
      </h1>
      <p className="font-mono-tech text-xs tracking-widest text-muted-foreground mb-8 uppercase">
        Soldier Tracking & Alert Response System
      </p>

      <div className="w-64 h-1 bg-secondary rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-primary rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      <div className="h-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="font-mono-tech text-sm text-primary/80"
          >
            {MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
