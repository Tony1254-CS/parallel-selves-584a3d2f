import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ParallelSelf } from "@/lib/archetypes";

interface HiddenSelfRevealProps {
  hiddenSelf: ParallelSelf;
  onAccept: (self: ParallelSelf) => void;
  onDismiss: () => void;
}

const HiddenSelfReveal = ({ hiddenSelf, onAccept, onDismiss }: HiddenSelfRevealProps) => {
  const [phase, setPhase] = useState<"teaser" | "reveal">("teaser");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />

        {/* Pulsing energy */}
        <motion.div
          className="absolute w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(280 70% 50% / 0.15), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-md px-8 text-center">
          {phase === "teaser" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.p
                className="text-[10px] uppercase tracking-[0.3em] text-purple-400/60 font-mono mb-6"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Anomaly Detected
              </motion.p>
              <p className="text-xl text-foreground/80 font-light mb-2">
                A new self is emerging…
              </p>
              <p className="text-sm text-muted-foreground/50 mb-8">
                Your exploration has revealed a hidden pattern.
              </p>

              <motion.button
                onClick={() => setPhase("reveal")}
                className="px-6 py-3 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-mono hover:bg-purple-500/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Observe this self
              </motion.button>

              <button
                onClick={onDismiss}
                className="block mx-auto mt-4 text-xs text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors"
              >
                dismiss
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-3xl mb-2">{hiddenSelf.mythological_mapping.symbol}</p>
              <p className="text-xl text-foreground/90 font-light mb-1">{hiddenSelf.archetype_name}</p>
              <p className="text-xs text-purple-400/60 font-mono mb-4">
                {hiddenSelf.mythological_mapping.deity} · {hiddenSelf.mythological_mapping.domain}
              </p>
              <p className="text-sm text-foreground/60 leading-relaxed mb-8">
                {hiddenSelf.reasoning_analysis}
              </p>

              <div className="flex gap-3 justify-center">
                <motion.button
                  onClick={() => onAccept(hiddenSelf)}
                  className="px-6 py-3 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-mono hover:bg-purple-500/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to parallel selves
                </motion.button>
                <button
                  onClick={onDismiss}
                  className="px-6 py-3 rounded-xl border border-border/30 text-muted-foreground/50 text-sm font-mono hover:text-muted-foreground transition-colors"
                >
                  dismiss
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HiddenSelfReveal;
