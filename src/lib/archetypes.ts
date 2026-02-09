export interface ParallelSelf {
  id: string;
  archetype_name: string;
  mythological_mapping: {
    deity: string;
    domain: string;
    symbol: string;
  };
  personality_traits: string[];
  reasoning_analysis: string;
  suggested_action: string;
  emotional_prediction: string;
  confidence_score: number;
  dimension: "analyst" | "rebel" | "guardian" | "visionary" | "realist";
  color: string;
  timeline: {
    week: string;
    month: string;
    year: string;
  };
}

export const ARCHETYPE_CONFIG: Record<string, {
  dimension: ParallelSelf["dimension"];
  mythDeity: string;
  mythDomain: string;
  mythSymbol: string;
  emoji: string;
}> = {
  Analyst: {
    dimension: "analyst",
    mythDeity: "Athena",
    mythDomain: "Wisdom & Strategy",
    mythSymbol: "🦉",
    emoji: "🧠",
  },
  Rebel: {
    dimension: "rebel",
    mythDeity: "Loki",
    mythDomain: "Chaos & Transformation",
    mythSymbol: "🔥",
    emoji: "⚡",
  },
  Guardian: {
    dimension: "guardian",
    mythDeity: "Hestia",
    mythDomain: "Stability & Protection",
    mythSymbol: "🛡️",
    emoji: "🏛️",
  },
  Visionary: {
    dimension: "visionary",
    mythDeity: "Prometheus",
    mythDomain: "Foresight & Innovation",
    mythSymbol: "🔮",
    emoji: "✨",
  },
  Realist: {
    dimension: "realist",
    mythDeity: "Hermes",
    mythDomain: "Balance & Pragmatism",
    mythSymbol: "⚖️",
    emoji: "🎯",
  },
};

export function generateMockSelves(input: string): ParallelSelf[] {
  return [
    {
      id: "analyst",
      archetype_name: "The Analyst",
      mythological_mapping: { deity: "Athena", domain: "Wisdom & Strategy", symbol: "🦉" },
      personality_traits: ["Methodical", "Data-driven", "Risk-calculating", "Precise"],
      reasoning_analysis: `This version of you approaches "${input.slice(0, 50)}..." through pure logic. Every variable is weighed, every outcome probability-mapped. Emotions are acknowledged but set aside as noise in the signal.`,
      suggested_action: "Create a detailed decision matrix. List all variables, assign weights, and let the numbers guide you. Consult 3 domain experts before committing.",
      emotional_prediction: "Initial frustration from delayed gratification, followed by deep confidence once data confirms direction. Long-term satisfaction from knowing you chose wisely.",
      confidence_score: 0.87,
      dimension: "analyst",
      color: "analyst",
      timeline: {
        week: "You've built a comprehensive spreadsheet. Sleep quality improves as uncertainty decreases. You feel in control.",
        month: "The structured approach has revealed hidden patterns. One option clearly emerges as statistically superior.",
        year: "The methodical choice paid off. You've built something sustainable, though you occasionally wonder about the road not taken.",
      },
    },
    {
      id: "rebel",
      archetype_name: "The Rebel",
      mythological_mapping: { deity: "Loki", domain: "Chaos & Transformation", symbol: "🔥" },
      personality_traits: ["Bold", "Unconventional", "Instinctive", "Fearless"],
      reasoning_analysis: `This self looks at "${input.slice(0, 50)}..." and laughs. The obvious choice is boring. The exciting answer is the one that scares you most. Growth lives outside comfort zones.`,
      suggested_action: "Burn the safety net. Choose the option that makes your heart race. Tell everyone your decision before you can take it back.",
      emotional_prediction: "Immediate exhilaration and terror in equal measure. Chaotic first weeks, but rapid adaptation. You'll either fly or learn to build wings on the way down.",
      confidence_score: 0.72,
      dimension: "rebel",
      color: "rebel",
      timeline: {
        week: "Everything feels unstable but alive. You're sleeping less but dreaming bigger. Friends think you're crazy.",
        month: "The chaos has crystallized into unexpected opportunities. Doors you never knew existed are opening.",
        year: "You've reinvented yourself completely. The risk created a version of you that the safe path could never have produced.",
      },
    },
    {
      id: "guardian",
      archetype_name: "The Guardian",
      mythological_mapping: { deity: "Hestia", domain: "Stability & Protection", symbol: "🛡️" },
      personality_traits: ["Protective", "Nurturing", "Risk-aware", "Grounded"],
      reasoning_analysis: `This self sees "${input.slice(0, 50)}..." through the lens of what must be preserved. What do you have that's worth protecting? What would you lose if this goes wrong?`,
      suggested_action: "Secure your foundation first. Build a 6-month safety buffer. Only then, explore change incrementally. Protect what matters while evolving slowly.",
      emotional_prediction: "Steady calm. No dramatic highs, but no devastating lows either. A deep sense of security that allows genuine peace of mind.",
      confidence_score: 0.91,
      dimension: "guardian",
      color: "guardian",
      timeline: {
        week: "You've created safety nets. The anxiety has quieted. You sleep soundly knowing the essentials are protected.",
        month: "From a position of security, you begin exploring options without desperation. Decisions feel clear, not pressured.",
        year: "A stable, enriched life. You've grown within a protected space, and the slow path has compounded beautifully.",
      },
    },
    {
      id: "visionary",
      archetype_name: "The Visionary",
      mythological_mapping: { deity: "Prometheus", domain: "Foresight & Innovation", symbol: "🔮" },
      personality_traits: ["Future-oriented", "Optimistic", "Creative", "Ambitious"],
      reasoning_analysis: `This self zooms out from "${input.slice(0, 50)}..." to see the 10-year picture. The current dilemma is just a pixel in a much larger canvas being painted.`,
      suggested_action: "Forget the binary choice. Invent a third option no one has considered. The best decisions aren't chosen — they're created.",
      emotional_prediction: "Expansive excitement. A feeling of possibility that borders on euphoria. The challenge becomes fuel for something unprecedented.",
      confidence_score: 0.78,
      dimension: "visionary",
      color: "visionary",
      timeline: {
        week: "You've reframed the entire situation. What felt like a dilemma now feels like an opportunity. Ideas are flowing.",
        month: "The creative solution is taking shape. Others are starting to see what you envisioned. Momentum builds.",
        year: "You've created something entirely new — a path that didn't exist before you imagined it. The original dilemma feels quaint.",
      },
    },
    {
      id: "realist",
      archetype_name: "The Realist",
      mythological_mapping: { deity: "Hermes", domain: "Balance & Pragmatism", symbol: "⚖️" },
      personality_traits: ["Pragmatic", "Balanced", "Adaptable", "Clear-eyed"],
      reasoning_analysis: `This self sees "${input.slice(0, 50)}..." exactly as it is — no romanticizing, no catastrophizing. What are the actual facts? What's actually at stake?`,
      suggested_action: "Take the next small step. You don't need the whole path clear — just the next move. Commit for 90 days, then reassess with real data.",
      emotional_prediction: "Grounded acceptance. Neither excited nor anxious — simply present. A quiet confidence that comes from seeing things clearly.",
      confidence_score: 0.84,
      dimension: "realist",
      color: "realist",
      timeline: {
        week: "You've made a small, reversible commitment. No drama, just motion. You feel lighter from having started.",
        month: "Real data has replaced speculation. The picture is clearer now, and adjustments are easy because stakes are small.",
        year: "A series of pragmatic pivots has led somewhere surprising. The destination wasn't planned, but it fits perfectly.",
      },
    },
  ];
}
