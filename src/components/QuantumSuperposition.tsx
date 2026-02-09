import { motion, AnimatePresence } from "framer-motion";
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

const SilhouetteShape = ({ self, index, total, onClick }: {
  self: ParallelSelf;
  index: number;
  total: number;
  onClick: () => void;
}) => {
  const offset = (index - (total - 1) / 2) * 60;
  const color = SILHOUETTE_COLORS[self.dimension];

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `calc(50% + ${offset}px)`, transform: "translateX(-50%)" }}
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{
        opacity: [0.25, 0.5, 0.3, 0.45, 0.25],
        scale: 1,
        y: 0,
      }}
      transition={{
        opacity: { duration: 4, repeat: Infinity, delay: index * 0.4 },
        scale: { duration: 1, delay: index * 0.15 },
        y: { duration: 1, delay: index * 0.15 },
      }}
      whileHover={{ opacity: 0.9, scale: 1.08 }}
      onClick={onClick}
    >
      {/* Human silhouette shape */}
      <svg width="100" height="200" viewBox="0 0 100 200" className="drop-shadow-lg">
        {/* Head */}
        <circle cx="50" cy="30" r="18" fill={color} opacity="0.6" />
        {/* Body */}
        <ellipse cx="50" cy="90" rx="28" ry="45" fill={color} opacity="0.4" />
        {/* Glow */}
        <circle cx="50" cy="70" r="50" fill={color} opacity="0.1" />
      </svg>

      {/* Label */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs"
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5 + index * 0.2 }}
      >
        {self.archetype_name}
      </motion.div>
    </motion.div>
  );
};

const QuantumSuperposition = ({ selves, onSelectSelf, onComplete }: QuantumSuperpositionProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Quantum field background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.06)_0%,_transparent_60%)]" />

      {/* Pulsing rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-primary/10"
          style={{ width: ring * 200, height: ring * 200 }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3 + ring, repeat: Infinity, delay: ring * 0.5 }}
        />
      ))}

      <motion.p
        className="text-muted-foreground/60 font-mono text-sm mb-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        QUANTUM SUPERPOSITION ACTIVE
      </motion.p>

      <motion.h2
        className="text-2xl md:text-3xl font-light text-foreground/80 mb-16 z-10 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        All possibilities exist simultaneously.
        <br />
        <span className="text-primary text-glow">Click one to observe.</span>
      </motion.h2>

      {/* Silhouettes container */}
      <div className="relative h-64 w-full max-w-2xl z-10">
        <AnimatePresence>
          {selves.map((self, i) => (
            <SilhouetteShape
              key={self.id}
              self={self}
              index={i}
              total={selves.length}
              onClick={() => onSelectSelf(self)}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        className="mt-20 text-xs text-muted-foreground/40 font-mono hover:text-muted-foreground/60 transition-colors z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        onClick={onComplete}
      >
        [ view all selves simultaneously ]
      </motion.button>
    </motion.div>
  );
};

export default QuantumSuperposition;
