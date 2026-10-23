import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { AtmosphereCanvas } from './components/AtmosphereCanvas';
import { AtmosphericConsole } from './components/AtmosphericConsole';
import { SpecificationsSection } from './components/SpecificationsSection';
import { LedgerSection } from './components/LedgerSection';
import { ProtocolModal } from './components/ProtocolModal';
import { Footer } from './components/Footer';
import { soundController } from './utils/audio';
import { WindDirection, DispatchLogEntry } from './types';

export default function App() {
  // Atmospheric emission countdown timers (5000ms duration)
  const [snowRemainingMs, setSnowRemainingMs] = useState<number>(0);
  const [balloonsRemainingMs, setBalloonsRemainingMs] = useState<number>(0);

  // Active live particle counters
  const [snowCount, setSnowCount] = useState<number>(0);
  const [balloonCount, setBalloonCount] = useState<number>(0);

  // Environmental modifiers
  const [wind, setWind] = useState<WindDirection>('calm');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Protocol modal state
  const [isProtocolModalOpen, setIsProtocolModalOpen] = useState<boolean>(false);

  // Dispatch history ledger
  const [logs, setLogs] = useState<DispatchLogEntry[]>([]);

  // Sound sync
  useEffect(() => {
    soundController.enabled = soundEnabled;
  }, [soundEnabled]);

  // High precision timer loop for countdowns
  useEffect(() => {
    if (snowRemainingMs <= 0 && balloonsRemainingMs <= 0) return;

    const interval = setInterval(() => {
      setSnowRemainingMs((prev) => Math.max(0, prev - 50));
      setBalloonsRemainingMs((prev) => Math.max(0, prev - 50));
    }, 50);

    return () => clearInterval(interval);
  }, [snowRemainingMs, balloonsRemainingMs]);

  // Keep ledger status updated once duration concludes
  useEffect(() => {
    if (snowRemainingMs === 0) {
      setLogs((prev) =>
        prev.map((log) =>
          log.type === 'snowflakes' && log.status === 'In Progress'
            ? { ...log, status: 'Completed' }
            : log
        )
      );
    }
  }, [snowRemainingMs]);

  useEffect(() => {
    if (balloonsRemainingMs === 0) {
      setLogs((prev) =>
        prev.map((log) =>
          log.type === 'balloons' && log.status === 'In Progress'
            ? { ...log, status: 'Completed' }
            : log
        )
      );
    }
  }, [balloonsRemainingMs]);

  // 1. TRIGGER SNOWFLAKES (5 Seconds, Top to Bottom)
  const handleTriggerSnowflakes = useCallback(() => {
    setSnowRemainingMs(5000);
    soundController.playSnowflakeChime();

    const newLog: DispatchLogEntry = {
      id: `snow-${Date.now()}`,
      type: 'snowflakes',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      durationMs: 5000,
      particleCountEstimate: 110,
      status: 'In Progress',
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  }, []);

  // 2. TRIGGER BALLOONS (5 Seconds, Bottom to Top)
  const handleTriggerBalloons = useCallback(() => {
    setBalloonsRemainingMs(5000);
    soundController.playBalloonAscent();

    const newLog: DispatchLogEntry = {
      id: `balloons-${Date.now()}`,
      type: 'balloons',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      durationMs: 5000,
      particleCountEstimate: 45,
      status: 'In Progress',
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  }, []);

  // Trigger both simultaneously
  const handleTriggerBoth = useCallback(() => {
    handleTriggerSnowflakes();
    handleTriggerBalloons();
  }, [handleTriggerSnowflakes, handleTriggerBalloons]);

  // Clear Chamber
  const handleClearChamber = useCallback(() => {
    setSnowRemainingMs(0);
    setBalloonsRemainingMs(0);
    setSnowCount(0);
    setBalloonCount(0);
  }, []);

  const handleParticleCountChange = useCallback((sCount: number, bCount: number) => {
    setSnowCount(sCount);
    setBalloonCount(bCount);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0e17] text-stone-100 flex flex-col selection:bg-amber-900/50 selection:text-amber-100">
      {/* Background Architectural Gradient Ambience */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(56,189,248,0.12),rgba(255,255,255,0))]" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-30 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(217,119,6,0.12),rgba(255,255,255,0))]" 
        aria-hidden="true" 
      />

      {/* Full-Screen Atmospheric Physics Canvas (Pointer-events-none ensures complete UI responsiveness) */}
      <AtmosphereCanvas
        isSnowing={snowRemainingMs > 0}
        snowRemainingMs={snowRemainingMs}
        isBalloons={balloonsRemainingMs > 0}
        balloonsRemainingMs={balloonsRemainingMs}
        wind={wind}
        onParticleCountChange={handleParticleCountChange}
      />

      {/* Top Navigation Bar */}
      <Header onOpenProtocolModal={() => setIsProtocolModalOpen(true)} />

      {/* Main Presentation Stage */}
      <main className="relative z-10 flex-1 flex flex-col justify-start">
        <AtmosphericConsole
          onTriggerSnowflakes={handleTriggerSnowflakes}
          onTriggerBalloons={handleTriggerBalloons}
          onTriggerBoth={handleTriggerBoth}
          onClearChamber={handleClearChamber}
          snowRemainingMs={snowRemainingMs}
          balloonsRemainingMs={balloonsRemainingMs}
          snowCount={snowCount}
          balloonCount={balloonCount}
          wind={wind}
          setWind={setWind}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
        />

        <SpecificationsSection />

        <LedgerSection
          logs={logs}
          onClearLogs={() => setLogs([])}
        />
      </main>

      {/* Protocol Guide Modal */}
      <ProtocolModal
        isOpen={isProtocolModalOpen}
        onClose={() => setIsProtocolModalOpen(false)}
      />

      {/* Quiet Formal Footer */}
      <Footer />
    </div>
  );
}
