import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ParallelSelf } from "@/lib/archetypes";

interface QuantumSuperpositionProps {
  selves: ParallelSelf[];
  onSelectSelf: (self: ParallelSelf) => void;
  onComplete: () => void;
}

const SILHOUETTE_COLORS: Record<string, string> = {
  analyst: "hsl(200, 80%, 55%)",
  rebel: "hsl(350, 85%, 58%)",
  guardian: "hsl(35, 85%, 55%)",
  visionary: "hsl(155, 75%, 50%)",
  realist: "hsl(220, 15%, 60%)",
};

const EnergyField = () => {
  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/40"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -40, 20, -30, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0, 0.8, 0.3, 0.6, 0],
            scale: [1, 1.5, 0.8, 1.2, 1],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const SilhouetteShape = ({ self, index, total, onClick, emerged }: {
  self: ParallelSelf;
  index: number;
  total: number;
  onClick: () => void;
  emerged: boolean;
}) => {
  const offset = (index - (total - 1) / 2) * 80;
  const color = SILHOUETTE_COLORS[self.dimension];

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{ left: `calc(50% + ${offset}px)`, transform: "translateX(-50%)" }}
      initial={{ opacity: 0, scale: 0, y: 80, filter: "blur(20px)" }}
      animate={emerged ? {
        opacity: [0.2, 0.55, 0.3, 0.5, 0.25],
        scale: 1,
        y: 0,
        filter: "blur(0px)",
      } : {}}
      transition={{
        opacity: { duration: 5, repeat: Infinity, delay: index * 0.5 },
        scale: { duration: 1.2, delay: index * 0.2, type: "spring", stiffness: 80 },
        y: { duration: 1.2, delay: index * 0.2, type: "spring", stiffness: 80 },
        filter: { duration: 1, delay: index * 0.2 },
      }}
      whileHover={{
        opacity: 0.95,
        scale: 1.12,
        filter: `drop-shadow(0 0 30px ${color})`,
      }}
      onClick={onClick}
    >
      <svg width="110" height="220" viewBox="0 0 110 220" className="drop-shadow-lg">
        <defs>
          <radialGradient id={`glow-${self.id}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <filter id={`blur-${self.id}`}>
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {/* Outer glow */}
        <ellipse cx="55" cy="90" rx="55" ry="90" fill={`url(#glow-${self.id})`} />
        {/* Head */}
        <circle cx="55" cy="32" r="20" fill={color} opacity="0.5" filter={`url(#blur-${self.id})`} />
        <circle cx="55" cy="32" r="16" fill={color} opacity="0.7" />
        {/* Body */}
        <ellipse cx="55" cy="100" rx="30" ry="50" fill={color} opacity="0.35" filter={`url(#blur-${self.id})`} />
        <ellipse cx="55" cy="100" rx="24" ry="42" fill={color} opacity="0.5" />
      </svg>

      {/* Flickering name */}
      <motion.div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs tracking-wider"
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={emerged ? {
          opacity: [0, 0.8, 0.4, 0.9, 0.5, 0.7],
        } : {}}
        transition={{ duration: 3, delay: 2 + index * 0.3, repeat: Infinity }}
      >
        {self.archetype_name}
      </motion.div>
    </motion.div>
  );
};

const QuantumSuperposition = ({ selves, onSelectSelf, onComplete }: QuantumSuperpositionProps) => {
  const [stage, setStage] = useState<"darkening" | "energy" | "emerged">("darkening");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("energy"), 800);
    const t2 = setTimeout(() => setStage("emerged"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Gradual darkening background */}
      <motion.div
        className="absolute inset-0 bg-background"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Radial quantum field */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, hsl(185 80% 50% / 0.08) 0%, transparent 60%)" }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: stage !== "darkening" ? 1 : 0, scale: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Energy particle field */}
      <AnimatePresence>
        {stage !== "darkening" && <EnergyField />}
      </AnimatePresence>

      {/* Pulsing rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-primary/10"
          style={{ width: ring * 220, height: ring * 220 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={stage !== "darkening" ? {
            scale: [1, 1.08, 1],
            opacity: [0.05, 0.2, 0.05],
          } : {}}
          transition={{ duration: 3 + ring, repeat: Infinity, delay: ring * 0.5 }}
        />
      ))}

      <motion.p
        className="text-muted-foreground font-mono text-sm mb-4 z-10 tracking-[0.25em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === "emerged" ? 0.7 : 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        QUANTUM SUPERPOSITION ACTIVE
      </motion.p>

      <motion.h2
        className="text-2xl md:text-3xl font-light text-foreground/90 mb-16 z-10 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: stage === "emerged" ? 1 : 0, y: stage === "emerged" ? 0 : 20 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        All possibilities exist simultaneously.
        <br />
        <span className="text-primary text-glow font-medium">Click one to observe.</span>
      </motion.h2>

      {/* Silhouettes container */}
      <div className="relative h-72 w-full max-w-3xl z-10">
        {selves.map((self, i) => (
          <SilhouetteShape
            key={self.id}
            self={self}
            index={i}
            total={selves.length}
            onClick={() => onSelectSelf(self)}
            emerged={stage === "emerged"}
          />
        ))}
      </div>

      <motion.button
        className="mt-24 text-xs text-muted-foreground/50 font-mono hover:text-muted-foreground transition-colors z-10 border border-border/20 px-4 py-2 rounded-lg hover:border-primary/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === "emerged" ? 1 : 0 }}
        transition={{ delay: 3.5 }}
        onClick={onComplete}
      >
        [ view all selves simultaneously ]
      </motion.button>
    </motion.div>
  );
};

export default QuantumSuperposition;
