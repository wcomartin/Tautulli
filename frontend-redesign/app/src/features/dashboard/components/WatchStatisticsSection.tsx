import { LibraryStatisticsGrid } from './LibraryStatisticsGrid'
import { WatchInsights } from './WatchInsights'
import { WatchSummaryCards } from './WatchSummaryCards'

export function WatchStatisticsSection() {
  return <section className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-semibold">Watch Statistics</h2>
      <div className="flex items-center gap-2">
        <div className="flex bg-surface2 border border-border rounded-md p-0.5 text-xs font-medium"><button className="px-3 py-1 rounded bg-accent text-black">Plays</button><button className="px-3 py-1 text-muted hover:text-white transition-colors">Duration</button></div>
        <div className="flex items-center gap-1 bg-surface2 border border-border rounded-md px-2 py-1 text-xs text-muted">Last <input type="number" defaultValue={30} className="w-10 bg-transparent text-center text-white outline-none mx-1" /> days</div>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 25vw', gap: 12, alignItems: 'stretch' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}><WatchSummaryCards /><LibraryStatisticsGrid /></div>
      <WatchInsights />
    </div>
  </section>
}
