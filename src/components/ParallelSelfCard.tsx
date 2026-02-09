import { motion, useMotionValue, useTransform } from "framer-motion";
import { ParallelSelf } from "@/lib/archetypes";
import { useRef } from "react";
import DecisionIntelligence from "./DecisionIntelligence";
import FutureRoadmap from "./FutureRoadmap";

interface ParallelSelfCardProps {
  self: ParallelSelf;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const hslColors: Record<string, string> = {
  analyst: "200, 80%, 55%",
  rebel: "350, 85%, 58%",
  guardian: "35, 85%, 55%",
  visionary: "155, 75%, 50%",
  realist: "220, 15%, 60%",
};

const textColors: Record<string, string> = {
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
  const textColor = textColors[self.dimension];
  const barColor = bgBarMap[self.dimension];
  const hsl = hslColors[self.dimension];
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotateX, rotateY, perspective: 800 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="cursor-pointer rounded-2xl border backdrop-blur-xl p-6 transition-all duration-300"
      // Dynamic border & bg via inline style for proper HSL usage
      {...{
        style: {
          borderColor: `hsl(${hsl} / ${isActive ? 0.4 : 0.2})`,
          backgroundColor: `hsl(${hsl} / 0.04)`,
          boxShadow: isActive ? `0 0 40px hsl(${hsl} / 0.15), inset 0 0 30px hsl(${hsl} / 0.03)` : "none",
          rotateX: rotateX as any,
          rotateY: rotateY as any,
          perspective: 800,
        }
      }}
    >
      {/* Hover glow overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at 50% 50%, hsl(${hsl} / 0.08), transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{self.mythological_mapping.symbol}</span>
            <h3 className={`text-lg font-semibold ${textColor}`}>{self.archetype_name}</h3>
          </div>
          <p className="text-xs text-muted-foreground/70 font-mono">
            {self.mythological_mapping.deity} · {self.mythological_mapping.domain}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold font-mono ${textColor}`}>
            {Math.round(self.confidence_score * 100)}%
          </div>
          <div className="text-[11px] text-muted-foreground/60 uppercase tracking-wider">confidence</div>
        </div>
      </div>

      {/* Traits */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {self.personality_traits.map((trait) => (
          <span
            key={trait}
            className="px-2.5 py-1 rounded-full text-xs font-mono border"
            style={{ borderColor: `hsl(${hsl} / 0.25)`, color: `hsl(${hsl} / 0.85)` }}
          >
            {trait}
          </span>
        ))}
      </div>

      {/* Analysis */}
      <p className="text-sm text-foreground/80 leading-relaxed mb-4">
        {self.reasoning_analysis}
      </p>

      {/* Action */}
      <div
        className="rounded-xl p-4 mb-4 border"
        style={{ borderColor: `hsl(${hsl} / 0.15)`, backgroundColor: `hsl(${hsl} / 0.03)` }}
      >
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground/60 mb-2 font-mono">
          Suggested Action
        </p>
        <p className="text-sm text-foreground/85">{self.suggested_action}</p>
      </div>

      {/* Mythological archetype panel */}
      <div
        className="rounded-xl p-4 mb-4 border"
        style={{ borderColor: `hsl(${hsl} / 0.12)`, backgroundColor: `hsl(${hsl} / 0.02)` }}
      >
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground/60 mb-2 font-mono">
          Mythological Archetype
        </p>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{self.mythological_mapping.symbol}</span>
          <div>
            <p className={`text-sm font-medium ${textColor}`}>{self.mythological_mapping.deity}</p>
            <p className="text-xs text-muted-foreground/70">{self.mythological_mapping.domain}</p>
          </div>
        </div>
      </div>

      {/* Emotional prediction */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-1 min-h-[40px] rounded-full ${barColor}/40 flex-shrink-0`} />
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground/60 mb-1 font-mono">
            Emotional Forecast
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">{self.emotional_prediction}</p>
        </div>
      </div>

      {/* Decision Intelligence */}
      {isActive && self.decision_intelligence?.why_this_self && (
        <div className="mb-4">
          <DecisionIntelligence self={self} />
        </div>
      )}

      {/* Future Roadmap */}
      {isActive && self.future_roadmap && (
        <FutureRoadmap self={self} />
      )}
    </motion.div>
  );
};

export default ParallelSelfCard;
