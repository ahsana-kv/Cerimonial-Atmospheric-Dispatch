import React, { useEffect, useRef } from 'react';
import { SnowflakeParticle, BalloonParticle, WindDirection } from '../types';

interface AtmosphereCanvasProps {
  isSnowing: boolean;
  snowRemainingMs: number;
  isBalloons: boolean;
  balloonsRemainingMs: number;
  wind: WindDirection;
  onParticleCountChange?: (snowCount: number, balloonCount: number) => void;
}

// Formal rich color palette for celebratory balloons
const BALLOON_PALETTES = [
  { fill: '#9f1239', knot: '#881337', highlight: 'rgba(255, 228, 230, 0.45)' }, // Royal Burgundy
  { fill: '#1e3a8a', knot: '#172554', highlight: 'rgba(219, 234, 254, 0.45)' }, // Midnight Sapphire
  { fill: '#b45309', knot: '#78350f', highlight: 'rgba(254, 243, 199, 0.5)' },  // Burnished Amber Gold
  { fill: '#065f46', knot: '#022c22', highlight: 'rgba(209, 250, 229, 0.45)' }, // Imperial Emerald
  { fill: '#4c1d95', knot: '#2e1065', highlight: 'rgba(243, 232, 255, 0.45)' }, // Regal Amethyst
  { fill: '#334155', knot: '#1e293b', highlight: 'rgba(248, 250, 252, 0.5)' },  // Platinum Slate
  { fill: '#be185d', knot: '#831843', highlight: 'rgba(253, 242, 248, 0.45)' }, // Rose Damask
];

export const AtmosphereCanvas: React.FC<AtmosphereCanvasProps> = ({
  isSnowing,
  snowRemainingMs,
  isBalloons,
  balloonsRemainingMs,
  wind,
  onParticleCountChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Particle pools
  const snowflakesRef = useRef<SnowflakeParticle[]>([]);
  const balloonsRef = useRef<BalloonParticle[]>([]);

  // Spawn timers
  const lastSnowSpawnRef = useRef<number>(0);
  const lastBalloonSpawnRef = useRef<number>(0);
  const nextIdRef = useRef<number>(1);

  // References to keep props accessible inside animation loop without restarting loop
  const propsRef = useRef({
    isSnowing,
    snowRemainingMs,
    isBalloons,
    balloonsRemainingMs,
    wind,
  });

  useEffect(() => {
    propsRef.current = {
      isSnowing,
      snowRemainingMs,
      isBalloons,
      balloonsRemainingMs,
      wind,
    };
  }, [isSnowing, snowRemainingMs, isBalloons, balloonsRemainingMs, wind]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Snowflake branch renderer
    const drawSnowflake = (flake: SnowflakeParticle) => {
      ctx.save();
      ctx.translate(flake.x, flake.y);
      ctx.rotate(flake.rotation);

      const r = flake.baseRadius;
      ctx.strokeStyle = `rgba(245, 250, 255, ${flake.alpha})`;
      ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha * 0.9})`;
      ctx.lineWidth = 1.75;
      ctx.lineCap = 'round';

      // Delicate central hexagonal nucleus
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const hx = Math.cos(angle) * (r * 0.3);
        const hy = Math.sin(angle) * (r * 0.3);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();

      // Six dendritic branches
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        ctx.save();
        ctx.rotate(angle);

        // Main spine
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r);
        ctx.stroke();

        // Outer chevron branches
        const branchPos1 = -r * 0.55;
        const branchLen1 = r * 0.35;
        ctx.beginPath();
        ctx.moveTo(0, branchPos1);
        ctx.lineTo(-branchLen1, branchPos1 + branchLen1 * 0.6);
        ctx.moveTo(0, branchPos1);
        ctx.lineTo(branchLen1, branchPos1 + branchLen1 * 0.6);

        // Secondary outer chevron branches
        const branchPos2 = -r * 0.85;
        const branchLen2 = r * 0.25;
        ctx.moveTo(0, branchPos2);
        ctx.lineTo(-branchLen2, branchPos2 + branchLen2 * 0.6);
        ctx.moveTo(0, branchPos2);
        ctx.lineTo(branchLen2, branchPos2 + branchLen2 * 0.6);
        ctx.stroke();

        ctx.restore();
      }

      ctx.restore();
    };

    // Balloon renderer
    const drawBalloon = (balloon: BalloonParticle) => {
      ctx.save();
      ctx.translate(balloon.x, balloon.y);
      ctx.rotate(balloon.tilt);

      const w = balloon.width;
      const h = balloon.height;
      const halfW = w / 2;
      const halfH = h / 2;

      // Draw string first (behind balloon)
      ctx.save();
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const stringTopY = halfH + 4;
      ctx.moveTo(0, stringTopY);

      // Sinuous dynamic wave for trailing string
      const wave = Math.sin(balloon.stringWavePhase) * 7;
      const waveMid = Math.cos(balloon.stringWavePhase * 1.3) * 6;
      ctx.bezierCurveTo(
        wave,
        stringTopY + balloon.stringLength * 0.35,
        -waveMid,
        stringTopY + balloon.stringLength * 0.7,
        wave * 0.5,
        stringTopY + balloon.stringLength
      );
      ctx.stroke();
      ctx.restore();

      // Balloon knot
      ctx.fillStyle = balloon.knotColor;
      ctx.beginPath();
      ctx.moveTo(-4, halfH);
      ctx.lineTo(4, halfH);
      ctx.lineTo(0, halfH + 5);
      ctx.closePath();
      ctx.fill();

      // Balloon body (classic elegant teardrop oval)
      ctx.beginPath();
      ctx.moveTo(0, -halfH); // Top center
      // Top-right to bottom taper
      ctx.bezierCurveTo(halfW * 1.15, -halfH * 0.95, halfW * 1.05, halfH * 0.3, 3, halfH);
      ctx.lineTo(-3, halfH);
      // Bottom taper to top-left
      ctx.bezierCurveTo(-halfW * 1.05, halfH * 0.3, -halfW * 1.15, -halfH * 0.95, 0, -halfH);
      ctx.closePath();

      // Shaded radial gradient for rich 3D formal volume
      const gradient = ctx.createRadialGradient(
        -halfW * 0.3,
        -halfH * 0.35,
        halfW * 0.1,
        0,
        0,
        halfW * 1.2
      );
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.2, balloon.color);
      gradient.addColorStop(0.85, balloon.color);
      gradient.addColorStop(1, balloon.knotColor);

      ctx.fillStyle = gradient;
      ctx.fill();

      // Specular 3D highlight (crescent gloss on upper-left quadrant)
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(-halfW * 0.32, -halfH * 0.35, halfW * 0.22, halfH * 0.35, -Math.PI / 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
      ctx.fill();
      ctx.restore();

      ctx.restore();
    };

    // Main animation frame loop
    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const { isSnowing, snowRemainingMs, isBalloons, balloonsRemainingMs, wind } = propsRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear frame
      ctx.clearRect(0, 0, width, height);

      // Wind drift force
      let windX = 0;
      if (wind === 'east') windX = 35;
      if (wind === 'west') windX = -35;

      // 1. SPAWN SNOWFLAKES (medium size, falling from top)
      if (isSnowing && snowRemainingMs > 0) {
        // Spawn interval: ~45ms between flakes for a graceful medium density
        if (currentTime - lastSnowSpawnRef.current > 42) {
          lastSnowSpawnRef.current = currentTime;

          // Spawn 1-2 medium snowflakes
          const count = 1 + (Math.random() > 0.4 ? 1 : 0);
          for (let i = 0; i < count; i++) {
            // Medium size snowflake: radius 13 - 17.5px (diameter 26 - 35px)
            const baseRadius = 13 + Math.random() * 4.5;
            snowflakesRef.current.push({
              id: nextIdRef.current++,
              x: Math.random() * (width + 120) - 60,
              y: -baseRadius - 15 - Math.random() * 30,
              baseRadius,
              speedY: 75 + Math.random() * 65, // 75 - 140 px/sec
              swayFreq: 1.2 + Math.random() * 1.4,
              swayAmp: 18 + Math.random() * 22,
              phase: Math.random() * Math.PI * 2,
              rotation: Math.random() * Math.PI * 2,
              rotSpeed: (Math.random() - 0.5) * 1.5,
              alpha: 0.75 + Math.random() * 0.22,
              branches: 6,
              branchDetail: 2,
            });
          }
        }
      }

      // 2. SPAWN BALLOONS (medium size, floating from bottom)
      if (isBalloons && balloonsRemainingMs > 0) {
        // Spawn interval: ~120ms between balloons for a stately, celebratory procession
        if (currentTime - lastBalloonSpawnRef.current > 110) {
          lastBalloonSpawnRef.current = currentTime;

          // Medium size balloon: width 40-48px, height 52-62px
          const palette = BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)];
          const balloonWidth = 41 + Math.random() * 6;
          const balloonHeight = balloonWidth * 1.28;

          balloonsRef.current.push({
            id: nextIdRef.current++,
            x: Math.random() * (width - 100) + 50,
            y: height + balloonHeight + 20 + Math.random() * 40,
            width: balloonWidth,
            height: balloonHeight,
            speedY: 105 + Math.random() * 55, // 105 - 160 px/sec
            swayFreq: 1.1 + Math.random() * 1.2,
            swayAmp: 22 + Math.random() * 20,
            phase: Math.random() * Math.PI * 2,
            tilt: 0,
            color: palette.fill,
            knotColor: palette.knot,
            stringLength: 52 + Math.random() * 16,
            stringWavePhase: Math.random() * Math.PI * 2,
            alpha: 0.95,
          });
        }
      }

      // 3. UPDATE & DRAW SNOWFLAKES (Top to Bottom)
      const survivingSnow: SnowflakeParticle[] = [];
      for (let i = 0; i < snowflakesRef.current.length; i++) {
        const flake = snowflakesRef.current[i];

        // Move downward
        flake.y += flake.speedY * dt;
        flake.phase += flake.swayFreq * dt;
        flake.x += (Math.sin(flake.phase) * flake.swayAmp * 0.7 + windX) * dt;
        flake.rotation += flake.rotSpeed * dt;

        // Draw
        drawSnowflake(flake);

        // Keep until below screen
        if (flake.y < height + flake.baseRadius + 20) {
          survivingSnow.push(flake);
        }
      }
      snowflakesRef.current = survivingSnow;

      // 4. UPDATE & DRAW BALLOONS (Bottom to Top)
      const survivingBalloons: BalloonParticle[] = [];
      for (let i = 0; i < balloonsRef.current.length; i++) {
        const balloon = balloonsRef.current[i];

        // Float upward
        balloon.y -= balloon.speedY * dt;
        balloon.phase += balloon.swayFreq * dt;
        const horizontalDelta = (Math.sin(balloon.phase) * balloon.swayAmp * 0.7 + windX) * dt;
        balloon.x += horizontalDelta;
        balloon.tilt = Math.sin(balloon.phase) * 0.12 + (windX !== 0 ? (windX > 0 ? 0.08 : -0.08) : 0);
        balloon.stringWavePhase += dt * 3.5;

        // Draw
        drawBalloon(balloon);

        // Keep until above screen with string cleared
        if (balloon.y > -(balloon.height + balloon.stringLength + 30)) {
          survivingBalloons.push(balloon);
        }
      }
      balloonsRef.current = survivingBalloons;

      // Report active counts if requested
      if (onParticleCountChange && (currentTime % 250 < 20)) {
        onParticleCountChange(survivingSnow.length, survivingBalloons.length);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [onParticleCountChange]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 w-full h-full"
      aria-hidden="true"
    />
  );
};
