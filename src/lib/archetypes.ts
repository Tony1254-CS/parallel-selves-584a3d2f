export interface DecisionIntelligence {
  why_this_self: string;
  hidden_costs: string;
  internal_resistance: string;
}

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
  decision_intelligence: DecisionIntelligence;
  future_roadmap: string;
}

export const ARCHETYPE_CONFIG: Record<string, {
  dimension: ParallelSelf["dimension"];
  mythDeity: string;
  mythDomain: string;
  mythSymbol: string;
  emoji: string;
}> = {
  Analyst: { dimension: "analyst", mythDeity: "Athena", mythDomain: "Wisdom & Strategy", mythSymbol: "🦉", emoji: "🧠" },
  Rebel: { dimension: "rebel", mythDeity: "Loki", mythDomain: "Chaos & Transformation", mythSymbol: "🔥", emoji: "⚡" },
  Guardian: { dimension: "guardian", mythDeity: "Hestia", mythDomain: "Stability & Protection", mythSymbol: "🛡️", emoji: "🏛️" },
  Visionary: { dimension: "visionary", mythDeity: "Prometheus", mythDomain: "Foresight & Innovation", mythSymbol: "🔮", emoji: "✨" },
  Realist: { dimension: "realist", mythDeity: "Hermes", mythDomain: "Balance & Pragmatism", mythSymbol: "⚖️", emoji: "🎯" },
};

export function generateMockSelves(input: string): ParallelSelf[] {
  const snippet = input.slice(0, 50);
  return [
    {
      id: "analyst",
      archetype_name: "The Analyst",
      mythological_mapping: { deity: "Athena", domain: "Wisdom & Strategy", symbol: "🦉" },
      personality_traits: ["Methodical", "Data-driven", "Risk-calculating", "Precise"],
      reasoning_analysis: `This version of you approaches "${snippet}..." through pure logic. Every variable is weighed, every outcome probability-mapped. Emotions are acknowledged but set aside as noise in the signal.`,
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
      decision_intelligence: {
        why_this_self: `This self resonates with you right now because your situation carries genuine complexity that deserves careful examination. Beneath the surface tension of "${snippet}..." lies a web of interconnected variables that your intuition has already noticed but hasn't yet organized. The Analyst in you recognizes that clarity comes not from ignoring the emotional weight of this decision, but from giving structure to the chaos. At this moment in your life, the desire for control isn't about rigidity — it's about finding solid ground when everything feels uncertain.`,
        hidden_costs: `Choosing the path of analysis means accepting that some truths only reveal themselves through experience, not examination. You may find that the time spent modeling outcomes creates a subtle distance from the felt reality of your situation. Relationships around you may interpret your careful deliberation as emotional unavailability or indecision. The deeper cost is this: by the time the data gives you permission to move, the emotional momentum that could have carried you forward may have quietly faded. Certainty, when pursued too aggressively, can become its own form of avoidance.`,
        internal_resistance: `You may hesitate to fully embrace this self because part of you knows that not everything meaningful can be measured. There's a quiet fear that if you reduce this decision to variables and weights, you'll lose something essential — the gut feeling, the spark, the irrational courage that has guided you through past turning points. Your resistance isn't weakness; it's wisdom. It's the part of you that remembers times when overthinking led to paralysis, when the spreadsheet couldn't capture what your heart already knew.`,
      },
      future_roadmap: `You begin by creating space for clarity — organizing your thoughts, mapping the landscape of your decision. In the first weeks, this structured approach brings genuine relief. The anxiety of not knowing transforms into the productive tension of analysis.\n\nOver time, patterns emerge that you couldn't see while caught in the emotional current. Your conversations shift from "I don't know what to do" to "Here's what I'm considering and why." Others begin to trust your process, even if they don't fully understand it.\n\nThree months in, the analytical framework has become second nature. You notice you're making smaller decisions faster, with more confidence. The big decision — the one that brought you here — has been quietly reshaping itself as you gathered information. What once felt like an impossible choice now feels like a natural progression.\n\nOne year later, you look back and recognize that the decision itself was less important than the discipline of thinking it through. You've developed a relationship with uncertainty that serves you in every area of life. The occasional pang of "what if" still visits, but it feels more like curiosity than regret.`,
    },
    {
      id: "rebel",
      archetype_name: "The Rebel",
      mythological_mapping: { deity: "Loki", domain: "Chaos & Transformation", symbol: "🔥" },
      personality_traits: ["Bold", "Unconventional", "Instinctive", "Fearless"],
      reasoning_analysis: `This self looks at "${snippet}..." and laughs. The obvious choice is boring. The exciting answer is the one that scares you most. Growth lives outside comfort zones.`,
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
      decision_intelligence: {
        why_this_self: `This self is pulling at you because somewhere beneath the careful consideration, there's a version of you that's tired of playing it safe. Your situation — "${snippet}..." — has been sitting in the waiting room of your mind for too long. The Rebel recognizes that your hesitation isn't caution; it's the accumulated weight of every time you chose comfort over growth. Right now, at this exact moment, something in you is ready to break a pattern. The restlessness you feel isn't anxiety — it's your unlived life demanding attention.`,
        hidden_costs: `The path of bold action comes with its own invisible price. The adrenaline of disruption can become addictive, leading you to create chaos even when stability would serve you better. Relationships built on your "old" identity may strain or break — not everyone can follow you into the unknown. There's also the quiet cost of burning bridges: some doors, once closed, don't reopen on your timeline. The deepest hidden cost is this: in the rush to become someone new, you may lose appreciation for who you already are.`,
        internal_resistance: `Your hesitation toward this self reveals something important: you've been hurt before by impulsive decisions, or you've watched someone else pay the price for recklessness. The resistance isn't cowardice — it's accumulated wisdom from scars you carry. Part of you knows that "fearless" is a performance, and that true courage includes the fear. You resist the Rebel not because you lack boldness, but because you've learned that some things, once disrupted, can't be reassembled.`,
      },
      future_roadmap: `It starts with a single act of defiance — not against anyone else, but against your own inertia. The first week feels like free-falling: exhilarating, terrifying, and strangely clarifying. You discover that the worst-case scenarios you'd imagined were paper tigers.\n\nBy the second month, the initial chaos has settled into a new rhythm. It's not the stability you knew before — it's wilder, less predictable, but undeniably more alive. People around you are divided: some are inspired, others are worried. You learn to distinguish between genuine concern and projected fear.\n\nSix months in, you barely recognize your old patterns. The decision that felt so monumental has become a footnote in a larger story of transformation. New challenges have appeared — ones you couldn't have predicted — but you face them differently now. The muscle of risk-taking has been exercised, and it responds more naturally.\n\nOne year later, the rebellion has matured into something sustainable. You've kept the fire but learned to direct it. The person you were before this decision feels like a photograph — real, but flat. You've added dimensions to yourself that only exist because you chose to leap.`,
    },
    {
      id: "guardian",
      archetype_name: "The Guardian",
      mythological_mapping: { deity: "Hestia", domain: "Stability & Protection", symbol: "🛡️" },
      personality_traits: ["Protective", "Nurturing", "Risk-aware", "Grounded"],
      reasoning_analysis: `This self sees "${snippet}..." through the lens of what must be preserved. What do you have that's worth protecting? What would you lose if this goes wrong?`,
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
      decision_intelligence: {
        why_this_self: `This self speaks to you now because, beneath the surface excitement of change, there's something you're afraid to lose. Your situation — "${snippet}..." — isn't just about choosing a direction; it's about protecting what you've already built, the people who depend on you, and the quiet achievements that don't make dramatic stories but form the bedrock of your life. The Guardian resonates because your instinct to protect isn't limitation — it's love expressed as caution. At this point in your life, honoring what exists may be the most courageous thing you can do.`,
        hidden_costs: `The cost of protection is that it can quietly become a prison. By prioritizing safety, you may find yourself building walls that keep out not just threats but also opportunities. Over time, the comfort of stability can erode your tolerance for any uncertainty, making even small changes feel disproportionately threatening. The people you protect may eventually feel overprotected — your care, though well-intentioned, can inadvertently communicate that you don't trust them (or yourself) to handle difficulty. The deepest cost: you may reach a point where you've preserved everything except your own growth.`,
        internal_resistance: `You resist the Guardian because part of you knows that safety, taken to its extreme, is just another word for stagnation. There's a memory — perhaps distant, perhaps recent — of a time when playing it safe cost you something irreplaceable: a relationship that needed boldness, an opportunity that required risk, a version of yourself that could only exist on the other side of discomfort. Your resistance to this self isn't recklessness; it's the healthy part of you that knows life sometimes demands we risk what we have to become who we're meant to be.`,
      },
      future_roadmap: `You begin by taking inventory — not just of finances or logistics, but of the emotional infrastructure of your life. What relationships sustain you? What daily rhythms bring peace? The first act isn't dramatic; it's a quiet reinforcement of foundations.\n\nOver the first month, the anxiety that drove you to this crossroads begins to dissolve. Not because the decision has been made, but because the ground beneath you feels solid again. From this place of security, clarity emerges naturally — unhurried and unclouded by fear.\n\nThree months later, you notice something unexpected: the stability you've cultivated has created space for a gentler kind of courage. Small experiments become possible because failure won't be catastrophic. You begin to explore change not as an escape from your current life, but as an enrichment of it.\n\nOne year on, the transformation is subtle but profound. Others may not see dramatic change, but you feel it — a deepened relationship with yourself, a quiet confidence that doesn't need external validation. The things you protected have grown stronger, and so have you. The path was slower, but nothing was lost along the way.`,
    },
    {
      id: "visionary",
      archetype_name: "The Visionary",
      mythological_mapping: { deity: "Prometheus", domain: "Foresight & Innovation", symbol: "🔮" },
      personality_traits: ["Future-oriented", "Optimistic", "Creative", "Ambitious"],
      reasoning_analysis: `This self zooms out from "${snippet}..." to see the 10-year picture. The current dilemma is just a pixel in a much larger canvas being painted.`,
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
      decision_intelligence: {
        why_this_self: `This self is calling to you because the choice you're facing — "${snippet}..." — feels artificially constrained. The Visionary in you senses that the real answer isn't hiding among the existing options; it's waiting to be invented. You're drawn to this perspective because you've always suspected that the best chapters of your life weren't chosen from a menu — they were written from scratch. Right now, your creative intelligence is trying to tell you something: the problem isn't choosing between paths, it's that you're looking at someone else's map.`,
        hidden_costs: `The visionary path carries a cost that's easy to overlook in the excitement of possibility: the gap between imagination and execution can become a permanent address. Grand visions require granular follow-through, and the very creativity that generates breakthrough ideas can struggle with the monotonous work of making them real. Others may tire of your "next big thing" before the current one has fully materialized. The deeper cost is temporal: while you're building tomorrow, today passes unlived. Relationships, health, and present-moment joy can become collateral damage in the pursuit of an imagined future.`,
        internal_resistance: `You hesitate toward the Visionary because experience has taught you that not every brilliant idea survives contact with reality. There may be unfinished projects in your past — beautiful visions that withered when enthusiasm faded. Your resistance carries wisdom: it knows that optimism without discipline is just daydreaming, and that "creating a third option" can sometimes be an elegant way of avoiding the difficult choice that's actually in front of you. The fear isn't of thinking big — it's of building castles in the air while the ground-level work goes undone.`,
      },
      future_roadmap: `The journey begins with a shift in perception. Where others see a fork in the road, you begin to see open terrain. The first days are electric with possibility — notebooks fill with ideas, conversations spark new connections, and the original dilemma starts to feel like a doorway rather than a wall.\n\nOne month in, the initial burst of creative energy has coalesced around a central insight. You've found the thread that connects what seemed like incompatible options. It's not a compromise — it's a synthesis. The people closest to you are starting to catch your excitement, though some remain skeptical.\n\nBy six months, the vision is taking tangible form. There have been setbacks — reality has a way of editing grand plans — but each obstacle has refined rather than diminished the core idea. You've learned to hold the vision loosely enough to adapt while firmly enough to persist.\n\nOne year later, you've created something that didn't exist in the original choice set. Looking back, the dilemma that brought you here was the necessary pressure that produced something genuinely new. The vision has evolved beyond what you initially imagined, shaped by both your ambition and your willingness to be surprised.`,
    },
    {
      id: "realist",
      archetype_name: "The Realist",
      mythological_mapping: { deity: "Hermes", domain: "Balance & Pragmatism", symbol: "⚖️" },
      personality_traits: ["Pragmatic", "Balanced", "Adaptable", "Clear-eyed"],
      reasoning_analysis: `This self sees "${snippet}..." exactly as it is — no romanticizing, no catastrophizing. What are the actual facts? What's actually at stake?`,
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
      decision_intelligence: {
        why_this_self: `This self appeals to you because you're exhausted by the drama of indecision. Your situation — "${snippet}..." — has been inflated by anxiety into something larger than it actually is. The Realist in you knows that most decisions aren't as permanent or catastrophic as they feel in the moment. You're drawn to this perspective because part of you craves permission to stop agonizing and simply move. The truth the Realist offers is uncomfortable but freeing: the "right" answer matters less than your ability to adapt to whatever answer you choose.`,
        hidden_costs: `Pragmatism's hidden cost is the gradual erosion of wonder. By stripping decisions of their emotional weight, you may also strip them of their meaning. A life of sensible choices, efficiently executed, can arrive at a destination that's perfectly adequate and quietly disappointing. The Realist's clarity can shade into cynicism — seeing things "as they are" sometimes means missing what they could become. The deeper cost: by always choosing the next small step, you may never take the transformative leap that requires irrational commitment. Some of life's most important decisions need to be felt, not calculated.`,
        internal_resistance: `You resist the Realist because there's a part of you that finds pragmatism boring — and that part isn't wrong. Your resistance speaks to a longing for something more: a decision that means something, a choice that reshapes your identity rather than merely adjusting your circumstances. You've seen what "sensible" looks like stretched over decades, and something in you rebels against its quiet predictability. The hesitation isn't impracticality; it's your deeper self insisting that some moments deserve more than a measured response.`,
      },
      future_roadmap: `It begins without fanfare. You make the smallest possible move — not the grand gesture your anxiety demanded, but a practical first step. The relief is immediate and surprising: action, even small action, dissolves the paralysis that indecision creates.\n\nOver the next month, each small step generates real information. Hypotheticals are replaced by experience. You discover that some fears were unfounded and some hopes were inflated, and the reality — as always — is more interesting than either extreme. Your confidence grows not from certainty but from adaptability.\n\nAt three months, you've accumulated enough data points to see a pattern. The direction isn't what you expected, but it feels right in a way that no amount of planning could have predicted. You've learned to trust the process of iteration over the illusion of perfect planning.\n\nOne year later, the path you've walked looks nothing like what you imagined at the start. It's neither the dramatic transformation the Rebel promised nor the steady progression the Guardian offered. It's something uniquely yours — a series of conscious, adjusted steps that led to a place that feels earned. The original dilemma? You can barely remember why it felt so overwhelming.`,
    },
  ];
}
