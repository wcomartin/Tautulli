export function WatchInsights() {
  return (
<div className="grid grid-cols-1 gap-3" style={{alignSelf: 'stretch', minWidth: 0, alignContent: 'start'}}>
          {/* Top Users */}
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border">
              <p className="text-xs font-semibold">Top Users</p>
              <span className="text-[10px] text-muted">Last 30 days</span>
            </div>
            <div className="px-3 py-2 space-y-1">
              <div className="flex items-center gap-2.5 py-1.5">
                <img src="https://i.pravatar.cc/24?u=john" className="w-7 h-7 rounded-full border border-border flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium truncate">john_doe</span>
                    <span className="text-xs text-muted ml-2 flex-shrink-0">312</span>
                  </div>
                  <div className="h-1 bg-surface3 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{width: '100%'}} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 py-1.5">
                <img src="https://i.pravatar.cc/24?u=sarah" className="w-7 h-7 rounded-full border border-border flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium truncate">sarah_k</span>
                    <span className="text-xs text-muted ml-2 flex-shrink-0">198</span>
                  </div>
                  <div className="h-1 bg-surface3 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-accent/60" style={{width: '63%'}} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 py-1.5">
                <img src="https://i.pravatar.cc/24?u=mike99" className="w-7 h-7 rounded-full border border-border flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium truncate">mike99</span>
                    <span className="text-xs text-muted ml-2 flex-shrink-0">143</span>
                  </div>
                  <div className="h-1 bg-surface3 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-accent/40" style={{width: '46%'}} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 py-1.5">
                <img src="https://i.pravatar.cc/24?u=lisa" className="w-7 h-7 rounded-full border border-border flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium truncate">lisa_m</span>
                    <span className="text-xs text-muted ml-2 flex-shrink-0">87</span>
                  </div>
                  <div className="h-1 bg-surface3 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-accent/25" style={{width: '28%'}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Stream Type Breakdown */}
          <div className="stream-types bg-surface border border-border rounded-xl px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold">Stream Types</p>
              <span className="text-[10px] text-muted">Last 30 days</span>
            </div>
            {/* Stacked bar */}
            <div className="relative h-3 rounded-full overflow-hidden flex mb-3">
              <div className="h-full bg-success" style={{width: '54%'}} title="Direct Play 54%" />
              <div className="h-full bg-info" style={{width: '22%'}} title="Direct Stream 22%" />
              <div className="h-full bg-accent" style={{width: '24%'}} title="Transcode 24%" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <div className="w-2 h-2 rounded-full bg-success flex-shrink-0" />
                  <span className="text-[10px] text-muted">Direct Play</span>
                </div>
                <p className="text-sm font-bold">54%</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <div className="w-2 h-2 rounded-full bg-info flex-shrink-0" />
                  <span className="text-[10px] text-muted">Direct Stream</span>
                </div>
                <p className="text-sm font-bold">22%</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-[10px] text-muted">Transcode</span>
                </div>
                <p className="text-sm font-bold">24%</p>
              </div>
            </div>
          </div>
          {/* Most Active Hours */}
          <div className="bg-surface border border-border rounded-xl px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold">Active Hours</p>
              <span className="text-[10px] text-muted">Last 30 days</span>
            </div>
            {/* Mini bar chart: 24 bars for 0-23h */}
            <div className="flex items-end gap-px h-10">
              {/* heights roughly represent activity: quiet daytime, peak evening */}
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '15%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '10%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '8%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '6%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '5%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '5%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '8%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '12%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '20%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '22%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '18%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '15%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '20%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '18%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '22%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '28%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '35%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '45%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '62%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '80%'}} />
              <div className="flex-1 bg-accent rounded-sm" style={{height: '100%'}} title="9 PM — Peak" />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '90%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '72%'}} />
              <div className="flex-1 bg-surface3 rounded-sm" style={{height: '45%'}} />
            </div>
            <div className="flex justify-between text-[10px] text-muted mt-1.5">
              <span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>11 PM</span>
            </div>
            <p className="text-[10px] text-muted mt-1.5">Peak: <span className="text-accent font-medium">9 PM</span></p>
          </div>
        </div>
  )
}
