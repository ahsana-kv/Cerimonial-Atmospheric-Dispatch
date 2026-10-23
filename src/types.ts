/**
 * Atmospheric Dispatch System Types
 */

export type WindDirection = 'calm' | 'east' | 'west';
export type ParticleDensity = 'standard' | 'abundant';

export interface SnowflakeParticle {
  id: number;
  x: number;
  y: number;
  baseRadius: number; // medium size: 12 - 17 px
  speedY: number;
  swayFreq: number;
  swayAmp: number;
  phase: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
  branches: number;
  branchDetail: number;
}

export interface BalloonParticle {
  id: number;
  x: number;
  y: number;
  width: number;  // medium size: 40 - 48 px
  height: number; // medium size: 52 - 62 px
  speedY: number;
  swayFreq: number;
  swayAmp: number;
  phase: number;
  tilt: number;
  color: string;
  knotColor: string;
  stringLength: number;
  stringWavePhase: number;
  alpha: number;
}

export interface DispatchLogEntry {
  id: string;
  type: 'snowflakes' | 'balloons';
  timestamp: string;
  durationMs: number;
  particleCountEstimate: number;
  status: 'Completed' | 'In Progress';
}
