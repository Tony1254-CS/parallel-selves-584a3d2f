import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface DimensionalPortalProps {
  isTransitioning: boolean;
  dimension: string;
  children: ReactNode;
}

const dimensionGradients: Record<string, string> = {
  analyst: "from-[hsl(200,80%,55%,0.12)] via-[hsl(220,60%,40%,0.05)] to-transparent",
  rebel: "from-[hsl(350,85%,58%,0.12)] via-[hsl(330,70%,40%,0.05)] to-transparent",
  guardian: "from-[hsl(35,85%,55%,0.12)] via-[hsl(25,60%,40%,0.05)] to-transparent",
  visionary: "from-[hsl(155,75%,50%,0.12)] via-[hsl(170,50%,35%,0.05)] to-transparent",
  realist: "from-[hsl(220,15%,60%,0.1)] via-[hsl(220,10%,40%,0.04)] to-transparent",
};

const dimensionBorderColors: Record<string, string> = {
  analyst: "hsl(200, 80%, 55%)",
  rebel: "hsl(350, 85%, 58%)",
  guardian: "hsl(35, 85%, 55%)",
  visionary: "hsl(155, 75%, 50%)",
  realist: "hsl(220, 15%, 60%)",
};

const DimensionalPortal = ({ isTransitioning, dimension, children }: DimensionalPortalProps) => {
  const gradient = dimensionGradients[dimension] || dimensionGradients.realist;
  const portalColor = dimensionBorderColors[dimension] || dimensionBorderColors.realist;

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
            {/* Screen warp overlay */}
            <motion.div
              className="absolute inset-0 bg-background"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.6, 0] }}
              transition={{ duration: 0.8 }}
            />

            {/* Portal rings */}
            {[1, 2, 3, 4, 5].map((ring) => (
              <motion.div
                key={ring}
                className="absolute rounded-full"
                style={{ border: `1px solid ${portalColor}`, opacity: 0.3 }}
                initial={{ width: 0, height: 0, opacity: 0, rotate: 0 }}
                animate={{
                  width: [0, ring * 180],
                  height: [0, ring * 180],
                  opacity: [0, 0.6, 0],
                  rotate: [0, 120 * (ring % 2 === 0 ? 1 : -1)],
                }}
                transition={{ duration: 0.9, delay: ring * 0.06, ease: "easeOut" }}
              />
            ))}

            {/* Center flash with color */}
            <motion.div
              className="absolute w-6 h-6 rounded-full"
              style={{ backgroundColor: portalColor }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 20, 0], opacity: [0, 0.4, 0] }}
              transition={{ duration: 0.9 }}
            />

            {/* Horizontal warp line */}
            <motion.div
              className="absolute h-[2px] top-1/2"
              style={{ backgroundColor: portalColor }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: ["0%", "100%", "0%"], opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.7, delay: 0.1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dimension ambient background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient} pointer-events-none transition-all duration-700`} />

      {/* Subtle animated ambient particles for dimension */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`${dimension}-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: portalColor,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 10, -15, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.8 }}
          />
        ))}
      </div>

      <motion.div
        key={dimension}
        initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default DimensionalPortal;
