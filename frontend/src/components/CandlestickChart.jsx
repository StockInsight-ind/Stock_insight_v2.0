import { useEffect, useRef } from "react";

export default function CandlestickChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let offset = 0;
    let animationId;

    // Generate random OHLC data
    const generateCandles = (count) => {
      const candles = [];
      let price = 100;
      for (let i = 0; i < count; i++) {
        const open = price;
        price += (Math.random() - 0.5) * 8;
        const close = price;
        const high = Math.max(open, close) + Math.random() * 3;
        const low = Math.min(open, close) - Math.random() * 3;
        candles.push({ open, high, low, close });
      }
      return candles;
    };

    const candles = generateCandles(60);
    const candleWidth = 8;
    const gap = 2;
    const padding = 30;

    const draw = () => {
      ctx.fillStyle = "rgba(5, 10, 30, 0)";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const maxPrice = Math.max(...candles.map((c) => c.high));
      const minPrice = Math.min(...candles.map((c) => c.low));
      const priceRange = maxPrice - minPrice;

      const scaleY = (canvas.offsetHeight - padding * 2) / priceRange;

      // Draw candles
      candles.forEach((candle, i) => {
        const x = (i - Math.floor(offset)) * (candleWidth + gap) + padding;

        if (x > -candleWidth && x < canvas.offsetWidth) {
          const isGreen = candle.close >= candle.open;
          const highY = canvas.offsetHeight - padding - (candle.high - minPrice) * scaleY;
          const lowY = canvas.offsetHeight - padding - (candle.low - minPrice) * scaleY;
          const openY = canvas.offsetHeight - padding - (candle.open - minPrice) * scaleY;
          const closeY = canvas.offsetHeight - padding - (candle.close - minPrice) * scaleY;

          // Wick (high-low line)
          ctx.strokeStyle = isGreen ? "rgba(34, 197, 94, 0.5)" : "rgba(239, 68, 68, 0.5)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x + candleWidth / 2, highY);
          ctx.lineTo(x + candleWidth / 2, lowY);
          ctx.stroke();

          // Body (open-close rectangle)
          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.abs(openY - closeY) || 2;
          ctx.fillStyle = isGreen ? "rgba(34, 197, 94, 0.7)" : "rgba(239, 68, 68, 0.7)";
          ctx.fillRect(x, bodyTop, candleWidth, bodyHeight);
        }
      });

      offset += 0.05; // Slow scroll left
      if (offset > candles.length) offset = 0;

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="candlestick-chart"
      style={{
        position: "absolute",
        top: "35%",
        left: 0,
        width: "100%",
        height: "40%",
        opacity: 0.4,
      }}
    />
  );
}
