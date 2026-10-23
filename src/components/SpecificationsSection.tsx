import React from 'react';
import { Layers, ShieldCheck, Compass, Zap } from 'lucide-react';

export const SpecificationsSection: React.FC = () => {
  return (
    <section id="specifications" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-stone-800/80">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400/90 mb-3">
        <span>Particulate Physics & Calibration</span>
        <span aria-hidden="true">·</span>
        <span>Dimensional Standards</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-normal text-stone-100">
            Chamber Dynamic Specifications
          </h2>
          <p className="mt-2 text-sm text-stone-400 font-sans-ui max-w-xl">
            Each atmospheric dispatch conforms to strict physical parameters engineered for fluid motion, 
            naturalistic drift, and responsive interface throughput.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Spec 1: Snowflake Dimension */}
        <div className="bg-[#111722]/60 border border-stone-800/90 rounded-lg p-5">
          <div className="flex items-center gap-2.5 text-sky-400 mb-3">
            <Layers className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-300">
              Snowflake Scale
            </span>
          </div>
          <div className="font-serif-display text-2xl text-stone-100 mb-1">
            Medium · 26–35px
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Hexagonal crystalline lattice with central nucleus and dual-tier chevron branches falling top-to-bottom.
          </p>
          <div className="mt-3 pt-3 border-t border-stone-800/60 text-[11px] font-mono text-stone-400">
            Velocity: 75–140 px/s
          </div>
        </div>

        {/* Spec 2: Balloon Dimension */}
        <div className="bg-[#111722]/60 border border-stone-800/90 rounded-lg p-5">
          <div className="flex items-center gap-2.5 text-amber-400 mb-3">
            <Compass className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-300">
              Balloon Scale
            </span>
          </div>
          <div className="font-serif-display text-2xl text-stone-100 mb-1">
            Medium · 41–48px
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Satin teardrop profile with specular 3D highlight, tied knot base, and sinusoidal trailing string ascending bottom-to-top.
          </p>
          <div className="mt-3 pt-3 border-t border-stone-800/60 text-[11px] font-mono text-stone-400">
            Ascent: 105–160 px/s
          </div>
        </div>

        {/* Spec 3: Temporal Duration */}
        <div className="bg-[#111722]/60 border border-stone-800/90 rounded-lg p-5">
          <div className="flex items-center gap-2.5 text-stone-300 mb-3">
            <Zap className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-300">
              Emission Cycle
            </span>
          </div>
          <div className="font-serif-display text-2xl text-stone-100 mb-1">
            5.00s Duration
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Continuous generation gate calibrated to precisely 5000ms per trigger, allowing graceful particle clearing.
          </p>
          <div className="mt-3 pt-3 border-t border-stone-800/60 text-[11px] font-mono text-stone-400">
            Clock: Precision DOM Timer
          </div>
        </div>

        {/* Spec 4: Rendering & Responsiveness */}
        <div className="bg-[#111722]/60 border border-stone-800/90 rounded-lg p-5">
          <div className="flex items-center gap-2.5 text-emerald-400 mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-300">
              Responsiveness
            </span>
          </div>
          <div className="font-serif-display text-2xl text-stone-100 mb-1">
            60 FPS Composed
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Hardware-accelerated canvas layer completely decoupled from DOM controls to ensure instant button responsiveness.
          </p>
          <div className="mt-3 pt-3 border-t border-stone-800/60 text-[11px] font-mono text-stone-400">
            Zero DOM reflow overhead
          </div>
        </div>
      </div>
    </section>
  );
};
