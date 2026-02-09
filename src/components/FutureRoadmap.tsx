import { motion } from "framer-motion";
import { ParallelSelf } from "@/lib/archetypes";

interface FutureRoadmapProps {
  self: ParallelSelf;
}

const hslColors: Record<string, string> = {
  analyst: "200, 80%, 55%",
  rebel: "350, 85%, 58%",
  guardian: "35, 85%, 55%",
  visionary: "155, 75%, 50%",
  realist: "220, 15%, 60%",
};

const stageLabels = ["First Weeks", "First Months", "Six Months", "One Year"];

const FutureRoadmap = ({ self }: FutureRoadmapProps) => {
  const hsl = hslColors[self.dimension] || hslColors.realist;
  const paragraphs = self.future_roadmap
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: `hsl(${hsl} / 0.2)`, backgroundColor: `hsl(${hsl} / 0.03)` }}>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-5 font-mono">
        🗺️ Future Roadmap
      </p>

      <div className="relative pl-6">
        {/* Vertical line */}
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px"
          style={{ backgroundColor: `hsl(${hsl} / 0.2)` }}
        />

        {paragraphs.map((paragraph, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="relative mb-6 last:mb-0"
          >
            {/* Node */}
            <motion.div
              className="absolute -left-6 top-1 w-[15px] h-[15px] rounded-full border-2"
              style={{
                borderColor: `hsl(${hsl} / 0.6)`,
                backgroundColor: `hsl(${hsl} / 0.15)`,
                boxShadow: `0 0 10px hsl(${hsl} / 0.3)`,
              }}
              animate={{ boxShadow: [`0 0 6px hsl(${hsl} / 0.2)`, `0 0 14px hsl(${hsl} / 0.4)`, `0 0 6px hsl(${hsl} / 0.2)`] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />

            <p className="text-[10px] uppercase tracking-widest font-mono mb-1.5" style={{ color: `hsl(${hsl} / 0.7)` }}>
              {stageLabels[i] || `Stage ${i + 1}`}
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">{paragraph}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FutureRoadmap;
