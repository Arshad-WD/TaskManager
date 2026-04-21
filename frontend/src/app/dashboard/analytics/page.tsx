export default function AnalyticsDashboard() {
  return (
    <main className="min-h-screen p-6 md:p-12 relative h-full">
      {/* Glow Effects */}
      <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-brand-tertiary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <header className="mb-12 relative z-10">
        <h2 className="text-3xl font-display font-medium text-white flex items-center gap-3">
           System Telemetry
           <div className="flex items-center gap-2 px-3 py-1 bg-surface-high border border-white/5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-brand-tertiary animate-pulse shadow-[0_0_8px_#00dce5]" />
              <span className="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase">Matrix Sync Active</span>
           </div>
        </h2>
        <p className="text-on-surface-variant mt-1 text-sm">Real-time analytical assessment of active network operations</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-8 animate-in fade-in slide-in-from-bottom-4">
        {/* Metric Card 1 */}
        <div className="glass-card p-6 flex flex-col justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-4">Total Execution Volume</span>
            <div className="flex items-end gap-3">
                <span className="text-4xl font-display text-white">142.4K</span>
                <span className="text-sm font-medium text-brand-tertiary mb-1">+12.5%</span>
            </div>
            <div className="w-full h-1 bg-surface-high mt-6 rounded-full overflow-hidden">
                <div className="w-[78%] h-full bg-gradient-to-r from-brand-primary to-brand-tertiary shadow-[0_0_10px_#00dce5]" />
            </div>
        </div>

        {/* Metric Card 2 */}
        <div className="glass-card p-6 flex flex-col justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-4">Node Latency</span>
            <div className="flex items-end gap-3">
                <span className="text-4xl font-display text-white">24ms</span>
                <span className="text-sm font-medium text-[#ffb4ab] mb-1">+4ms</span>
            </div>
            <div className="w-full h-[30px] flex items-end gap-1 mt-6 opacity-80">
                {[4, 7, 5, 12, 8, 15, 6, 8, 10, 4, 6].map((h, i) => (
                    <div key={i} className="w-full bg-brand-primary/30 rounded-t-sm" style={{ height: `${h * 2}px` }} />
                ))}
            </div>
        </div>

        {/* Metric Card 3 */}
        <div className="glass-card p-6 flex flex-col justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-4">Task Completion Rate</span>
            <div className="flex items-end gap-3">
                <span className="text-4xl font-display text-white">99.9%</span>
                <span className="text-sm font-medium text-brand-tertiary mb-1">Optimal</span>
            </div>
            <div className="w-full h-1 bg-surface-high mt-6 rounded-full overflow-hidden">
                <div className="w-[99.9%] h-full bg-brand-tertiary shadow-[0_0_10px_#00dce5]" />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 animate-in fade-in slide-in-from-bottom-8">
          <div className="lg:col-span-2 glass-card p-6 h-96 flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-6 flex justify-between">
                  <span>Network Traffic Map</span>
                  <span className="text-xs text-brand-tertiary font-mono">LIVE // {new Date().toISOString().substring(11, 19)}</span>
              </span>
              
              <div className="flex-1 border border-dashed border-white/5 rounded-xl flex items-center justify-center bg-surface-high/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(157,0,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(157,0,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <p className="text-on-surface-variant/50 font-display text-lg relative z-10 tracking-widest">AWAITING CHART PROTOCOL</p>
              </div>
          </div>

          <div className="glass-card p-6 flex flex-col">
             <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-6">Recent Anomalies</span>
             
             <div className="space-y-4 flex-1">
                 {[
                     { msg: "Spike in API requests detected", time: "2m ago", severity: "medium" },
                     { msg: "Node 144 offline momentarily", time: "15m ago", severity: "high" },
                     { msg: "Database pooler saturated", time: "1h ago", severity: "medium" },
                     { msg: "Unauthorized access blocked", time: "4h ago", severity: "low" },
                 ].map((log, i) => (
                     <div key={i} className="flex gap-4 items-start border-b border-white/5 pb-4 last:border-0">
                         <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                             log.severity === 'high' ? 'bg-[#ffb4ab] shadow-[0_0_8px_#ffb4ab]' :
                             log.severity === 'medium' ? 'bg-brand-primary shadow-[0_0_8px_#dfb7ff]' :
                             'bg-brand-tertiary shadow-[0_0_8px_#00dce5]'
                         }`} />
                         <div>
                             <p className="text-sm text-white mb-1">{log.msg}</p>
                             <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest bg-surface-high/50 w-fit px-2 py-0.5 rounded">{log.time}</p>
                         </div>
                     </div>
                 ))}
             </div>
          </div>
      </div>
    </main>
  );
}
