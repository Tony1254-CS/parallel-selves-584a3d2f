import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ParallelSelf } from "@/lib/archetypes";

interface DecisionIntelligenceProps {
  self: ParallelSelf;
}

const hslColors: Record<string, string> = {
  analyst: "200, 80%, 55%",
  rebel: "350, 85%, 58%",
  guardian: "35, 85%, 55%",
  visionary: "155, 75%, 50%",
  realist: "220, 15%, 60%",
};

const tabs = [
  { key: "why", label: "Why This Self", icon: "🔍" },
  { key: "costs", label: "Hidden Costs", icon: "⚠️" },
  { key: "resistance", label: "Internal Resistance", icon: "🪞" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const DecisionIntelligence = ({ self }: DecisionIntelligenceProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("why");
  const hsl = hslColors[self.dimension] || hslColors.realist;

  const content: Record<TabKey, string> = {
    why: self.decision_intelligence.why_this_self,
    costs: self.decision_intelligence.hidden_costs,
    resistance: self.decision_intelligence.internal_resistance,
  };

  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: `hsl(${hsl} / 0.2)`, backgroundColor: `hsl(${hsl} / 0.03)` }}>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-4 font-mono">
        Decision Intelligence
      </p>

      <div className="flex gap-1.5 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
            style={{
              backgroundColor: activeTab === tab.key ? `hsl(${hsl} / 0.15)` : "transparent",
              color: activeTab === tab.key ? `hsl(${hsl})` : undefined,
              borderWidth: 1,
              borderColor: activeTab === tab.key ? `hsl(${hsl} / 0.3)` : `hsl(${hsl} / 0.1)`,
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-foreground/75 leading-relaxed"
        >
          {content[activeTab]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default DecisionIntelligence;
