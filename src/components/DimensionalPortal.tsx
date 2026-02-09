import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface DimensionalPortalProps {
  isTransitioning: boolean;
  dimension: string;
  children: ReactNode;
}

const dimensionGradients: Record<string, string> = {
  analyst: "from-[hsl(200,80%,55%,0.1)] to-transparent",
  rebel: "from-[hsl(350,85%,58%,0.1)] to-transparent",
  guardian: "from-[hsl(35,85%,55%,0.1)] to-transparent",
  visionary: "from-[hsl(155,75%,50%,0.1)] to-transparent",
  realist: "from-[hsl(220,15%,60%,0.08)] to-transparent",
};

const DimensionalPortal = ({ isTransitioning, dimension, children }: DimensionalPortalProps) => {
  const gradient = dimensionGradients[dimension] || dimensionGradients.realist;

  return (
    <div className="relative">
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Portal rings */}
            {[1, 2, 3, 4].map((ring) => (
              <motion.div
                key={ring}
                className="absolute rounded-full border border-primary/20"
                initial={{ width: 0, height: 0, opacity: 0, rotate: 0 }}
                animate={{
                  width: [0, ring * 200],
                  height: [0, ring * 200],
                  opacity: [0, 0.5, 0],
                  rotate: [0, 90 * (ring % 2 === 0 ? 1 : -1)],
                }}
                transition={{ duration: 0.8, delay: ring * 0.1, ease: "easeOut" }}
              />
            ))}

            {/* Center flash */}
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-primary"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 15, 0] }}
              transition={{ duration: 0.8 }}
              style={{ filter: "blur(20px)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dimension ambient background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient} pointer-events-none`} />

      <motion.div
        key={dimension}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default DimensionalPortal;
