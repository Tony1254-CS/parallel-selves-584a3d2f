import { motion } from "framer-motion";
import { ParallelSelf } from "@/lib/archetypes";
import { useEffect, useRef, useState } from "react";

interface TensionFieldProps {
  selves: ParallelSelf[];
  activeSelf: ParallelSelf | null;
}

const hslColors: Record<string, string> = {
  analyst: "200, 80%, 55%",
  rebel: "350, 85%, 58%",
  guardian: "35, 85%, 55%",
  visionary: "155, 75%, 50%",
  realist: "220, 15%, 60%",
};

const TensionField = ({ selves, activeSelf }: TensionFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ w: 600, h: 300 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (parent) {
      const w = parent.clientWidth;
      const h = 280;
      setDimensions({ w, h });
      canvas.width = w * 2;
      canvas.height = h * 2;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(2, 2);

    // Node positions in a pentagon
    const cx = dimensions.w / 2;
    const cy = dimensions.h / 2;
    const radius = Math.min(cx, cy) * 0.65;

    const nodePositions = selves.map((_, i) => {
      const angle = (i / selves.length) * Math.PI * 2 - Math.PI / 2;
      return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
    });

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, dimensions.w, dimensions.h);
      time += 0.008;

      // Draw connections between all pairs
      for (let i = 0; i < selves.length; i++) {
        for (let j = i + 1; j < selves.length; j++) {
          const a = nodePositions[i];
          const b = nodePositions[j];
          const tensionA = selves[i].confidence_score;
          const tensionB = selves[j].confidence_score;
          const tension = (tensionA + tensionB) / 2;

          const isActive = activeSelf && (selves[i].id === activeSelf.id || selves[j].id === activeSelf.id);
          const alpha = isActive ? 0.35 : 0.08 + Math.sin(time + i + j) * 0.04;

          // Animated energy flow
          const midX = (a.x + b.x) / 2 + Math.sin(time * 2 + i * j) * 12 * tension;
          const midY = (a.y + b.y) / 2 + Math.cos(time * 2 + i * j) * 12 * tension;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(midX, midY, b.x, b.y);
          ctx.strokeStyle = `hsla(${isActive ? (hslColors[activeSelf?.dimension || "realist"]) : "220, 15%, 60%"}, ${alpha})`;
          ctx.lineWidth = isActive ? 1.5 : 0.8;
          ctx.stroke();

          // Traveling particle
          const t = (Math.sin(time * 1.5 + i + j) + 1) / 2;
          const px = a.x + (b.x - a.x) * t + (midX - (a.x + b.x) / 2) * 4 * t * (1 - t);
          const py = a.y + (b.y - a.y) * t + (midY - (a.y + b.y) / 2) * 4 * t * (1 - t);

          ctx.beginPath();
          ctx.arc(px, py, isActive ? 2 : 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hslColors[selves[i].dimension]}, ${isActive ? 0.7 : 0.3})`;
          ctx.fill();
        }
      }

      // Draw nodes
      selves.forEach((self, i) => {
        const pos = nodePositions[i];
        const isActive = activeSelf?.id === self.id;
        const hsl = hslColors[self.dimension];
        const pulseRadius = 18 + Math.sin(time * 2 + i) * 3;

        // Glow
        const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pulseRadius * 2);
        grd.addColorStop(0, `hsla(${hsl}, ${isActive ? 0.25 : 0.08})`);
        grd.addColorStop(1, `hsla(${hsl}, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulseRadius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, isActive ? 8 : 5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hsl}, ${isActive ? 0.9 : 0.5})`;
        ctx.fill();

        // Label
        ctx.font = "10px monospace";
        ctx.fillStyle = `hsla(${hsl}, ${isActive ? 0.9 : 0.5})`;
        ctx.textAlign = "center";
        ctx.fillText(self.archetype_name.replace("The ", ""), pos.x, pos.y + pulseRadius + 12);
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [selves, activeSelf, dimensions.w, dimensions.h]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/30 bg-background/50 backdrop-blur-sm p-4"
    >
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground/60 mb-3 font-mono">
        ⚡ Identity Tension Field
      </p>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: 280 }}
      />
    </motion.div>
  );
};

export default TensionField;
