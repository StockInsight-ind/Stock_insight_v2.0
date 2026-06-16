import { useEffect, useRef } from "react";

export default function GlowingLineChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let animationId;
    let drawProgress = 0;

    // Generate smooth data points
    const dataPoints = [];
    let value = 50;
    for (let i = 0; i < 100; i++) {
      value += (Math.random() - 0.45) * 4;
      value = Math.max(20, Math.min(80, value));
      dataPoints.push(value);
    }

    const draw = () => {
      ctx.fillStyle = "rgba(5, 10, 30, 0)";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const padding = 20;
      const width = canvas.offsetWidth - padding * 2;
      const height = canvas.offsetHeight - padding * 2;
      const step = width / (dataPoints.length - 1);

      // Draw glow effect (multiple blurred strokes)
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let blur = 8; blur >= 1; blur--) {
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.15 / blur})`;
        ctx.lineWidth = 4 + blur;
        ctx.filter = `blur(${blur}px)`;
        ctx.beginPath();

        const maxPoints = Math.ceil((drawProgress / 100) * dataPoints.length);
        for (let i = 0; i < maxPoints; i++) {
          const x = padding + i * step;
          const y = canvas.offsetHeight - padding - (dataPoints[i] / 100) * height;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw main line (sharp, bright)
      ctx.filter = "none";
      ctx.strokeStyle = "#22C55E";
      ctx.lineWidth = 2;
      ctx.beginPath();

      const maxPoints = Math.ceil((drawProgress / 100) * dataPoints.length);
      for (let i = 0; i < maxPoints; i++) {
        const x = padding + i * step;
        const y = canvas.offsetHeight - padding - (dataPoints[i] / 100) * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw fill under curve (gradient fade)
      ctx.lineTo(canvas.offsetWidth - padding, canvas.offsetHeight - padding);
      ctx.lineTo(padding, canvas.offsetHeight - padding);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.offsetHeight);
      gradient.addColorStop(0, "rgba(34, 197, 94, 0.2)");
      gradient.addColorStop(1, "rgba(34, 197, 94, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();

      if (drawProgress < 100) {
        drawProgress += 0.5;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="glowing-line-chart"
      style={{
        position: "absolute",
        bottom: "10%",
        left: 0,
        width: "100%",
        height: "25%",
        opacity: 0.7,
      }}
    />
  );
}
