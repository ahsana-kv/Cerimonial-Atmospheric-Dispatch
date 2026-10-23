import React from 'react';
import { X, CheckCircle2, Snowflake, Gift, Sliders } from 'lucide-react';

interface ProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProtocolModal: React.FC<ProtocolModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0f141d] border border-stone-800 rounded-xl p-6 sm:p-8 shadow-2xl text-stone-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-100 transition-colors"
          aria-label="Close protocol dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-amber-400 mb-2">
          <Sliders className="w-4 h-4" />
          <span>Operational Standard</span>
        </div>

        <h3 className="font-serif-display text-2xl sm:text-3xl font-normal text-stone-100 mb-4">
          Atmospheric Dispatch Protocols
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-stone-300 font-sans-ui leading-relaxed border-t border-b border-stone-800/80 py-5 my-4">
          <div className="flex items-start gap-3">
            <Snowflake className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-100 block font-medium mb-0.5">Snowflakes Directive</strong>
              <span>
                Selecting <strong>"Snowflakes"</strong> commands the upper atmospheric manifold to discharge 
                medium-scale hexagonal ice crystals. Flakes descend gracefully from top to bottom across the 
                entire viewport for a calibrated 5.0-second emission window.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Gift className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-100 block font-medium mb-0.5">Balloons Directive</strong>
              <span>
                Selecting <strong>"Balloons"</strong> triggers the buoyant ceremonial release at the base of the chamber. 
                Medium-scale formal satin balloons float continuously from bottom to top for exactly 5.0 seconds.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-100 block font-medium mb-0.5">Responsiveness Guarantee</strong>
              <span>
                All physical particle simulations execute on an isolated, hardware-accelerated rendering plane. 
                Interface controls remain immediately clickable, interruptible, and non-blocking at all times.
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs uppercase tracking-wider font-medium text-stone-900 bg-amber-300 hover:bg-amber-200 rounded-md transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
