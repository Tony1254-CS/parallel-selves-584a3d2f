import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingScreen from "@/components/LandingScreen";
import QuantumSuperposition from "@/components/QuantumSuperposition";
import ParallelSelfCard from "@/components/ParallelSelfCard";
import TimelineBranch from "@/components/TimelineBranch";
import DimensionalPortal from "@/components/DimensionalPortal";
import { ParallelSelf, generateMockSelves } from "@/lib/archetypes";

type Phase = "landing" | "processing" | "superposition" | "explore";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("landing");
  const [userInput, setUserInput] = useState("");
  const [selves, setSelves] = useState<ParallelSelf[]>([]);
  const [activeSelf, setActiveSelf] = useState<ParallelSelf | null>(null);
  const [isPortalTransitioning, setIsPortalTransitioning] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const handleSubmit = useCallback((input: string) => {
    setUserInput(input);
    setPhase("processing");

    // Simulate AI processing
    setTimeout(() => {
      const generated = generateMockSelves(input);
      setSelves(generated);
      setPhase("superposition");
    }, 2500);
  }, []);

  const handleSelectSelf = useCallback((self: ParallelSelf) => {
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
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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

            {/* Neural processing animation */}
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
                className="font-mono text-sm text-primary/60"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Splitting quantum states...
              </motion.p>
              <motion.p
                className="font-mono text-xs text-muted-foreground/40 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
              {/* Top bar */}
              <div className="sticky top-0 z-30 glass-strong">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={handleReset} className="text-xs font-mono text-muted-foreground/50 hover:text-foreground transition-colors">
                      ← New Session
                    </button>
                    <span className="text-border/50">|</span>
                    <span className="text-xs text-muted-foreground/40 font-mono truncate max-w-xs">
                      "{userInput.slice(0, 60)}{userInput.length > 60 ? "..." : ""}"
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowTimeline(!showTimeline)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        showTimeline
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "text-muted-foreground/50 hover:text-foreground border border-border/30"
                      }`}
                    >
                      ⏳ Timelines
                    </button>
                    <button
                      onClick={() => { setActiveSelf(null); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        !activeSelf
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "text-muted-foreground/50 hover:text-foreground border border-border/30"
                      }`}
                    >
                      View All
                    </button>
                  </div>
                </div>
              </div>

              {/* Self selector tabs */}
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {selves.map((self) => {
                    const isActive = activeSelf?.id === self.id;
                    return (
                      <motion.button
                        key={self.id}
                        onClick={() => handleSwitchSelf(self)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`shrink-0 px-4 py-2 rounded-xl text-xs font-mono border transition-all ${
                          isActive
                            ? `border-${self.dimension}/40 bg-${self.dimension}/10 text-${self.dimension}`
                            : "border-border/30 text-muted-foreground/50 hover:text-foreground"
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
