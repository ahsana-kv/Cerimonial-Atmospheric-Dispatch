import React from 'react';
import { Sparkles, Sliders } from 'lucide-react';

interface HeaderProps {
  onOpenProtocolModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProtocolModal }) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-8 px-6 lg:px-12 py-4 bg-[#0c1017]/90 backdrop-blur-md border-b border-stone-800/80">
      {/* Zone 1: Brand Wordmark (Single text element, no adjacent badges) */}
      <a
        href="#"
        className="font-serif-display text-xl lg:text-2xl font-medium tracking-wide text-amber-100 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
      >
        Aethelgard Ceremonial Pavilion
      </a>

      {/* Zone 2: 4-5 Clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-sans-ui text-stone-400">
        <a
          href="#console"
          className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
        >
          Dispatch Console
        </a>
        <a
          href="#specifications"
          className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
        >
          Particle Dynamics
        </a>
        <a
          href="#registry"
          className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
        >
          Ceremonial Ledger
        </a>
        <a
          href="#architecture"
          className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
        >
          Chamber Architecture
        </a>
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenProtocolModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase text-stone-200 bg-stone-900 border border-stone-700/80 hover:border-amber-500/50 hover:bg-stone-800 hover:text-amber-200 rounded-md transition-all whitespace-nowrap shrink-0 shadow-sm"
        >
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span>Chamber Protocol</span>
        </button>
      </div>
    </header>
  );
};
