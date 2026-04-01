import { motion } from "framer-motion";
import { Send, AlertTriangle, MapPin, Play, Pause } from "lucide-react";

interface Props {
  demoMode: boolean;
  onToggleDemo: () => void;
  onSendBackup: () => void;
  onTriggerAlert: () => void;
  onViewRoute: () => void;
}

export default function ControlPanel({ demoMode, onToggleDemo, onSendBackup, onTriggerAlert, onViewRoute }: Props) {
  const buttons = [
    { label: "Send Backup", icon: Send, onClick: onSendBackup, variant: "primary" as const },
    { label: "Trigger Alert", icon: AlertTriangle, onClick: onTriggerAlert, variant: "danger" as const },
    { label: "View Route", icon: MapPin, onClick: onViewRoute, variant: "default" as const },
  ];

  const variantStyles = {
    primary: "border-primary/40 text-primary hover:bg-primary/10 active:bg-primary/20",
    danger: "border-destructive/40 text-destructive hover:bg-destructive/10 active:bg-destructive/20",
    default: "border-border text-foreground hover:bg-secondary/60 active:bg-secondary",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel p-3 md:p-4"
    >
      <h2 className="font-orbitron text-xs tracking-[0.2em] text-primary uppercase mb-3">Command Console</h2>

      <div className="space-y-2">
        {buttons.map(b => (
          <button
            key={b.label}
            onClick={b.onClick}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded border text-sm font-rajdhani font-semibold transition-all active:scale-[0.97] ${variantStyles[b.variant]}`}
          >
            <b.icon className="w-4 h-4" />
            {b.label}
          </button>
        ))}

        <div className="pt-2 border-t border-border">
          <button
            onClick={onToggleDemo}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded font-orbitron text-xs tracking-wider transition-all active:scale-[0.97] ${
              demoMode
                ? "bg-primary text-primary-foreground"
                : "border border-primary/40 text-primary hover:bg-primary/10"
            }`}
          >
            {demoMode ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {demoMode ? "DEMO ACTIVE" : "START DEMO"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
