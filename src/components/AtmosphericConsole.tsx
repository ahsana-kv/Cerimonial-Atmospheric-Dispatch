import React from 'react';
import { Snowflake, Gift, Volume2, VolumeX, Wind, RotateCcw, Clock, Sparkles } from 'lucide-react';
import { WindDirection } from '../types';

interface AtmosphericConsoleProps {
  onTriggerSnowflakes: () => void;
  onTriggerBalloons: () => void;
  onTriggerBoth: () => void;
  onClearChamber: () => void;
  snowRemainingMs: number;
  balloonsRemainingMs: number;
  snowCount: number;
  balloonCount: number;
  wind: WindDirection;
  setWind: (wind: WindDirection) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const AtmosphericConsole: React.FC<AtmosphericConsoleProps> = ({
  onTriggerSnowflakes,
  onTriggerBalloons,
  onTriggerBoth,
  onClearChamber,
  snowRemainingMs,
  balloonsRemainingMs,
  snowCount,
  balloonCount,
  wind,
  setWind,
  soundEnabled,
  setSoundEnabled,
}) => {
  const isSnowActive = snowRemainingMs > 0;
  const isBalloonsActive = balloonsRemainingMs > 0;
  const anyActive = isSnowActive || isBalloonsActive || snowCount > 0 || balloonCount > 0;

  return (
    <div id="console" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Deck */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-400/90 mb-3">
          <span>The Ceremonial Pavilion</span>
          <span aria-hidden="true">·</span>
          <span>Grand Atmospheric Dispatch</span>
          <span aria-hidden="true">·</span>
          <span>5.0s Calibrated Sequence</span>
        </div>
        <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-100 tracking-tight leading-tight">
          Ceremonial Atmospheric Controls
        </h1>
        <p className="mt-4 text-sm sm:text-base text-stone-400 font-sans-ui leading-relaxed">
          Orchestrate real-time environmental phenomena across the pavilion. Engage the formal controls below to initiate 
          calibrated five-second particulate snow cascades or buoyant ceremonial balloon ascents.
        </p>
      </div>

      {/* Main Control Console Card */}
      <div className="relative bg-[#111722]/95 border border-stone-800 rounded-xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-sm">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500/40 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-500/40 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-500/40 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500/40 rounded-br-sm pointer-events-none" />

        {/* Console Status Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-800/80 text-xs text-stone-400 font-sans-ui">
          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-medium tracking-wider uppercase text-[11px]">Dispatch Chamber</span>
            <span aria-hidden="true">·</span>
            <span>State: {isSnowActive || isBalloonsActive ? 'Emission In Progress' : 'Ready on Standby'}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-amber-200 transition-colors"
              title={soundEnabled ? 'Mute acoustic chimes' : 'Enable acoustic chimes'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Acoustic Chimes: Active</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                  <span>Acoustic Chimes: Muted</span>
                </>
              )}
            </button>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-mono text-[11px] text-stone-400">
              Active: {snowCount} Flakes · {balloonCount} Balloons
            </span>
          </div>
        </div>

        {/* PRIMARY ACTION BUTTONS: SNOWFLAKES & BALLOONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {/* 1. SNOWFLAKES BUTTON */}
          <div className="flex flex-col">
            <button
              onClick={onTriggerSnowflakes}
              className={`group relative flex flex-col items-center justify-center p-8 rounded-lg border text-center transition-all duration-200 cursor-pointer select-none overflow-hidden ${
                isSnowActive
                  ? 'bg-gradient-to-b from-sky-950/60 to-slate-900 border-sky-400/60 shadow-[0_0_30px_rgba(56,189,248,0.2)]'
                  : 'bg-stone-900/90 hover:bg-stone-850 border-stone-700/80 hover:border-sky-400/50 hover:shadow-lg'
              }`}
            >
              {/* Progress bar along bottom of button for 5s emission */}
              {isSnowActive && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-sky-400 transition-all duration-100 ease-linear"
                  style={{ width: `${(snowRemainingMs / 5000) * 100}%` }}
                />
              )}

              <div className="relative mb-4 p-4 rounded-full bg-stone-950/80 border border-stone-800 group-hover:border-sky-400/40 transition-colors">
                <Snowflake
                  className={`w-10 h-10 transition-transform duration-500 ${
                    isSnowActive ? 'text-sky-300 animate-spin' : 'text-sky-200 group-hover:scale-110'
                  }`}
                  style={{ animationDuration: '6s' }}
                />
              </div>

              {/* Exact Requested Button Label */}
              <span className="font-serif-display text-3xl font-medium tracking-wide text-stone-100 group-hover:text-sky-200 transition-colors">
                Snowflakes
              </span>

              <span className="mt-2 text-xs uppercase tracking-widest text-stone-400 group-hover:text-stone-300">
                {isSnowActive ? (
                  <span className="text-sky-300 font-mono tabular-nums font-semibold">
                    Falling · {(snowRemainingMs / 1000).toFixed(1)}s remaining
                  </span>
                ) : (
                  'Top to Bottom Cascade · 5s'
                )}
              </span>

              <p className="mt-3 text-xs text-stone-400/90 max-w-xs leading-relaxed">
                Releases medium-sized hexagonal crystalline ice flakes drifting from ceiling to ground.
              </p>
            </button>
          </div>

          {/* 2. BALLOONS BUTTON */}
          <div className="flex flex-col">
            <button
              onClick={onTriggerBalloons}
              className={`group relative flex flex-col items-center justify-center p-8 rounded-lg border text-center transition-all duration-200 cursor-pointer select-none overflow-hidden ${
                isBalloonsActive
                  ? 'bg-gradient-to-b from-amber-950/60 to-stone-900 border-amber-400/60 shadow-[0_0_30px_rgba(251,191,36,0.2)]'
                  : 'bg-stone-900/90 hover:bg-stone-850 border-stone-700/80 hover:border-amber-400/50 hover:shadow-lg'
              }`}
            >
              {/* Progress bar along bottom of button for 5s emission */}
              {isBalloonsActive && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-amber-400 transition-all duration-100 ease-linear"
                  style={{ width: `${(balloonsRemainingMs / 5000) * 100}%` }}
                />
              )}

              <div className="relative mb-4 p-4 rounded-full bg-stone-950/80 border border-stone-800 group-hover:border-amber-400/40 transition-colors">
                <Gift
                  className={`w-10 h-10 transition-transform duration-300 ${
                    isBalloonsActive ? 'text-amber-300 -translate-y-1' : 'text-amber-200 group-hover:-translate-y-1'
                  }`}
                />
              </div>

              {/* Exact Requested Button Label */}
              <span className="font-serif-display text-3xl font-medium tracking-wide text-stone-100 group-hover:text-amber-200 transition-colors">
                Balloons
              </span>

              <span className="mt-2 text-xs uppercase tracking-widest text-stone-400 group-hover:text-stone-300">
                {isBalloonsActive ? (
                  <span className="text-amber-300 font-mono tabular-nums font-semibold">
                    Floating · {(balloonsRemainingMs / 1000).toFixed(1)}s remaining
                  </span>
                ) : (
                  'Bottom to Top Float · 5s'
                )}
              </span>

              <p className="mt-3 text-xs text-stone-400/90 max-w-xs leading-relaxed">
                Releases medium-sized formal satin celebratory balloons rising gracefully toward the ceiling.
              </p>
            </button>
          </div>
        </div>

        {/* Secondary Orchestration Bar & Modifiers */}
        <div className="pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-6">
          {/* Wind drift modifier */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-sans-ui flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-stone-500" />
              <span>Chamber Airflow:</span>
            </span>
            <div className="flex items-center gap-1 p-1 bg-stone-950 border border-stone-800 rounded-md">
              <button
                onClick={() => setWind('west')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  wind === 'west'
                    ? 'bg-stone-800 text-amber-200 font-medium'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Westward
              </button>
              <button
                onClick={() => setWind('calm')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  wind === 'calm'
                    ? 'bg-stone-800 text-amber-200 font-medium'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Calm (Vertical)
              </button>
              <button
                onClick={() => setWind('east')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  wind === 'east'
                    ? 'bg-stone-800 text-amber-200 font-medium'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Eastward
              </button>
            </div>
          </div>

          {/* Combined & reset actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onTriggerBoth}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium text-amber-200 bg-amber-950/40 border border-amber-700/50 hover:bg-amber-900/50 rounded-md transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Dual Symphony (Both 5s)</span>
            </button>

            {anyActive && (
              <button
                onClick={onClearChamber}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider text-stone-400 hover:text-stone-200 bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-md transition-colors"
                title="Instantly clear all particles"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
