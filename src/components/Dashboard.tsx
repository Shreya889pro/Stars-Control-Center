import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useSimulation } from "@/hooks/useSimulation";
import LoadingScreen from "@/components/LoadingScreen";
import StatsBar from "@/components/StatsBar";
import TacticalMap from "@/components/TacticalMap";
import SoldierPanel from "@/components/SoldierPanel";
import AlertPanel from "@/components/AlertPanel";
import AlertToast from "@/components/AlertToast";
import ControlPanel from "@/components/ControlPanel";
import type { Soldier } from "@/data/simulation";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const sim = useSimulation();
  const [, setSelectedSoldier] = useState<Soldier | null>(null);

  const handleComplete = useCallback(() => setLoading(false), []);

  const handleSendBackup = useCallback(() => {
    // Send backup to the most critical soldier
    const critical = sim.soldiers.find(s => s.status === "critical") || sim.soldiers[0];
    sim.sendBackup(critical.id);
  }, [sim]);

  if (loading) {
    return (
      <AnimatePresence>
        <LoadingScreen onComplete={handleComplete} />
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Ambient effects */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="fixed inset-0 scanline pointer-events-none" />

      {/* Alert toasts */}
      <AlertToast alerts={sim.alerts} />

      {/* Header */}
      <header className="border-b border-border px-4 md:px-6 py-3 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary pulse-dot" />
          <h1 className="font-orbitron text-sm md:text-base tracking-[0.25em] text-primary text-glow">S.T.A.R.S.</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono-tech text-[10px] text-muted-foreground hidden md:block">
            {new Date().toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
          </span>
          <span className="font-mono-tech text-[10px] text-primary/60">
            SECTOR 7 — NORTH COMMAND
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="p-3 md:p-4 lg:p-6 space-y-4 relative z-10 max-w-[1600px] mx-auto">
        <StatsBar soldiers={sim.soldiers} missionStatus={sim.missionStatus} alertCount={sim.alerts.length} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Soldier Panel */}
          <div className="lg:col-span-3 space-y-4">
            <SoldierPanel soldiers={sim.soldiers} onSelect={setSelectedSoldier} />
          </div>

          {/* Center: Map */}
          <div className="lg:col-span-6">
            <TacticalMap soldiers={sim.soldiers} supplyRoute={sim.supplyRoute} onSelectSoldier={setSelectedSoldier} />
          </div>

          {/* Right: Alerts + Controls */}
          <div className="lg:col-span-3 space-y-4">
            <ControlPanel
              demoMode={sim.demoMode}
              onToggleDemo={() => sim.setDemoMode(!sim.demoMode)}
              onSendBackup={handleSendBackup}
              onTriggerAlert={sim.triggerAlert}
              onViewRoute={() => {/* map already shows route */}}
            />
            <AlertPanel alerts={sim.alerts} />
          </div>
        </div>
      </main>
    </div>
  );
}
