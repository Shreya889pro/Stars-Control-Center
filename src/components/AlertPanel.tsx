import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Crosshair, Thermometer, ShieldAlert } from "lucide-react";
import type { Alert } from "@/data/simulation";

const ICONS = {
  enemy: Crosshair,
  health: AlertTriangle,
  temperature: Thermometer,
  perimeter: ShieldAlert,
};

const SEV_STYLE = {
  critical: "border-destructive/50 bg-destructive/10",
  high: "border-accent/40 bg-accent/5",
  medium: "border-border",
  low: "border-border bg-card/30",
};

interface Props {
  alerts: Alert[];
}

export default function AlertPanel({ alerts }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel p-3 md:p-4"
    >
      <h2 className="font-orbitron text-xs tracking-[0.2em] text-primary uppercase mb-3">Alert History</h2>

      <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {alerts.length === 0 && (
            <p className="font-mono-tech text-xs text-muted-foreground text-center py-4">No alerts — all clear</p>
          )}
          {alerts.slice(0, 20).map(a => {
            const Icon = ICONS[a.type];
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: 20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-2 p-2 rounded border ${SEV_STYLE[a.severity]}`}
              >
                <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${a.severity === "critical" ? "text-destructive" : a.severity === "high" ? "text-accent" : "text-muted-foreground"}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-rajdhani text-xs text-foreground leading-tight">{a.message}</p>
                  <p className="font-mono-tech text-[9px] text-muted-foreground mt-0.5">
                    {a.timestamp.toLocaleTimeString()} · <span className="uppercase">{a.severity}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
