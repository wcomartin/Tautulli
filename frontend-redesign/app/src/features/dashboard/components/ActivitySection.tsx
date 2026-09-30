import { ActivityCards } from '../ActivityCards'

type ActivitySectionProps = {
  advanced: boolean
  onAdvancedChange: () => void
}

export function ActivitySection({ advanced, onAdvancedChange }: ActivitySectionProps) {
  return <section className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="text-base font-semibold">Activity</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-surface2 border border-border rounded-full text-muted"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />3 streams</span>
          <span className="text-xs px-2.5 py-1 bg-surface2 border border-border rounded-full text-muted">1 Direct Play · 1 Direct Stream · 1 Transcode</span>
          <span className="text-xs px-2.5 py-1 bg-surface2 border border-border rounded-full text-muted">↑ 62.4 Mbps</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button id="advanced-toggle" onClick={onAdvancedChange} aria-pressed={advanced} className="flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-medium transition-all" style={{ background: 'var(--t-bg)', borderColor: 'var(--t-border)', color: 'var(--t-text)' }}>
          <div id="advanced-toggle-dot" className="w-7 h-4 rounded-full flex items-center transition-all duration-200 flex-shrink-0 px-0.5" style={{ background: 'var(--t-track)' }}><div id="advanced-toggle-thumb" className="w-3 h-3 rounded-full bg-white shadow transition-all duration-200" style={{ transform: 'var(--t-thumb)' }} /></div>
          <span id="advanced-toggle-label">Advanced</span>
        </button>
        <span className="text-xs text-muted hidden sm:block">auto-refresh 10s</span>
      </div>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'start' }}><ActivityCards /></div>
  </section>
}
