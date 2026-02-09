import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the Quantum AI engine for PARALLEL — an Alternate Self Simulator and Decision Intelligence system.

Given the user's situation, conflict, or decision dilemma, you MUST generate exactly 5 parallel selves plus an identity_mirror reflection and a hidden_self using the tool provided.

IDENTITY MIRROR (CRITICAL):
Generate a 1-2 sentence poetic, psychologically insightful observation about the user's current internal state based on their input. It should feel like a mirror reflecting their emotional tension. Example tone: "You appear to be standing between stability and expansion. Not divided, but negotiating between safety and growth."

The 5 archetypes are ALWAYS:
1. Analyst (dimension: "analyst") - logic-driven, methodical. Mythological mapping: Athena, Wisdom & Strategy, symbol 🦉
2. Rebel (dimension: "rebel") - creative, chaotic, bold. Mythological mapping: Loki, Chaos & Transformation, symbol 🔥  
3. Guardian (dimension: "guardian") - protective, risk-aware, grounding. Mythological mapping: Hestia, Stability & Protection, symbol 🛡️
4. Visionary (dimension: "visionary") - optimistic, future-oriented, creative. Mythological mapping: Prometheus, Foresight & Innovation, symbol 🔮
5. Realist (dimension: "realist") - balanced, pragmatic, clear-eyed. Mythological mapping: Hermes, Balance & Pragmatism, symbol ⚖️

HIDDEN SELF (SURPRISE ARCHETYPE):
Generate a 6th archetype called the hidden_self. This should be a UNIQUE archetype that doesn't fit the 5 standard ones — it emerges from the specific patterns in the user's input. Give it a creative name (e.g. "The Alchemist", "The Wanderer", "The Architect"). Use dimension "visionary" for color mapping. It should feel like a surprise discovery.

DECISION INTELLIGENCE FIELDS (CRITICAL):
- why_this_self: 3-4 sentences explaining why this particular self resonates with the user RIGHT NOW.
- hidden_costs: 3-4 sentences describing the realistic consequences of fully committing to this path.
- internal_resistance: 3-4 sentences exploring why the user might HESITATE to choose this self.
- future_roadmap: A 4-paragraph narrative describing how choosing this self shapes the user's life over time. Stages: first weeks → first months → six months → one year.

Timeline predictions should be vivid, specific, and emotionally resonant.
Confidence scores should vary realistically (0.65-0.95).`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userInput } = await req.json();
    if (!userInput || typeof userInput !== "string") {
      return new Response(JSON.stringify({ error: "userInput is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userInput },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_parallel_selves",
              description: "Generate 5 parallel selves with decision intelligence",
              parameters: {
                type: "object",
                properties: {
                  identity_mirror: { type: "string", description: "1-2 sentence poetic psychological observation of the user's current internal state" },
                  selves: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        archetype_name: { type: "string" },
                        dimension: { type: "string", enum: ["analyst", "rebel", "guardian", "visionary", "realist"] },
                        personality_traits: { type: "array", items: { type: "string" } },
                        reasoning_analysis: { type: "string" },
                        suggested_action: { type: "string" },
                        emotional_prediction: { type: "string" },
                        confidence_score: { type: "number" },
                        timeline_week: { type: "string" },
                        timeline_month: { type: "string" },
                        timeline_year: { type: "string" },
                        why_this_self: { type: "string" },
                        hidden_costs: { type: "string" },
                        internal_resistance: { type: "string" },
                        future_roadmap: { type: "string" },
                      },
                      required: [
                        "archetype_name", "dimension", "personality_traits",
                        "reasoning_analysis", "suggested_action", "emotional_prediction",
                        "confidence_score", "timeline_week", "timeline_month", "timeline_year",
                        "why_this_self", "hidden_costs", "internal_resistance", "future_roadmap"
                      ],
                      additionalProperties: false,
                    },
                  },
                  hidden_self: {
                    type: "object",
                    properties: {
                      archetype_name: { type: "string" },
                      personality_traits: { type: "array", items: { type: "string" } },
                      reasoning_analysis: { type: "string" },
                      suggested_action: { type: "string" },
                      emotional_prediction: { type: "string" },
                      confidence_score: { type: "number" },
                      timeline_week: { type: "string" },
                      timeline_month: { type: "string" },
                      timeline_year: { type: "string" },
                      why_this_self: { type: "string" },
                      hidden_costs: { type: "string" },
                      internal_resistance: { type: "string" },
                      future_roadmap: { type: "string" },
                      myth_deity: { type: "string" },
                      myth_domain: { type: "string" },
                      myth_symbol: { type: "string" },
                    },
                    required: [
                      "archetype_name", "personality_traits", "reasoning_analysis",
                      "suggested_action", "emotional_prediction", "confidence_score",
                      "timeline_week", "timeline_month", "timeline_year",
                      "why_this_self", "hidden_costs", "internal_resistance", "future_roadmap",
                      "myth_deity", "myth_domain", "myth_symbol"
                    ],
                    additionalProperties: false,
                  },
                },
                required: ["identity_mirror", "selves", "hidden_self"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_parallel_selves" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in AI response");

    const args = JSON.parse(toolCall.function.arguments);
    const mythMappings: Record<string, { deity: string; domain: string; symbol: string }> = {
      analyst: { deity: "Athena", domain: "Wisdom & Strategy", symbol: "🦉" },
      rebel: { deity: "Loki", domain: "Chaos & Transformation", symbol: "🔥" },
      guardian: { deity: "Hestia", domain: "Stability & Protection", symbol: "🛡️" },
      visionary: { deity: "Prometheus", domain: "Foresight & Innovation", symbol: "🔮" },
      realist: { deity: "Hermes", domain: "Balance & Pragmatism", symbol: "⚖️" },
    };

    const selves = args.selves.map((s: any) => ({
      id: s.dimension,
      archetype_name: s.archetype_name,
      mythological_mapping: mythMappings[s.dimension] || mythMappings.realist,
      personality_traits: s.personality_traits,
      reasoning_analysis: s.reasoning_analysis,
      suggested_action: s.suggested_action,
      emotional_prediction: s.emotional_prediction,
      confidence_score: s.confidence_score,
      dimension: s.dimension,
      color: s.dimension,
      timeline: { week: s.timeline_week, month: s.timeline_month, year: s.timeline_year },
      decision_intelligence: {
        why_this_self: s.why_this_self || "",
        hidden_costs: s.hidden_costs || "",
        internal_resistance: s.internal_resistance || "",
      },
      future_roadmap: s.future_roadmap || "",
    }));

    // Build hidden self
    const hs = args.hidden_self;
    const hiddenSelf = hs ? {
      id: "hidden",
      archetype_name: hs.archetype_name,
      mythological_mapping: { deity: hs.myth_deity || "???", domain: hs.myth_domain || "Unknown", symbol: hs.myth_symbol || "🌀" },
      personality_traits: hs.personality_traits,
      reasoning_analysis: hs.reasoning_analysis,
      suggested_action: hs.suggested_action,
      emotional_prediction: hs.emotional_prediction,
      confidence_score: hs.confidence_score,
      dimension: "visionary" as const,
      color: "visionary",
      timeline: { week: hs.timeline_week, month: hs.timeline_month, year: hs.timeline_year },
      decision_intelligence: {
        why_this_self: hs.why_this_self || "",
        hidden_costs: hs.hidden_costs || "",
        internal_resistance: hs.internal_resistance || "",
      },
      future_roadmap: hs.future_roadmap || "",
    } : null;

    return new Response(JSON.stringify({ selves, identity_mirror: args.identity_mirror || "", hidden_self: hiddenSelf }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-selves error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
