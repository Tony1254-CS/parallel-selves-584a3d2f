import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface IdentityMirrorProps {
  mirrorText: string;
  onComplete: () => void;
}

const IdentityMirror = ({ mirrorText, onComplete }: IdentityMirrorProps) => {
  const [visible, setVisible] = useState(true);
  const words = mirrorText.split(" ");

  useEffect(() => {
    // Auto-advance after text has appeared + dwell time
    const totalDuration = words.length * 120 + 3500;
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 1200);
    }, totalDuration);
    return () => clearTimeout(timer);
  }, [words.length, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="absolute inset-0 bg-background" />

          {/* Subtle breathing ring */}
          <motion.div
            className="absolute w-64 h-64 rounded-full border border-primary/10"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-40 h-40 rounded-full border border-primary/15"
            animate={{
              scale: [1.1, 0.95, 1.1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 max-w-xl px-8 text-center">
            <motion.p
              className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 font-mono mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              Identity Mirror
            </motion.p>

            <p className="text-lg md:text-xl leading-relaxed text-foreground/80 font-light">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </p>

            <motion.p
              className="mt-10 text-xs text-muted-foreground/30 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: words.length * 0.12 + 1 }}
            >
              observing your quantum state…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IdentityMirror;
