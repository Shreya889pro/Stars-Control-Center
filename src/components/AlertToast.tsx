import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Crosshair, Thermometer, ShieldAlert, X } from "lucide-react";
import type { Alert } from "@/data/simulation";

const ICONS = { enemy: Crosshair, health: AlertTriangle, temperature: Thermometer, perimeter: ShieldAlert };

interface Props {
  alerts: Alert[];
}

export default function AlertToast({ alerts }: Props) {
  // Only show latest 3
  const recent = alerts.slice(0, 3);

  return (
    <div className="fixed top-4 right-4 z-40 flex flex-col gap-2 w-72">
      <AnimatePresence>
        {recent.map(a => {
          const Icon = ICONS[a.type];
          const isHighSev = a.severity === "critical" || a.severity === "high";
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`${isHighSev ? "glass-panel-danger" : "glass-panel"} p-3 flex items-start gap-2`}
            >
              <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isHighSev ? "text-destructive" : "text-accent"}`} />
              <div className="flex-1 min-w-0">
                <p className="font-rajdhani text-xs text-foreground leading-tight">{a.message}</p>
                <p className="font-mono-tech text-[9px] text-muted-foreground mt-0.5 uppercase">{a.severity}</p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
