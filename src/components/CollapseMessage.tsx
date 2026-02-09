import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CollapseMessageProps {
  show: boolean;
}

const CollapseMessage = ({ show }: CollapseMessageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -10], scale: [0.95, 1, 1, 0.98] }}
        transition={{ duration: 4, times: [0, 0.15, 0.7, 1] }}
      >
        <p className="text-lg md:text-xl text-foreground/80 font-light tracking-wide mb-2">
          You just collapsed a possibility.
        </p>
        <p className="text-sm text-muted-foreground/50 font-mono">
          Others still exist.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CollapseMessage;
