import { useState, useEffect, useCallback, useRef } from "react";
import { Soldier, Alert, SupplyRoute, INITIAL_SOLDIERS, ALERT_TEMPLATES, DANGER_ZONES } from "@/data/simulation";

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

export function useSimulation() {
  const [soldiers, setSoldiers] = useState<Soldier[]>(INITIAL_SOLDIERS);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [supplyRoute, setSupplyRoute] = useState<SupplyRoute>({
    id: "sr1", from: { x: 10, y: 90 }, to: { x: 78, y: 38 }, progress: 0, eta: 12, status: "en-route",
  });
  const [demoMode, setDemoMode] = useState(false);
  const [missionStatus, setMissionStatus] = useState<"Active" | "Safe" | "Critical">("Active");
  const alertCounter = useRef(0);

  const addAlert = useCallback((template?: { type: Alert["type"]; severity: Alert["severity"]; message: string }, soldierId?: string) => {
    const t = template || ALERT_TEMPLATES[Math.floor(Math.random() * ALERT_TEMPLATES.length)];
    const newAlert: Alert = {
      id: `alert-${++alertCounter.current}`,
      ...t,
      timestamp: new Date(),
      soldierId,
    };
    setAlerts(prev => [newAlert, ...prev].slice(0, 50));
    return newAlert;
  }, []);

  // Soldier movement simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSoldiers(prev => prev.map(s => {
        const dx = (Math.random() - 0.5) * 2.5;
        const dy = (Math.random() - 0.5) * 2.5;
        const healthDelta = (Math.random() - 0.4) * 2;
        const batteryDelta = -Math.random() * 0.5;
        const newHealth = clamp(s.health + healthDelta, 10, 100);
        const newBattery = clamp(s.battery + batteryDelta, 5, 100);
        let status: Soldier["status"] = "safe";
        if (newHealth < 40) status = "critical";
        else if (newHealth < 70) status = "danger";

        // Check if near danger zone
        for (const dz of DANGER_ZONES) {
          const dist = Math.sqrt((s.x - dz.x) ** 2 + (s.y - dz.y) ** 2);
          if (dist < dz.radius + 5) status = status === "critical" ? "critical" : "danger";
        }

        return {
          ...s,
          x: clamp(s.x + dx, 2, 98),
          y: clamp(s.y + dy, 2, 98),
          health: Math.round(newHealth),
          battery: Math.round(newBattery),
          status,
          lastUpdate: new Date(),
        };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Supply route animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSupplyRoute(prev => {
        const newProgress = prev.progress + 0.008;
        if (newProgress >= 1) {
          return { ...prev, progress: 0, eta: 12, status: "en-route" as const };
        }
        return { ...prev, progress: newProgress, eta: Math.round(12 * (1 - newProgress)), status: "en-route" as const };
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Demo mode — auto alerts
  useEffect(() => {
    if (!demoMode) return;
    const interval = setInterval(() => {
      addAlert();
    }, 4000);
    return () => clearInterval(interval);
  }, [demoMode, addAlert]);

  // Mission status derivation
  useEffect(() => {
    const criticals = soldiers.filter(s => s.status === "critical").length;
    const dangers = soldiers.filter(s => s.status === "danger").length;
    if (criticals >= 2) setMissionStatus("Critical");
    else if (dangers >= 2 || criticals >= 1) setMissionStatus("Active");
    else setMissionStatus("Safe");
  }, [soldiers]);

  const sendBackup = useCallback((soldierId: string) => {
    addAlert({ type: "perimeter", severity: "low", message: `Backup dispatched to ${soldiers.find(s => s.id === soldierId)?.callsign || "unit"}` }, soldierId);
    setSoldiers(prev => prev.map(s => s.id === soldierId ? { ...s, health: clamp(s.health + 20, 0, 100) } : s));
  }, [soldiers, addAlert]);

  const triggerAlert = useCallback(() => { addAlert(); }, [addAlert]);

  return { soldiers, alerts, supplyRoute, demoMode, setDemoMode, missionStatus, sendBackup, triggerAlert, addAlert };
}
