import { motion } from "framer-motion";
import { Shield, AlertTriangle, Users, Thermometer } from "lucide-react";
import type { Soldier } from "@/data/simulation";

interface Props {
  soldiers: Soldier[];
  missionStatus: "Active" | "Safe" | "Critical";
  alertCount: number;
}

export default function StatsBar({ soldiers, missionStatus, alertCount }: Props) {
  const deployed = soldiers.length;
  const critical = soldiers.filter(s => s.status === "critical").length;

  const statusColor = missionStatus === "Critical" ? "text-destructive text-glow-danger" :
    missionStatus === "Active" ? "text-accent text-glow-warning" : "text-primary text-glow";

  const cards = [
    { icon: Users, label: "Deployed", value: deployed, color: "text-primary" },
    { icon: AlertTriangle, label: "Active Alerts", value: alertCount, color: alertCount > 0 ? "text-accent" : "text-muted-foreground" },
    { icon: Shield, label: "Mission Status", value: missionStatus, color: statusColor },
    { icon: Thermometer, label: "Weather", value: "48°C / Clear", color: "text-accent" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel p-3 md:p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <c.icon className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</span>
          </div>
          <p className={`font-orbitron text-lg md:text-xl font-bold ${c.color}`}>{c.value}</p>
          {c.label === "Deployed" && critical > 0 && (
            <p className="font-mono-tech text-[10px] text-destructive mt-1">{critical} CRITICAL</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
