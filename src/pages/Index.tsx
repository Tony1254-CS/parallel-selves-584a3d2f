import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import LandingScreen from "@/components/LandingScreen";
import QuantumSuperposition from "@/components/QuantumSuperposition";
import ParallelSelfCard from "@/components/ParallelSelfCard";
import TimelineBranch from "@/components/TimelineBranch";
import DimensionalPortal from "@/components/DimensionalPortal";
import CollapseMessage from "@/components/CollapseMessage";
import { ParallelSelf, generateMockSelves } from "@/lib/archetypes";
import { supabase } from "@/integrations/supabase/client";

type Phase = "landing" | "processing" | "superposition" | "explore";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("landing");
  const [userInput, setUserInput] = useState("");
  const [selves, setSelves] = useState<ParallelSelf[]>([]);
  const [activeSelf, setActiveSelf] = useState<ParallelSelf | null>(null);
  const [isPortalTransitioning, setIsPortalTransitioning] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showCollapseMessage, setShowCollapseMessage] = useState(false);

  const handleSubmit = useCallback(async (input: string) => {
    setUserInput(input);
    setPhase("processing");

    try {
      const { data, error } = await supabase.functions.invoke("generate-selves", {
        body: { userInput: input },
      });

      if (error) throw error;

      if (data?.selves?.length) {
        setSelves(data.selves);
        setPhase("superposition");
      } else {
        throw new Error("No selves generated");
      }
    } catch (err: any) {
      console.error("AI generation failed, using fallback:", err);
      if (err?.message?.includes("Rate limit") || err?.status === 429) {
        toast.error("Rate limit reached. Please wait a moment and try again.");
      } else if (err?.status === 402) {
        toast.error("AI usage limit reached. Please add credits.");
      } else {
        toast.error("AI generation failed. Using local simulation.");
      }
      const generated = generateMockSelves(input);
      setSelves(generated);
      setPhase("superposition");
    }
  }, []);

  const handleSelectSelf = useCallback((self: ParallelSelf) => {
    setShowCollapseMessage(true);
    setIsPortalTransitioning(true);
    setTimeout(() => {
      setActiveSelf(self);
      setPhase("explore");
      setTimeout(() => setIsPortalTransitioning(false), 600);
    }, 400);
  }, []);

  const handleViewAll = useCallback(() => {
    setActiveSelf(null);
    setPhase("explore");
  }, []);

  const handleSwitchSelf = useCallback((self: ParallelSelf) => {
    if (self.id === activeSelf?.id) return;
    setIsPortalTransitioning(true);
    setTimeout(() => {
      setActiveSelf(self);
      setTimeout(() => setIsPortalTransitioning(false), 600);
    }, 400);
  }, [activeSelf]);

  const handleReset = useCallback(() => {
    setPhase("landing");
    setUserInput("");
    setSelves([]);
    setActiveSelf(null);
    setShowTimeline(false);
    setShowCollapseMessage(false);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CollapseMessage show={showCollapseMessage} />

      <AnimatePresence mode="wait">
        {phase === "landing" && (
          <motion.div key="landing" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
            <LandingScreen onSubmit={handleSubmit} />
          </motion.div>
        )}

        {phase === "processing" && (
          <motion.div
            key="processing"
            className="fixed inset-0 flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-background" />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                className="w-32 h-32 rounded-full border border-primary/30 flex items-center justify-center mb-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full border border-primary/50"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full bg-primary/30 mx-auto mt-6"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>

              <motion.p
                className="font-mono text-sm text-primary"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Splitting quantum states...
              </motion.p>
              <motion.p
                className="font-mono text-xs text-muted-foreground mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1 }}
              >
                Generating parallel selves from your input
              </motion.p>
            </div>
          </motion.div>
        )}

        {phase === "superposition" && (
          <motion.div key="superposition" exit={{ opacity: 0 }}>
            <QuantumSuperposition
              selves={selves}
              onSelectSelf={handleSelectSelf}
              onComplete={handleViewAll}
            />
          </motion.div>
        )}

        {phase === "explore" && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen"
          >
            <DimensionalPortal
              isTransitioning={isPortalTransitioning}
              dimension={activeSelf?.dimension || "realist"}
            >
              {/* Top bar — fixed readability */}
              <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-border/40">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={handleReset} className="text-sm font-mono text-foreground/70 hover:text-foreground transition-colors">
                      ← New Session
                    </button>
                    <span className="text-border">|</span>
                    <span className="text-sm text-foreground/50 font-mono truncate max-w-xs">
                      "{userInput.slice(0, 60)}{userInput.length > 60 ? "..." : ""}"
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowTimeline(!showTimeline)}
                      className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                        showTimeline
                          ? "bg-primary/20 text-primary border border-primary/40"
                          : "text-foreground/60 hover:text-foreground border border-border/50 hover:border-primary/30"
                      }`}
                    >
                      ⏳ Timelines
                    </button>
                    <button
                      onClick={() => { setActiveSelf(null); }}
                      className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                        !activeSelf
                          ? "bg-primary/20 text-primary border border-primary/40"
                          : "text-foreground/60 hover:text-foreground border border-border/50 hover:border-primary/30"
                      }`}
                    >
                      View All
                    </button>
                  </div>
                </div>
              </div>

              {/* Self selector tabs — improved readability */}
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {selves.map((self) => {
                    const isActiveSelf = activeSelf?.id === self.id;
                    return (
                      <motion.button
                        key={self.id}
                        onClick={() => handleSwitchSelf(self)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-mono border transition-all ${
                          isActiveSelf
                            ? "border-primary/50 bg-primary/15 text-foreground"
                            : "border-border/40 text-foreground/60 hover:text-foreground hover:border-primary/30"
                        }`}
                      >
                        {self.mythological_mapping.symbol} {self.archetype_name}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="max-w-7xl mx-auto px-4 pb-20">
                <AnimatePresence mode="wait">
                  {showTimeline ? (
                    <motion.div
                      key="timeline"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <TimelineBranch selves={selves} activeSelf={activeSelf} />
                    </motion.div>
                  ) : activeSelf ? (
                    <motion.div
                      key={`single-${activeSelf.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="max-w-2xl mx-auto"
                    >
                      <ParallelSelfCard
                        self={activeSelf}
                        isActive={true}
                        onClick={() => {}}
                        index={0}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="all"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {selves.map((self, i) => (
                        <ParallelSelfCard
                          key={self.id}
                          self={self}
                          isActive={activeSelf?.id === self.id}
                          onClick={() => handleSwitchSelf(self)}
                          index={i}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </DimensionalPortal>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
