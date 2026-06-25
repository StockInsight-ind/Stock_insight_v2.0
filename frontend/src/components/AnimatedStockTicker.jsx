import { useEffect, useRef } from "react";

export default function AnimatedStockTicker() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    let animationId;
    let offset = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 1)";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      const amplitude = 40;
      const frequency = 0.02;

      for (let x = 0; x < width + 200; x += 5) {
        const y = height / 2 + Math.sin((x + offset) * frequency) * amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Second wave with different phase
      ctx.strokeStyle = "rgba(34, 197, 94, 0.1)";
      ctx.beginPath();
      for (let x = 0; x < width + 200; x += 5) {
        const y = height / 2 + Math.sin((x + offset) * frequency + Math.PI) * amplitude * 0.7;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      offset += 1.5;
      animationId = requestAnimationFrame(draw);
    };

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    draw();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="animated-ticker"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
