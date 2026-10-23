import React from 'react';
import { DispatchLogEntry } from '../types';
import { Snowflake, Gift, History } from 'lucide-react';

interface LedgerSectionProps {
  logs: DispatchLogEntry[];
  onClearLogs: () => void;
}

export const LedgerSection: React.FC<LedgerSectionProps> = ({ logs, onClearLogs }) => {
  return (
    <section id="registry" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-stone-800/80">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400/90 mb-2">
            <span>Archival Register</span>
            <span aria-hidden="true">·</span>
            <span>Dispatch Event Record</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-normal text-stone-100">
            Chamber Dispatch Ledger
          </h2>
        </div>

        {logs.length > 0 && (
          <button
            onClick={onClearLogs}
            className="text-xs uppercase tracking-wider text-stone-400 hover:text-stone-200 transition-colors"
          >
            Clear Ledger
          </button>
        )}
      </div>

      <div className="bg-[#111722]/80 border border-stone-800/90 rounded-lg overflow-hidden">
        {logs.length === 0 ? (
          <div className="py-12 px-6 text-center text-stone-400">
            <History className="w-8 h-8 mx-auto mb-3 text-stone-600" />
            <p className="text-sm">No dispatches recorded yet.</p>
            <p className="text-xs text-stone-400 mt-1">
              Select "Snowflakes" or "Balloons" above to generate a ceremonial 5-second atmospheric event.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans-ui">
              <thead>
                <tr className="border-b border-stone-800/80 bg-stone-900/50 text-stone-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-medium">Timestamp</th>
                  <th className="py-3 px-4 font-medium">Atmospheric Sequence</th>
                  <th className="py-3 px-4 font-medium">Direction</th>
                  <th className="py-3 px-4 font-medium">Duration</th>
                  <th className="py-3 px-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/50 text-stone-300">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-900/30 transition-colors">
                    <td className="py-3 px-4 font-mono tabular-nums text-stone-400">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      <div className="flex items-center gap-2">
                        {log.type === 'snowflakes' ? (
                          <>
                            <Snowflake className="w-3.5 h-3.5 text-sky-400" />
                            <span className="text-stone-200">Snowflakes (Medium Crystals)</span>
                          </>
                        ) : (
                          <>
                            <Gift className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-stone-200">Balloons (Medium Satin)</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-stone-400">
                      {log.type === 'snowflakes' ? 'Top to Bottom Cascade' : 'Bottom to Top Float'}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-stone-300">
                      {(log.durationMs / 1000).toFixed(2)}s
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider ${
                        log.status === 'In Progress'
                          ? 'bg-amber-950/70 text-amber-300 border border-amber-800/60'
                          : 'bg-stone-800/60 text-stone-300'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
