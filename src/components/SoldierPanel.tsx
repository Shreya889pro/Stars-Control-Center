import { motion } from "framer-motion";
import type { Soldier } from "@/data/simulation";

interface Props {
  soldiers: Soldier[];
  onSelect: (s: Soldier) => void;
}

export default function SoldierPanel({ soldiers, onSelect }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel p-3 md:p-4"
    >
      <h2 className="font-orbitron text-xs tracking-[0.2em] text-primary uppercase mb-3">Personnel Status</h2>

      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
        {soldiers.map((s, i) => {
          const statusColor = s.status === "critical" ? "border-destructive/40 bg-destructive/5" :
            s.status === "danger" ? "border-accent/30 bg-accent/5" : "border-border";
          const healthColor = s.health < 40 ? "bg-destructive" : s.health < 70 ? "bg-accent" : "bg-primary";
          const batteryColor = s.battery < 30 ? "text-destructive" : s.battery < 60 ? "text-accent" : "text-primary";

          return (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
              onClick={() => onSelect(s)}
              className={`w-full text-left p-2.5 rounded-md border ${statusColor} hover:bg-secondary/40 transition-colors active:scale-[0.98]`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <span className="font-orbitron text-[10px] text-primary/80 mr-2">{s.callsign}</span>
                  <span className="font-rajdhani text-sm text-foreground">{s.name}</span>
                </div>
                <span className={`font-mono-tech text-[9px] uppercase px-1.5 py-0.5 rounded-sm ${
                  s.status === "critical" ? "bg-destructive/20 text-destructive" :
                  s.status === "danger" ? "bg-accent/20 text-accent" :
                  "bg-primary/10 text-primary"
                }`}>
                  {s.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="flex justify-between font-mono-tech text-[9px] text-muted-foreground mb-0.5">
                    <span>HP</span>
                    <span>{s.health}%</span>
                  </div>
                  <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${healthColor}`} style={{ width: `${s.health}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-mono-tech text-[9px] text-muted-foreground mb-0.5">
                    <span>BAT</span>
                    <span className={batteryColor}>{s.battery}%</span>
                  </div>
                  <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${s.battery < 30 ? "bg-destructive" : s.battery < 60 ? "bg-accent" : "bg-primary"}`} style={{ width: `${s.battery}%` }} />
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
