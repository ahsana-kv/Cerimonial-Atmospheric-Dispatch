import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="architecture" className="w-full border-t border-stone-800/80 bg-[#090d14] text-stone-400 py-12 px-6 lg:px-12 font-sans-ui text-xs">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-serif-display text-lg text-stone-200 block">
            Aethelgard Ceremonial Pavilion
          </span>
          <p className="mt-1 text-stone-400 max-w-sm text-[11px] leading-relaxed">
            Architectural atmospheric projection console. Calibrated for formal galas, seasonal convocations, 
            and precision particulate physical simulations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-wider text-stone-400">
          <a href="#console" className="hover:text-amber-200 transition-colors">Dispatch Console</a>
          <a href="#specifications" className="hover:text-amber-200 transition-colors">Specifications</a>
          <a href="#registry" className="hover:text-amber-200 transition-colors">Archival Ledger</a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-stone-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
        <span>&copy; {new Date().getFullYear()} Aethelgard Ceremonial Chamber. All rights reserved.</span>
        <span>Standard Environmental Physics Protocol · Calibrated 5.00s Duration</span>
      </div>
    </footer>
  );
};
