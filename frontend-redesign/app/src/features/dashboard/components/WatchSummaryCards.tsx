export function WatchSummaryCards() {
  return (
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-surface border border-border rounded-xl px-4 py-3 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <svg width={18} height={18} fill="none" stroke="#e5a00d" strokeWidth={2} viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">2,847</p>
                <p className="text-xs text-muted mt-1">Total Plays</p>
              </div>
              <div className="ml-auto text-right hidden sm:block">
                <p className="text-xs text-success font-medium">↑ 12%</p>
                <p className="text-[10px] text-muted">vs prev period</p>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-xl px-4 py-3 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-info/10 border border-info/20 flex items-center justify-center flex-shrink-0">
                <svg width={18} height={18} fill="none" stroke="#58a6ff" strokeWidth={2} viewBox="0 0 24 24"><circle cx={12} cy={12} r={10} /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">1,284<span className="text-base font-normal text-muted">h</span></p>
                <p className="text-xs text-muted mt-1">Watch Time</p>
              </div>
              <div className="ml-auto text-right hidden sm:block">
                <p className="text-xs text-success font-medium">↑ 8%</p>
                <p className="text-[10px] text-muted">vs prev period</p>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-xl px-4 py-3 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 border border-success/20 flex items-center justify-center flex-shrink-0">
                <svg width={18} height={18} fill="none" stroke="#3fb950" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx={9} cy={7} r={4} /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">8</p>
                <p className="text-xs text-muted mt-1">Unique Viewers</p>
              </div>
              <div className="ml-auto text-right hidden sm:block">
                <p className="text-xs text-muted font-medium">— same</p>
                <p className="text-[10px] text-muted">vs prev period</p>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-xl px-4 py-3 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-surface3 border border-border flex items-center justify-center flex-shrink-0">
                <svg width={18} height={18} fill="none" stroke="#888890" strokeWidth={2} viewBox="0 0 24 24"><rect x={3} y={3} width={7} height={7} /><rect x={14} y={3} width={7} height={7} /><rect x={3} y={14} width={7} height={7} /><rect x={14} y={14} width={7} height={7} /></svg>
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">6</p>
                <p className="text-xs text-muted mt-1">Peak Concurrent</p>
              </div>
              <div className="ml-auto text-right hidden sm:block">
                <p className="text-xs text-danger font-medium">↓ 1</p>
                <p className="text-[10px] text-muted">vs prev period</p>
              </div>
            </div>
          </div>
          
  )
}
