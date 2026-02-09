import { motion } from "framer-motion";
import { useState } from "react";

interface LandingScreenProps {
  onSubmit: (input: string) => void;
}

const ParticleField = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -30, 10, -20, 0],
            opacity: [0.2, 0.6, 0.3, 0.7, 0.2],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const LandingScreen = ({ onSubmit }: LandingScreenProps) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSubmit(input.trim());
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <ParticleField />

      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.08)_0%,_transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        {/* Logo / Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4"
        >
          <span className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase">
            Quantum AI
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-6 gradient-text"
        >
          PARALLEL
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground mb-2 font-light"
        >
          Meet the versions of you that could exist.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-sm text-muted-foreground/60 mb-12 font-mono"
        >
          Alternate Self Simulator
        </motion.p>

        {/* Input */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative w-full max-w-2xl mx-auto"
        >
          <div
            className={`relative rounded-2xl transition-all duration-500 ${
              isFocused ? "glow-primary" : "animate-glow-breathe"
            }`}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe your situation, conflict, or decision..."
              rows={4}
              className="w-full bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none resize-none text-base md:text-lg"
            />

            <div className="absolute bottom-4 right-4">
              <motion.button
                type="submit"
                disabled={!input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
              >
                Enter the Quantum Field →
              </motion.button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-6 flex flex-wrap gap-2 justify-center"
          >
            {[
              "I'm torn between stability and adventure",
              "Should I speak up or keep the peace?",
              "I'm deciding between a safe job and a risky dream",
            ].map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setInput(example)}
                className="px-3 py-1.5 rounded-lg text-xs text-muted-foreground/60 border border-border/30 hover:border-primary/30 hover:text-muted-foreground transition-all"
              >
                {example}
              </button>
            ))}
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default LandingScreen;
