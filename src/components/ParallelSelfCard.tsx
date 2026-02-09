import { motion } from "framer-motion";
import { ParallelSelf } from "@/lib/archetypes";

interface ParallelSelfCardProps {
  self: ParallelSelf;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const dimensionStyles: Record<string, { border: string; glow: string; bg: string }> = {
  analyst: {
    border: "border-analyst/30",
    glow: "shadow-[0_0_30px_hsl(200,80%,55%,0.15)]",
    bg: "bg-[hsl(210,40%,6%)]",
  },
  rebel: {
    border: "border-rebel/30",
    glow: "shadow-[0_0_30px_hsl(350,85%,58%,0.15)]",
    bg: "bg-[hsl(350,30%,6%)]",
  },
  guardian: {
    border: "border-guardian/30",
    glow: "shadow-[0_0_30px_hsl(35,85%,55%,0.15)]",
    bg: "bg-[hsl(35,30%,6%)]",
  },
  visionary: {
    border: "border-visionary/30",
    glow: "shadow-[0_0_30px_hsl(155,75%,50%,0.15)]",
    bg: "bg-[hsl(155,30%,5%)]",
  },
  realist: {
    border: "border-realist/30",
    glow: "shadow-[0_0_30px_hsl(220,15%,60%,0.15)]",
    bg: "bg-[hsl(220,15%,7%)]",
  },
};

const colorMap: Record<string, string> = {
  analyst: "text-analyst",
  rebel: "text-rebel",
  guardian: "text-guardian",
  visionary: "text-visionary",
  realist: "text-realist",
};

const bgBarMap: Record<string, string> = {
  analyst: "bg-analyst",
  rebel: "bg-rebel",
  guardian: "bg-guardian",
  visionary: "bg-visionary",
  realist: "bg-realist",
};

const ParallelSelfCard = ({ self, isActive, onClick, index }: ParallelSelfCardProps) => {
  const style = dimensionStyles[self.dimension];
  const textColor = colorMap[self.dimension];
  const barColor = bgBarMap[self.dimension];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={onClick}
      className={`cursor-pointer rounded-2xl border backdrop-blur-xl p-6 transition-all duration-300 ${style.border} ${style.bg} ${
        isActive ? style.glow : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{self.mythological_mapping.symbol}</span>
            <h3 className={`text-lg font-semibold ${textColor}`}>{self.archetype_name}</h3>
          </div>
          <p className="text-xs text-muted-foreground/50 font-mono">
            {self.mythological_mapping.deity} · {self.mythological_mapping.domain}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold font-mono ${textColor}`}>
            {Math.round(self.confidence_score * 100)}%
          </div>
          <div className="text-[10px] text-muted-foreground/40 uppercase tracking-wider">confidence</div>
        </div>
      </div>

      {/* Traits */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {self.personality_traits.map((trait) => (
          <span
            key={trait}
            className={`px-2 py-0.5 rounded-full text-[11px] font-mono border ${style.border} ${textColor}/70`}
          >
            {trait}
          </span>
        ))}
      </div>

      {/* Analysis */}
      <p className="text-sm text-foreground/70 leading-relaxed mb-4">
        {self.reasoning_analysis}
      </p>

      {/* Action */}
      <div className={`rounded-xl p-4 mb-4 border ${style.border} ${style.bg}`}>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40 mb-2 font-mono">
          Suggested Action
        </p>
        <p className="text-sm text-foreground/80">{self.suggested_action}</p>
      </div>

      {/* Emotional prediction */}
      <div className="flex items-start gap-3">
        <div className={`w-1 h-full min-h-[40px] rounded-full ${barColor}/40`} />
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40 mb-1 font-mono">
            Emotional Forecast
          </p>
          <p className="text-xs text-muted-foreground/70 leading-relaxed">{self.emotional_prediction}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ParallelSelfCard;
