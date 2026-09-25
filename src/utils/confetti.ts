// Lightweight particle sparkle burst using HTML5 Canvas

export function triggerSparkles(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = (canvas.width = canvas.offsetWidth);
  const height = (canvas.height = canvas.offsetHeight);

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    rotation: number;
    vRot: number;
    decay: number;
  }

  const colors = [
    '#f472b6', // pink-400
    '#c084fc', // purple-400
    '#60a5fa', // blue-400
    '#38bdf8', // sky-400
    '#fbbf24', // amber-400
    '#ffffff', // bright sparkle
  ];

  const particles: Particle[] = [];
  const particleCount = 45;

  const centerX = width / 2;
  const centerY = height / 2;

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    particles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 3 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * Math.PI,
      vRot: (Math.random() - 0.5) * 0.2,
      decay: 0.015 + Math.random() * 0.02,
    });
  }

  let animationFrameId: number;

  function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    let activeParticles = 0;

    for (const p of particles) {
      if (p.alpha <= 0) continue;
      activeParticles++;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // subtle gravity
      p.vx *= 0.98; // air resistance
      p.rotation += p.vRot;
      p.alpha -= p.decay;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;

      // Draw star or diamond sparkle
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.lineTo(p.size * 0.4, -p.size * 0.2);
      ctx.lineTo(p.size, 0);
      ctx.lineTo(p.size * 0.4, p.size * 0.2);
      ctx.lineTo(0, p.size);
      ctx.lineTo(-p.size * 0.4, p.size * 0.2);
      ctx.lineTo(-p.size, 0);
      ctx.lineTo(-p.size * 0.4, -p.size * 0.2);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    if (activeParticles > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  render();

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}
