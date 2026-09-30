import { useEffect, useState } from 'react'
import { ActivityCards } from './ActivityCards'
import { RecentlyAddedGrid } from './RecentlyAddedGrid'

export function DashboardPage() {
  const [advanced, setAdvanced] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('advanced-on', advanced)
    return () => document.documentElement.classList.remove('advanced-on')
  }, [advanced])


  return (
<>
  {/* PAGE CONTENT */}
  <main className="flex-1 overflow-y-auto bg-bg" style={{padding: 'clamp(1.25rem, 2vw, 2.5rem)'}}>
    {/* ── ACTIVITY SECTION ──────────────────────────────────── */}
    <div className="mb-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-base font-semibold">Activity</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-surface2 border border-border rounded-full text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              3 streams
            </span>
            <span className="text-xs px-2.5 py-1 bg-surface2 border border-border rounded-full text-muted">1 Direct Play · 1 Direct Stream · 1 Transcode</span>
            <span className="text-xs px-2.5 py-1 bg-surface2 border border-border rounded-full text-muted">↑ 62.4 Mbps</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Advanced toggle */}
           <button id="advanced-toggle" onClick={() => setAdvanced((value) => !value)} aria-pressed={advanced} className="flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-medium transition-all" style={{background: 'var(--t-bg)', borderColor: 'var(--t-border)', color: 'var(--t-text)'}}>
            <div id="advanced-toggle-dot" className="w-7 h-4 rounded-full flex items-center transition-all duration-200 flex-shrink-0 px-0.5" style={{background: 'var(--t-track)'}}>
              <div id="advanced-toggle-thumb" className="w-3 h-3 rounded-full bg-white shadow transition-all duration-200" style={{transform: 'var(--t-thumb)'}} />
            </div>
            <span id="advanced-toggle-label">Advanced</span>
          </button>
          <span className="text-xs text-muted hidden sm:block">auto-refresh 10s</span>
        </div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'start'}}>
        <ActivityCards />
      </div>
    </div>
    {/* WATCH STATS SECTION */}
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Watch Statistics</h2>
        <div className="flex items-center gap-2">
          <div className="flex bg-surface2 border border-border rounded-md p-0.5 text-xs font-medium">
            <button className="px-3 py-1 rounded bg-accent text-black">Plays</button>
            <button className="px-3 py-1 text-muted hover:text-white transition-colors">Duration</button>
          </div>
          <div className="flex items-center gap-1 bg-surface2 border border-border rounded-md px-2 py-1 text-xs text-muted">
            Last <input type="number" defaultValue={30} className="w-10 bg-transparent text-center text-white outline-none mx-1" /> days
          </div>
        </div>
      </div>
      {/* ── Outer grid: left col (KPI + media cards) | right col (anchored) ── */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 25vw', gap: 12, alignItems: 'stretch'}}>
        {/* LEFT COLUMN */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0}}>
          {/* ── Row 1: KPI summary tiles ── */}
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
          {/* ── Row 2: Media stat cards ── */}
          <div className="library-stat-grid" style={{display: 'grid', gap: 12, minWidth: 0}}>
            {/* Top Movies */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden" style={{minWidth: 0, display: 'flex', flexDirection: 'column'}}>
              <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border">
                <p className="text-xs font-semibold">Top Movies</p>
                <span className="text-[10px] text-muted">Last 30 days</span>
              </div>
              {/* #1 featured */}
              <div className="relative h-24 overflow-hidden">
                <img src="https://image.tmdb.org/t/p/w1280/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg" className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                <div className="absolute inset-0 flex items-center gap-3 px-3">
                  <img src="https://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" className="h-16 w-11 object-cover rounded-md border border-white/10 shadow flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-accent font-bold uppercase tracking-wider">#1</span>
                    <p className="text-sm font-bold leading-tight">Oppenheimer</p>
                    <p className="text-[11px] text-muted">2023</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xl font-bold">47</p>
                    <p className="text-[10px] text-muted">plays</p>
                  </div>
                </div>
              </div>
              {/* Ranked list */}
              <div className="px-3 pb-3 pt-1 space-y-1 flex-1">
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">2</span>
                  <img src="https://image.tmdb.org/t/p/w342/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" className="w-6 h-9 object-cover rounded flex-shrink-0" />
                  <span className="text-xs truncate flex-1">Dune: Part Two</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden">
                      <div className="h-full bg-accent/50 rounded-full" style={{width: '81%'}} />
                    </div>
                    <span className="text-xs text-muted w-5 text-right">38</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">3</span>
                  <img src="https://image.tmdb.org/t/p/w342/lqoMzCcZYEFK729d6qzt349fB4o.jpg" className="w-6 h-9 object-cover rounded flex-shrink-0" />
                  <span className="text-xs truncate flex-1">The Substance</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden">
                      <div className="h-full bg-accent/50 rounded-full" style={{width: '66%'}} />
                    </div>
                    <span className="text-xs text-muted w-5 text-right">31</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">4</span>
                  <img src="https://image.tmdb.org/t/p/w342/m5x8D0bZ3eKqIVWZ5y7TnZ2oTVg.jpg" className="w-6 h-9 object-cover rounded flex-shrink-0" />
                  <span className="text-xs truncate flex-1">Conclave</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden">
                      <div className="h-full bg-accent/50 rounded-full" style={{width: '55%'}} />
                    </div>
                    <span className="text-xs text-muted w-5 text-right">26</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 py-1.5">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">5</span>
                  <img src="https://image.tmdb.org/t/p/w342/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg" className="w-6 h-9 object-cover rounded flex-shrink-0" />
                  <span className="text-xs truncate flex-1">Civil War</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden">
                      <div className="h-full bg-accent/50 rounded-full" style={{width: '44%'}} />
                    </div>
                    <span className="text-xs text-muted w-5 text-right">21</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Top TV Shows */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden" style={{minWidth: 0, display: 'flex', flexDirection: 'column'}}>
              <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border">
                <p className="text-xs font-semibold">Top TV Shows</p>
                <span className="text-[10px] text-muted">Last 30 days</span>
              </div>
              <div className="relative h-24 overflow-hidden">
                <img src="https://image.tmdb.org/t/p/w1280/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg" className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                <div className="absolute inset-0 flex items-center gap-3 px-3">
                  <img src="https://image.tmdb.org/t/p/w342/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg" className="h-16 w-11 object-cover rounded-md border border-white/10 shadow flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-accent font-bold uppercase tracking-wider">#1</span>
                    <p className="text-sm font-bold leading-tight">Breaking Bad</p>
                    <p className="text-[11px] text-muted">Drama</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xl font-bold">124</p>
                    <p className="text-[10px] text-muted">plays</p>
                  </div>
                </div>
              </div>
              <div className="px-3 pb-3 pt-1 space-y-1 flex-1">
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">2</span>
                  <img src="https://image.tmdb.org/t/p/w342/eKfVzzEazSIjJMrw9ADa2x8ksLz.jpg" className="w-6 h-9 object-cover rounded flex-shrink-0" />
                  <span className="text-xs truncate flex-1">The Bear</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden">
                      <div className="h-full bg-accent/50 rounded-full" style={{width: '72%'}} />
                    </div>
                    <span className="text-xs text-muted w-5 text-right">89</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">3</span>
                  <img src="https://image.tmdb.org/t/p/w342/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg" className="w-6 h-9 object-cover rounded flex-shrink-0" />
                  <span className="text-xs truncate flex-1">Shōgun</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden">
                      <div className="h-full bg-accent/50 rounded-full" style={{width: '54%'}} />
                    </div>
                    <span className="text-xs text-muted w-5 text-right">67</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">4</span>
                  <img src="https://image.tmdb.org/t/p/w342/dB4EDhre2dsC2kxYDavyKWqLQwi.jpg" className="w-6 h-9 object-cover rounded flex-shrink-0" />
                  <span className="text-xs truncate flex-1">One Piece</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden">
                      <div className="h-full bg-accent/50 rounded-full" style={{width: '40%'}} />
                    </div>
                    <span className="text-xs text-muted w-5 text-right">49</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 py-1.5">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">5</span>
                  <img src="https://image.tmdb.org/t/p/w342/eKfVzzEazSIjJMrw9ADa2x8ksLz.jpg" className="w-6 h-9 object-cover rounded flex-shrink-0" />
                  <span className="text-xs truncate flex-1">The Bear</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden">
                      <div className="h-full bg-accent/50 rounded-full" style={{width: '31%'}} />
                    </div>
                    <span className="text-xs text-muted w-5 text-right">38</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Top Music */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden" style={{minWidth: 0, display: 'flex', flexDirection: 'column'}}>
              <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border">
                <p className="text-xs font-semibold">Top Music</p>
                <span className="text-[10px] text-muted">Last 30 days</span>
              </div>
              {/* #1 featured */}
              <div className="relative h-24 overflow-hidden">
                <img src="https://image.tmdb.org/t/p/w342/jf3YO8hOqGHCupsREf5qymYq1n.jpg" className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                <div className="absolute inset-0 flex items-center gap-3 px-3">
                  <img src="https://image.tmdb.org/t/p/w342/jf3YO8hOqGHCupsREf5qymYq1n.jpg" className="h-16 w-16 object-cover rounded-md border border-white/10 shadow flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-accent font-bold uppercase tracking-wider">#1</span>
                    <p className="text-sm font-bold leading-tight">Taylor Swift</p>
                    <p className="text-[11px] text-muted">The Eras Tour</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xl font-bold">214</p>
                    <p className="text-[10px] text-muted">plays</p>
                  </div>
                </div>
              </div>
              <div className="px-3 pb-3 pt-1 space-y-1 flex-1">
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">2</span>
                  <img src="https://image.tmdb.org/t/p/w342/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg" className="w-6 h-6 object-cover rounded flex-shrink-0" />
                  <span className="text-xs truncate flex-1">Queen</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden"><div className="h-full bg-accent/50 rounded-full" style={{width: '72%'}} /></div>
                    <span className="text-xs text-muted w-5 text-right">154</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">3</span>
                  <img src="https://image.tmdb.org/t/p/w342/f4FF18ia7yTvHf2izNrHqBmgH8U.jpg" className="w-6 h-6 object-cover rounded flex-shrink-0" />
                  <span className="text-xs truncate flex-1">Elton John</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden"><div className="h-full bg-accent/50 rounded-full" style={{width: '55%'}} /></div>
                    <span className="text-xs text-muted w-5 text-right">118</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">4</span>
                  <img src="https://image.tmdb.org/t/p/w342/qBOKWqAFbveZ4ryjJJwbie6tXkQ.jpg" className="w-6 h-6 object-cover rounded flex-shrink-0" />
                  <span className="text-xs truncate flex-1">Elvis Presley</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden"><div className="h-full bg-accent/50 rounded-full" style={{width: '40%'}} /></div>
                    <span className="text-xs text-muted w-5 text-right">86</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 py-1.5">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">5</span>
                  <img src="https://image.tmdb.org/t/p/w342/rEHb3f5wrLuDMHQDfirlwcqA3NT.jpg" className="w-6 h-6 object-cover rounded flex-shrink-0" />
                  <span className="text-xs truncate flex-1">Whitney Houston</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden"><div className="h-full bg-accent/50 rounded-full" style={{width: '29%'}} /></div>
                    <span className="text-xs text-muted w-5 text-right">62</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Home Videos */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden" style={{minWidth: 0, display: 'flex', flexDirection: 'column'}}>
              <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border">
                <p className="text-xs font-semibold">Home Videos</p>
                <span className="text-[10px] text-muted">Last 30 days</span>
              </div>
              {/* No backdrop — use a placeholder art strip */}
              <div className="relative h-24 overflow-hidden bg-surface3 flex items-center justify-center">
                <svg width={40} height={40} fill="none" stroke="#444" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx={12} cy={12} r={10} /><polygon points="10,8 16,12 10,16" fill="#444" stroke="none" /></svg>
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-accent font-bold uppercase tracking-wider">#1</span>
                    <p className="text-sm font-bold leading-tight">Summer 2024</p>
                    <p className="text-[11px] text-muted">Family · Jul 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">43</p>
                    <p className="text-[10px] text-muted">plays</p>
                  </div>
                </div>
              </div>
              <div className="px-3 pb-3 pt-1 space-y-1 flex-1">
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">2</span>
                  <div className="w-6 h-9 bg-surface3 rounded flex-shrink-0 flex items-center justify-center">
                    <svg width={10} height={10} fill="#555" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
                  </div>
                  <span className="text-xs truncate flex-1">Christmas 2023</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden"><div className="h-full bg-accent/50 rounded-full" style={{width: '65%'}} /></div>
                    <span className="text-xs text-muted w-5 text-right">28</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">3</span>
                  <div className="w-6 h-9 bg-surface3 rounded flex-shrink-0 flex items-center justify-center">
                    <svg width={10} height={10} fill="#555" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
                  </div>
                  <span className="text-xs truncate flex-1">Spring Break 2024</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden"><div className="h-full bg-accent/50 rounded-full" style={{width: '44%'}} /></div>
                    <span className="text-xs text-muted w-5 text-right">19</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">4</span>
                  <div className="w-6 h-9 bg-surface3 rounded flex-shrink-0 flex items-center justify-center">
                    <svg width={10} height={10} fill="#555" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
                  </div>
                  <span className="text-xs truncate flex-1">Birthday Party</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden"><div className="h-full bg-accent/50 rounded-full" style={{width: '30%'}} /></div>
                    <span className="text-xs text-muted w-5 text-right">13</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 py-1.5">
                  <span className="text-[11px] text-muted w-3 font-bold flex-shrink-0">5</span>
                  <div className="w-6 h-9 bg-surface3 rounded flex-shrink-0 flex items-center justify-center">
                    <svg width={10} height={10} fill="#555" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
                  </div>
                  <span className="text-xs truncate flex-1">Graduation 2024</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1 bg-surface3 rounded-full overflow-hidden"><div className="h-full bg-accent/50 rounded-full" style={{width: '19%'}} /></div>
                    <span className="text-xs text-muted w-5 text-right">8</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional libraries for layout testing */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden" style={{minWidth: 0, display: 'flex', flexDirection: 'column'}}>
              <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border">
                <p className="text-xs font-semibold">Documentaries</p><span className="text-[10px] text-muted">Last 30 days</span>
              </div>
              <div className="relative h-24 overflow-hidden bg-surface3">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center gap-3 px-3">
                  <div className="h-16 w-11 rounded-md bg-surface2 flex items-center justify-center text-muted text-lg">▣</div>
                  <div><span className="text-[10px] text-accent font-bold uppercase tracking-wider">#1</span><p className="text-sm font-bold leading-tight">Planet Earth III</p><p className="text-[11px] text-muted">Nature</p></div>
                  <div className="ml-auto text-right"><p className="text-xl font-bold">34</p><p className="text-[10px] text-muted">plays</p></div>
                </div>
              </div>
              <div className="px-3 pb-3 pt-1 space-y-1 flex-1">
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40"><span className="text-[11px] text-muted w-3 font-bold">2</span><span className="text-xs truncate flex-1">Free Solo</span><span className="text-xs text-muted">27</span></div>
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40"><span className="text-[11px] text-muted w-3 font-bold">3</span><span className="text-xs truncate flex-1">The Last Dance</span><span className="text-xs text-muted">21</span></div>
                <div className="flex items-center gap-2.5 py-1.5"><span className="text-[11px] text-muted w-3 font-bold">4</span><span className="text-xs truncate flex-1">Cosmos</span><span className="text-xs text-muted">16</span></div>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-xl overflow-hidden" style={{minWidth: 0, display: 'flex', flexDirection: 'column'}}>
              <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border">
                <p className="text-xs font-semibold">Anime</p><span className="text-[10px] text-muted">Last 30 days</span>
              </div>
              <div className="relative h-24 overflow-hidden bg-surface3">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center gap-3 px-3">
                  <div className="h-16 w-11 rounded-md bg-surface2 flex items-center justify-center text-muted text-lg">▤</div>
                  <div><span className="text-[10px] text-accent font-bold uppercase tracking-wider">#1</span><p className="text-sm font-bold leading-tight">One Piece</p><p className="text-[11px] text-muted">Adventure</p></div>
                  <div className="ml-auto text-right"><p className="text-xl font-bold">89</p><p className="text-[10px] text-muted">plays</p></div>
                </div>
              </div>
              <div className="px-3 pb-3 pt-1 space-y-1 flex-1">
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40"><span className="text-[11px] text-muted w-3 font-bold">2</span><span className="text-xs truncate flex-1">Shōgun</span><span className="text-xs text-muted">67</span></div>
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40"><span className="text-[11px] text-muted w-3 font-bold">3</span><span className="text-xs truncate flex-1">Jujutsu Kaisen</span><span className="text-xs text-muted">53</span></div>
                <div className="flex items-center gap-2.5 py-1.5"><span className="text-[11px] text-muted w-3 font-bold">4</span><span className="text-xs truncate flex-1">Frieren</span><span className="text-xs text-muted">41</span></div>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-xl overflow-hidden" style={{minWidth: 0, display: 'flex', flexDirection: 'column'}}>
              <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border">
                <p className="text-xs font-semibold">Kids</p><span className="text-[10px] text-muted">Last 30 days</span>
              </div>
              <div className="relative h-24 overflow-hidden bg-surface3">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center gap-3 px-3">
                  <div className="h-16 w-11 rounded-md bg-surface2 flex items-center justify-center text-muted text-lg">★</div>
                  <div><span className="text-[10px] text-accent font-bold uppercase tracking-wider">#1</span><p className="text-sm font-bold leading-tight">Moana</p><p className="text-[11px] text-muted">Family</p></div>
                  <div className="ml-auto text-right"><p className="text-xl font-bold">72</p><p className="text-[10px] text-muted">plays</p></div>
                </div>
              </div>
              <div className="px-3 pb-3 pt-1 space-y-1 flex-1">
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40"><span className="text-[11px] text-muted w-3 font-bold">2</span><span className="text-xs truncate flex-1">Toy Story</span><span className="text-xs text-muted">64</span></div>
                <div className="flex items-center gap-2.5 py-1.5 border-b border-border/40"><span className="text-[11px] text-muted w-3 font-bold">3</span><span className="text-xs truncate flex-1">Frozen</span><span className="text-xs text-muted">51</span></div>
                <div className="flex items-center gap-2.5 py-1.5"><span className="text-[11px] text-muted w-3 font-bold">4</span><span className="text-xs truncate flex-1">Paddington</span><span className="text-xs text-muted">38</span></div>
              </div>
            </div>
          </div>{/* /row 2 media cards */}
        </div>{/* /LEFT COLUMN */}
        {/* RIGHT COLUMN: spans both rows */}
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
        </div>{/* /RIGHT COLUMN */}
      </div>{/* /outer grid */}
    </div>{/* /watch stats */}
    {/* RECENTLY ADDED SECTION */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Recently Added</h2>
        <div className="flex items-center gap-2">
          <div className="flex bg-surface2 border border-border rounded-md p-0.5 text-xs font-medium">
            <button className="px-3 py-1 rounded bg-accent text-black">All</button>
            <button className="px-3 py-1 text-muted hover:text-white transition-colors">Movies</button>
            <button className="px-3 py-1 text-muted hover:text-white transition-colors">TV</button>
            <button className="px-3 py-1 text-muted hover:text-white transition-colors">Music</button>
          </div>
        </div>
      </div>
      <RecentlyAddedGrid />
    </div>{/* /recently-added */}
  </main>
</>

  )
}
