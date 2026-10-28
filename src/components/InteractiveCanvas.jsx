import { useEffect, useRef } from 'react';

export function InteractiveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth);
    let height = (canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
      height = canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle constellation system (Emerald Theme)
    const particleCount = Math.min(Math.floor((width * height) / 16000), 65);
    const particles = [];
    const mouse = { x: -1000, y: -1000, radius: 130 };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.8 + 1,
        color: i % 2 === 0 ? 'rgba(52, 211, 153, ' : 'rgba(16, 185, 129, '
      });
    }

    // Green Comet System
    const comet = {
      active: true,
      x: -50,
      y: Math.random() * (height * 0.4),
      vx: 9,
      vy: 4.5,
      radius: 3.5,
      tailHistory: [],
      maxTail: 28,
      sparks: [],
      nextSpawn: 0
    };

    const resetComet = () => {
      comet.active = true;
      // Start from top-left or top-right
      const fromLeft = Math.random() > 0.3;
      if (fromLeft) {
        comet.x = -60;
        comet.y = Math.random() * (height * 0.35);
        comet.vx = Math.random() * 4 + 8;
        comet.vy = Math.random() * 2 + 3.5;
      } else {
        comet.x = width + 60;
        comet.y = Math.random() * (height * 0.35);
        comet.vx = -(Math.random() * 4 + 8);
        comet.vy = Math.random() * 2 + 3.5;
      }
      comet.tailHistory = [];
      comet.sparks = [];
    };

    const handleMouseMove = (e) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // --- 1. RENDER CONSTELLATION PARTICLES ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse reaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 2.2;
          p.y -= (dy / dist) * force * 2.2;
        }

        // Particle circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}0.7)`;
        ctx.fill();

        // Connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 125) {
            const alpha = (1 - cdist / 125) * 0.24;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // --- 2. RENDER GREEN COMET ---
      if (comet.active) {
        comet.x += comet.vx;
        comet.y += comet.vy;

        comet.tailHistory.push({ x: comet.x, y: comet.y });
        if (comet.tailHistory.length > comet.maxTail) {
          comet.tailHistory.shift();
        }

        // Emit small trailing sparks
        if (Math.random() > 0.3) {
          comet.sparks.push({
            x: comet.x + (Math.random() - 0.5) * 6,
            y: comet.y + (Math.random() - 0.5) * 6,
            vx: -comet.vx * 0.15 + (Math.random() - 0.5) * 1.5,
            vy: -comet.vy * 0.15 + (Math.random() - 0.5) * 1.5,
            alpha: 0.9,
            size: Math.random() * 2 + 1
          });
        }

        // Draw glowing comet tail
        if (comet.tailHistory.length > 2) {
          for (let i = 0; i < comet.tailHistory.length - 1; i++) {
            const p1 = comet.tailHistory[i];
            const p2 = comet.tailHistory[i + 1];
            const progress = i / comet.tailHistory.length; // 0 at tail tip, 1 at head

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(52, 211, 153, ${progress * 0.75})`;
            ctx.lineWidth = progress * 4.5 + 0.5;
            ctx.lineCap = 'round';
            ctx.stroke();
          }
        }

        // Draw sparks
        for (let s = comet.sparks.length - 1; s >= 0; s--) {
          const sp = comet.sparks[s];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.alpha -= 0.035;

          if (sp.alpha <= 0) {
            comet.sparks.splice(s, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(110, 231, 183, ${sp.alpha})`;
          ctx.fill();
        }

        // Draw bright comet head & aura
        ctx.save();
        ctx.shadowBlur = 22;
        ctx.shadowColor = '#34d399';

        // Outer glow
        const headGrad = ctx.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, 14);
        headGrad.addColorStop(0, '#ffffff');
        headGrad.addColorStop(0.3, '#34d399');
        headGrad.addColorStop(0.8, 'rgba(16, 185, 129, 0.4)');
        headGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = headGrad;
        ctx.fill();

        // Inner white-hot nucleus
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, comet.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();

        // Check if comet exited view
        if (comet.x > width + 100 || comet.x < -100 || comet.y > height + 100) {
          comet.active = false;
          comet.nextSpawn = Date.now() + Math.random() * 3000 + 2500; // 2.5 - 5.5s delay
        }
      } else {
        if (Date.now() > comet.nextSpawn) {
          resetComet();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85
      }}
    />
  );
}
