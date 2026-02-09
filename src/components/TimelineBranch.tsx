import { motion, AnimatePresence } from "framer-motion";
import { ParallelSelf } from "@/lib/archetypes";

interface TimelineBranchProps {
  selves: ParallelSelf[];
  activeSelf: ParallelSelf | null;
}

const periodLabels = [
  { key: "week" as const, label: "1 Week", icon: "◇" },
  { key: "month" as const, label: "1 Month", icon: "◈" },
  { key: "year" as const, label: "1 Year", icon: "◆" },
];

const hslColors: Record<string, string> = {
  analyst: "hsl(200, 80%, 55%)",
  rebel: "hsl(350, 85%, 58%)",
  guardian: "hsl(35, 85%, 55%)",
  visionary: "hsl(155, 75%, 50%)",
  realist: "hsl(220, 15%, 60%)",
};

const textColors: Record<string, string> = {
  analyst: "text-analyst",
  rebel: "text-rebel",
  guardian: "text-guardian",
  visionary: "text-visionary",
  realist: "text-realist",
};

const GlowingNode = ({ color, delay, size = 12 }: { color: string; delay: number; size?: number }) => (
  <motion.div
    className="rounded-full relative flex-shrink-0"
    style={{ width: size, height: size, backgroundColor: color }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, type: "spring", stiffness: 200 }}
  >
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ backgroundColor: color }}
      animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, delay }}
    />
  </motion.div>
);

const AnimatedLine = ({ color, delay }: { color: string; delay: number }) => (
  <motion.div
    className="flex-1 h-[2px] mx-1 rounded-full relative overflow-hidden"
    style={{ backgroundColor: `${color}20` }}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
  >
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ backgroundColor: color }}
      initial={{ x: "-100%" }}
      animate={{ x: "200%" }}
      transition={{ delay: delay + 0.3, duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
    />
  </motion.div>
);

const TimelineBranch = ({ selves, activeSelf }: TimelineBranchProps) => {
  const displaySelves = activeSelf ? [activeSelf] : selves;

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-10"
      >
        <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-[0.2em] mb-2">
          Temporal Branch Visualization
        </h3>
        <p className="text-xs text-muted-foreground/50">Speculative futures based on each self's trajectory</p>
      </motion.div>

      {/* NOW marker */}
      <div className="flex items-center justify-center mb-10">
        <motion.div
          className="px-5 py-2.5 rounded-full border border-primary/40 text-primary text-sm font-mono glow-primary"
          animate={{
            boxShadow: [
              "0 0 15px hsl(185,80%,50%,0.2)",
              "0 0 35px hsl(185,80%,50%,0.5)",
              "0 0 15px hsl(185,80%,50%,0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ● NOW — Decision Point
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSelf?.id ?? "all"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          {displaySelves.map((self, selfIdx) => {
            const color = hslColors[self.dimension];
            return (
              <motion.div
                key={self.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: selfIdx * 0.12 }}
                className="rounded-2xl p-6 bg-card/40 backdrop-blur-md border border-border/30"
                style={{ borderColor: `${color}30` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <GlowingNode color={color} delay={selfIdx * 0.1} size={10} />
                  <span className={`text-sm font-semibold ${textColors[self.dimension]}`}>
                    {self.archetype_name} Path
                  </span>
                  <span className="text-xs text-muted-foreground/50 font-mono ml-auto">
                    {self.mythological_mapping.symbol} {self.mythological_mapping.deity}
                  </span>
                </div>

                {/* Animated node-line timeline */}
                <div className="flex items-center mb-5 px-2">
                  <GlowingNode color={color} delay={selfIdx * 0.1 + 0.2} />
                  <AnimatedLine color={color} delay={selfIdx * 0.1 + 0.3} />
                  <GlowingNode color={color} delay={selfIdx * 0.1 + 0.5} />
                  <AnimatedLine color={color} delay={selfIdx * 0.1 + 0.6} />
                  <GlowingNode color={color} delay={selfIdx * 0.1 + 0.8} size={16} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {periodLabels.map((period, pIdx) => (
                    <motion.div
                      key={period.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: selfIdx * 0.12 + pIdx * 0.12 + 0.3 }}
                      className="rounded-xl p-4 bg-background/60 border border-border/20"
                      style={{ borderColor: `${color}15` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs ${textColors[self.dimension]}`}>{period.icon}</span>
                        <span className="text-[11px] uppercase tracking-widest text-muted-foreground/60 font-mono">
                          {period.label}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {self.timeline[period.key]}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TimelineBranch;
