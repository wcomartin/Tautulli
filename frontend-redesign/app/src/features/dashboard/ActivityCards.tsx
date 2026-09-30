import { Pause, Play } from 'lucide-react'
import { activeStreams, type StreamFixture } from './dashboardData'

function StreamCard({ stream }: { stream: StreamFixture }) {
  const isPaused = stream.user === 'mike99'
  const isSquarePoster = stream.user === 'mike99'

  return <div className={`stream-card stream-${stream.decision} bg-surface border border-border rounded-xl overflow-hidden flex flex-col${isPaused ? ' opacity-80' : ''}`} style={{ width: 420 }}>
    <div className="relative h-32 overflow-hidden">
      <img src={stream.backdrop} className="w-full h-full object-cover opacity-50" alt="" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
      <img src={stream.poster} className={`absolute top-3 left-3 ${isSquarePoster ? 'h-[104px] w-[104px]' : 'h-[104px] w-[70px]'} object-cover rounded-lg border border-white/10 shadow-xl`} alt="" />
      <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/70 border border-white/10 text-muted uppercase tracking-wide">{stream.platform}</span>
        <span className="decision-badge text-[10px] px-2 py-0.5 rounded-full font-semibold">{stream.decision === 'transcode' ? 'Transcode 3.2×' : stream.decision === 'direct-play' ? 'Direct Play' : 'Direct Stream'}</span>
      </div>
      <div className={`absolute bottom-2.5 ${isSquarePoster ? 'left-[116px]' : 'left-[86px]'} right-3`}>
        <div className={`flex items-center gap-1.5 mb-0.5 ${isPaused ? 'text-muted' : 'text-accent'}`}><span className={isPaused ? '' : 'animate-pulse'}>{isPaused ? <Pause size={13} strokeWidth={2.5} /> : <Play size={13} fill="currentColor" strokeWidth={2.5} />}</span>{isPaused && <span className="text-[10px] text-muted">Paused</span>}</div>
        <p className="text-sm font-bold leading-tight">{stream.title}</p>
        <p className="text-[11px] text-muted/80 mt-0.5">{stream.subtitle}</p>
      </div>
    </div>
    <div className="px-3 pt-2.5 pb-1">
      <div className="relative h-1.5 bg-surface3 rounded-full overflow-hidden">
        {stream.decision === 'transcode' && <div className="absolute inset-y-0 left-0 bg-white/10 rounded-full" style={{ width: '82%' }} />}
        <div className="progress-play absolute inset-y-0 left-0 rounded-full" style={{ width: `${stream.progress}%` }} />
      </div>
      <div className="flex justify-between text-[10px] text-muted mt-1"><span>{stream.elapsed} / {stream.duration}</span><span>{stream.progress}%</span><span>{stream.eta}</span></div>
    </div>
    <div className="detail-rows overflow-hidden transition-all duration-300" style={{ maxHeight: 'var(--detail-h,500px)', opacity: 'var(--detail-o,1)' }}>
      <div className="px-3 pb-3 pt-1 grid grid-cols-2 gap-x-4 gap-y-0 text-[11px] border-t border-border/50 mt-1">
        {stream.details.map(([label, value]) => <div className="flex justify-between py-1.5 border-b border-border/40" key={label}><span className="text-muted">{label}</span><span className="font-medium text-right ml-2">{value}</span></div>)}
      </div>
    </div>
    <div className="px-3 pb-3 flex items-center gap-2 border-t border-border mt-auto">
      <div className="w-6 h-6 rounded-full border border-border mt-2 bg-surface3 flex items-center justify-center text-[10px]">{stream.user[0].toUpperCase()}</div>
      <div className="flex-1 mt-2"><span className="text-xs font-medium">{stream.user}</span><span className="text-[10px] text-muted ml-1.5">{stream.device}</span></div>
      <button className="mt-2 flex h-6 items-center gap-1 px-2 bg-danger/10 border border-danger/20 rounded-md text-[10px] leading-none font-semibold text-danger hover:bg-danger/20 transition-colors flex-shrink-0" type="button"><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" /></svg>Terminate</button>
    </div>
  </div>
}

export function ActivityCards() {
  return <>{activeStreams.map((stream) => <StreamCard key={stream.title} stream={stream} />)}</>
}
