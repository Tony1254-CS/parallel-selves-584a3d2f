import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the Quantum AI engine for PARALLEL — an Alternate Self Simulator. 

Given the user's situation, conflict, or decision dilemma, you MUST generate exactly 5 parallel selves using the tool provided. Each self represents a distinct archetype that interprets the user's situation differently.

The 5 archetypes are ALWAYS:
1. Analyst (dimension: "analyst") - logic-driven, methodical. Mythological mapping: Athena, Wisdom & Strategy, symbol 🦉
2. Rebel (dimension: "rebel") - creative, chaotic, bold. Mythological mapping: Loki, Chaos & Transformation, symbol 🔥  
3. Guardian (dimension: "guardian") - protective, risk-aware, grounding. Mythological mapping: Hestia, Stability & Protection, symbol 🛡️
4. Visionary (dimension: "visionary") - optimistic, future-oriented, creative. Mythological mapping: Prometheus, Foresight & Innovation, symbol 🔮
5. Realist (dimension: "realist") - balanced, pragmatic, clear-eyed. Mythological mapping: Hermes, Balance & Pragmatism, symbol ⚖️

For each self, provide deeply personalized and psychologically insightful content. Make it feel like the user is truly seeing alternate versions of themselves. Each self should have a distinct voice and reasoning style.

Timeline predictions should be vivid, specific, and emotionally resonant — not generic. Ground them in the user's actual situation.

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
              description: "Generate 5 parallel selves based on the user's situation",
              parameters: {
                type: "object",
                properties: {
                  selves: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        archetype_name: { type: "string", description: "e.g. 'The Analyst'" },
                        dimension: { type: "string", enum: ["analyst", "rebel", "guardian", "visionary", "realist"] },
                        personality_traits: { type: "array", items: { type: "string" }, description: "4 traits" },
                        reasoning_analysis: { type: "string", description: "2-3 sentences: how this self interprets the situation" },
                        suggested_action: { type: "string", description: "Concrete actionable advice from this self's perspective" },
                        emotional_prediction: { type: "string", description: "What emotional journey this path creates" },
                        confidence_score: { type: "number", description: "0.65-0.95" },
                        timeline_week: { type: "string", description: "Vivid prediction 1 week later" },
                        timeline_month: { type: "string", description: "Vivid prediction 1 month later" },
                        timeline_year: { type: "string", description: "Speculative prediction 1 year later" },
                      },
                      required: [
                        "archetype_name", "dimension", "personality_traits",
                        "reasoning_analysis", "suggested_action", "emotional_prediction",
                        "confidence_score", "timeline_week", "timeline_month", "timeline_year"
                      ],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["selves"],
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
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      throw new Error("No tool call in AI response");
    }

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
      timeline: {
        week: s.timeline_week,
        month: s.timeline_month,
        year: s.timeline_year,
      },
    }));

    return new Response(JSON.stringify({ selves }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-selves error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
