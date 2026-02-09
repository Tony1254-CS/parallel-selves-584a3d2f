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

const lineColors: Record<string, string> = {
  analyst: "border-analyst/40",
  rebel: "border-rebel/40",
  guardian: "border-guardian/40",
  visionary: "border-visionary/40",
  realist: "border-realist/40",
};

const dotColors: Record<string, string> = {
  analyst: "bg-analyst",
  rebel: "bg-rebel",
  guardian: "bg-guardian",
  visionary: "bg-visionary",
  realist: "bg-realist",
};

const textColors: Record<string, string> = {
  analyst: "text-analyst",
  rebel: "text-rebel",
  guardian: "text-guardian",
  visionary: "text-visionary",
  realist: "text-realist",
};

const TimelineBranch = ({ selves, activeSelf }: TimelineBranchProps) => {
  const displaySelves = activeSelf ? [activeSelf] : selves;

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-10"
      >
        <h3 className="text-sm font-mono text-muted-foreground/50 uppercase tracking-[0.2em] mb-2">
          Temporal Branch Visualization
        </h3>
        <p className="text-xs text-muted-foreground/30">Speculative futures based on each self's trajectory</p>
      </motion.div>

      {/* NOW marker */}
      <div className="flex items-center justify-center mb-8">
        <motion.div
          className="px-4 py-2 rounded-full border border-primary/30 text-primary text-xs font-mono glow-primary"
          animate={{ boxShadow: ["0 0 15px hsl(185,80%,50%,0.2)", "0 0 25px hsl(185,80%,50%,0.4)", "0 0 15px hsl(185,80%,50%,0.2)"] }}
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
          className="space-y-3"
        >
          {displaySelves.map((self, selfIdx) => (
            <motion.div
              key={self.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: selfIdx * 0.1 }}
              className={`border rounded-xl p-5 ${lineColors[self.dimension]} bg-card/30 backdrop-blur-sm`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-2 h-2 rounded-full ${dotColors[self.dimension]}`} />
                <span className={`text-sm font-semibold ${textColors[self.dimension]}`}>
                  {self.archetype_name} Path
                </span>
                <span className="text-xs text-muted-foreground/40 font-mono ml-auto">
                  {self.mythological_mapping.symbol} {self.mythological_mapping.deity}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {periodLabels.map((period, pIdx) => (
                  <motion.div
                    key={period.key}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: selfIdx * 0.1 + pIdx * 0.1 + 0.2 }}
                    className={`rounded-lg p-4 border ${lineColors[self.dimension]} bg-background/50`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs ${textColors[self.dimension]}`}>{period.icon}</span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-mono">
                        {period.label}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/60 leading-relaxed">
                      {self.timeline[period.key]}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TimelineBranch;
