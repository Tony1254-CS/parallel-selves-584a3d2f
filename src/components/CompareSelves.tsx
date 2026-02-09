import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ParallelSelf } from "@/lib/archetypes";

interface CompareSelvesProps {
  selves: ParallelSelf[];
  onClose: () => void;
}

const hslColors: Record<string, string> = {
  analyst: "200, 80%, 55%",
  rebel: "350, 85%, 58%",
  guardian: "35, 85%, 55%",
  visionary: "155, 75%, 50%",
  realist: "220, 15%, 60%",
};

type Section = "why" | "costs" | "resistance";
const sections: { key: Section; label: string; icon: string }[] = [
  { key: "why", label: "Why This Self", icon: "🔍" },
  { key: "costs", label: "Hidden Costs", icon: "⚠️" },
  { key: "resistance", label: "Internal Resistance", icon: "🪞" },
];

const CompareSelves = ({ selves, onClose }: CompareSelvesProps) => {
  const [left, setLeft] = useState<ParallelSelf | null>(null);
  const [right, setRight] = useState<ParallelSelf | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("why");

  const getContent = (self: ParallelSelf, section: Section) => {
    const map: Record<Section, string> = {
      why: self.decision_intelligence?.why_this_self || "",
      costs: self.decision_intelligence?.hidden_costs || "",
      resistance: self.decision_intelligence?.internal_resistance || "",
    };
    return map[section];
  };

  const renderSelector = (
    selected: ParallelSelf | null,
    onSelect: (s: ParallelSelf) => void,
    otherSelected: ParallelSelf | null,
    side: "left" | "right"
  ) => (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-mono mb-2">
        {side === "left" ? "Self A" : "Self B"}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {selves.map((self) => {
          const hsl = hslColors[self.dimension];
          const isSelected = selected?.id === self.id;
          const isOther = otherSelected?.id === self.id;
          return (
            <button
              key={self.id}
              disabled={isOther}
              onClick={() => onSelect(self)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all border disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isSelected ? `hsl(${hsl} / 0.15)` : "transparent",
                borderColor: isSelected ? `hsl(${hsl} / 0.4)` : `hsl(${hsl} / 0.15)`,
                color: isSelected ? `hsl(${hsl})` : undefined,
              }}
            >
              {self.mythological_mapping.symbol} {self.archetype_name.replace("The ", "")}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderPanel = (self: ParallelSelf | null, side: "left" | "right") => {
    if (!self) {
      return (
        <div className="flex-1 rounded-2xl border border-border/20 bg-background/30 flex items-center justify-center min-h-[200px]">
          <p className="text-sm text-muted-foreground/40 font-mono">Select {side === "left" ? "Self A" : "Self B"}</p>
        </div>
      );
    }

    const hsl = hslColors[self.dimension];
    const content = getContent(self, activeSection);

    return (
      <motion.div
        key={`${self.id}-${activeSection}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 rounded-2xl border p-5 min-h-[200px]"
        style={{ borderColor: `hsl(${hsl} / 0.25)`, backgroundColor: `hsl(${hsl} / 0.04)` }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">{self.mythological_mapping.symbol}</span>
          <h4 className="text-sm font-semibold" style={{ color: `hsl(${hsl})` }}>
            {self.archetype_name}
          </h4>
          <span className="text-xs text-muted-foreground/50 font-mono ml-auto">
            {Math.round(self.confidence_score * 100)}%
          </span>
        </div>
        <p className="text-sm text-foreground/75 leading-relaxed">{content}</p>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground/90">⚔️ Compare Selves</h3>
          <p className="text-xs text-muted-foreground/50 font-mono mt-0.5">
            Explore contrasts in reasoning, costs, and resistance
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-xs font-mono text-foreground/50 hover:text-foreground px-3 py-1.5 rounded-lg border border-border/40 hover:border-primary/30 transition-all"
        >
          ✕ Close
        </button>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSelector(left, setLeft, right, "left")}
        {renderSelector(right, setRight, left, "right")}
      </div>

      {/* Section tabs */}
      <div className="flex gap-1.5">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all border"
            style={{
              backgroundColor: activeSection === s.key ? "hsl(var(--primary) / 0.15)" : "transparent",
              borderColor: activeSection === s.key ? "hsl(var(--primary) / 0.3)" : "hsl(var(--border) / 0.3)",
              color: activeSection === s.key ? "hsl(var(--primary))" : undefined,
            }}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Side-by-side panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="wait">{renderPanel(left, "left")}</AnimatePresence>
        <AnimatePresence mode="wait">{renderPanel(right, "right")}</AnimatePresence>
      </div>

      {/* Contrast insight */}
      {left && right && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-primary/15 bg-primary/5 p-4"
        >
          <p className="text-[10px] uppercase tracking-widest text-primary/60 font-mono mb-2">
            🔮 Contrast Insight
          </p>
          <p className="text-sm text-foreground/70 leading-relaxed">
            {left.archetype_name} and {right.archetype_name} represent fundamentally different responses to your situation.
            Where {left.archetype_name.replace("The ", "")} prioritizes{" "}
            <span style={{ color: `hsl(${hslColors[left.dimension]})` }}>{left.personality_traits[0]?.toLowerCase()}</span> and{" "}
            <span style={{ color: `hsl(${hslColors[left.dimension]})` }}>{left.personality_traits[1]?.toLowerCase()}</span>,{" "}
            {right.archetype_name.replace("The ", "")} draws strength from{" "}
            <span style={{ color: `hsl(${hslColors[right.dimension]})` }}>{right.personality_traits[0]?.toLowerCase()}</span> and{" "}
            <span style={{ color: `hsl(${hslColors[right.dimension]})` }}>{right.personality_traits[1]?.toLowerCase()}</span>.
            The tension between them mirrors an internal negotiation — neither is wrong, but each suppresses what the other values most.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CompareSelves;
