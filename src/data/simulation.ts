export interface Soldier {
  id: string;
  name: string;
  rank: string;
  health: number;
  battery: number;
  status: "safe" | "danger" | "critical";
  x: number;
  y: number;
  lastUpdate: Date;
  callsign: string;
}

export interface Alert {
  id: string;
  type: "enemy" | "health" | "temperature" | "perimeter";
  message: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: Date;
  soldierId?: string;
}

export interface RoutePoint {
  x: number;
  y: number;
}

export interface SupplyRoute {
  id: string;
  from: RoutePoint;
  to: RoutePoint;
  progress: number; // 0-1
  eta: number; // minutes
  status: "en-route" | "delivered" | "delayed";
}

export interface DangerZone {
  x: number;
  y: number;
  radius: number;
  threat: string;
}

export const INITIAL_SOLDIERS: Soldier[] = [
  { id: "s1", name: "Capt. Arjun Mehta", rank: "Captain", callsign: "HAWK-1", health: 92, battery: 78, status: "safe", x: 35, y: 28, lastUpdate: new Date() },
  { id: "s2", name: "Lt. Priya Sharma", rank: "Lieutenant", callsign: "VIPER-3", health: 68, battery: 45, status: "danger", x: 62, y: 55, lastUpdate: new Date() },
  { id: "s3", name: "Sgt. Vikram Singh", rank: "Sergeant", callsign: "COBRA-7", health: 85, battery: 91, status: "safe", x: 18, y: 72, lastUpdate: new Date() },
  { id: "s4", name: "Pvt. Rohan Patel", rank: "Private", callsign: "WOLF-2", health: 34, battery: 22, status: "critical", x: 78, y: 38, lastUpdate: new Date() },
  { id: "s5", name: "Cpl. Ananya Das", rank: "Corporal", callsign: "EAGLE-5", health: 95, battery: 88, status: "safe", x: 45, y: 65, lastUpdate: new Date() },
  { id: "s6", name: "Maj. Karan Reddy", rank: "Major", callsign: "TITAN-1", health: 71, battery: 56, status: "safe", x: 55, y: 20, lastUpdate: new Date() },
];

export const DANGER_ZONES: DangerZone[] = [
  { x: 70, y: 45, radius: 14, threat: "Enemy Patrol" },
  { x: 25, y: 85, radius: 10, threat: "Landmine Zone" },
  { x: 82, y: 75, radius: 12, threat: "Sniper Position" },
];

export const ALERT_TEMPLATES = [
  { type: "enemy" as const, severity: "critical" as const, message: "Enemy movement detected in Sector 7G" },
  { type: "enemy" as const, severity: "high" as const, message: "Hostile drone spotted near Firebase Alpha" },
  { type: "health" as const, severity: "high" as const, message: "Soldier vitals dropping — requesting medevac" },
  { type: "health" as const, severity: "medium" as const, message: "Dehydration warning — water supply low" },
  { type: "temperature" as const, severity: "medium" as const, message: "Core temperature rising above safe threshold" },
  { type: "temperature" as const, severity: "low" as const, message: "Ambient temperature exceeding 48°C" },
  { type: "perimeter" as const, severity: "critical" as const, message: "Perimeter breach detected at Checkpoint Delta" },
  { type: "perimeter" as const, severity: "high" as const, message: "Unidentified vehicle approaching base perimeter" },
];
