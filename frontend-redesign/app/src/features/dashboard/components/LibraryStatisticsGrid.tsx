import { libraryStatistics, type LibraryStatistic } from '../dashboardData'

function Thumbnail({ image, shape = 'poster', placeholder = '▶', featured = false }: { image?: string; shape?: 'poster' | 'cover' | 'placeholder'; placeholder?: string; featured?: boolean }) {
  const dimensions = featured
    ? shape === 'cover' ? 'h-16 w-16' : 'h-16 w-11'
    : shape === 'cover' ? 'h-6 w-6' : 'h-9 w-6'

  if (image) return <img src={image} className={`${dimensions} object-cover rounded${featured ? '-md border border-white/10 shadow' : ''} flex-shrink-0`} alt="" />
  return <div className={`${dimensions} bg-surface2 rounded flex flex-shrink-0 items-center justify-center text-muted${featured ? ' text-lg' : ' text-[10px]'}`}>{placeholder}</div>
}

function LibraryStatisticCard({ statistic }: { statistic: LibraryStatistic }) {
  const { featured } = statistic
  const hasBackdrop = Boolean(featured.backdrop)

  return <article className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface flex flex-col">
    <header className="flex items-center justify-between border-b border-border px-4 pb-2 pt-3">
      <p className="text-xs font-semibold">{statistic.title}</p>
      <span className="text-[10px] text-muted">{statistic.period}</span>
    </header>
    <div className={`relative h-24 overflow-hidden ${hasBackdrop ? '' : 'bg-surface3'} ${featured.layout === 'bottom' ? 'flex items-center justify-center' : ''}`}>
      {featured.backdrop && <img src={featured.backdrop} className="h-full w-full object-cover opacity-40" alt="" />}
      {hasBackdrop && <><div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" /><div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" /></>}
      {featured.layout === 'bottom'
        ? <><span className="text-4xl text-muted">{featured.placeholder}</span><div className="absolute inset-x-3 bottom-2 flex items-end justify-between"><FeaturedContent featured={featured} /><Metric count={featured.count} /></div></>
        : <div className="absolute inset-0 flex items-center gap-3 px-3"><Thumbnail image={featured.image} shape={featured.shape} placeholder={featured.placeholder} featured /><FeaturedContent featured={featured} /><Metric count={featured.count} /></div>}
    </div>
    <div className="flex-1 space-y-1 px-3 pb-3 pt-1">
      {statistic.entries.map((entry, index) => <div className={`flex items-center gap-2.5 py-1.5${index < statistic.entries.length - 1 ? ' border-b border-border/40' : ''}`} key={`${entry.title}-${index}`}>
        <span className="w-3 flex-shrink-0 text-[11px] font-bold text-muted">{index + 2}</span>
        {(entry.image || entry.shape === 'placeholder') && <Thumbnail image={entry.image} shape={entry.shape} placeholder={entry.placeholder} />}
        <span className="flex-1 truncate text-xs">{entry.title}</span>
        <div className="flex flex-shrink-0 items-center gap-2">
          {entry.progress !== undefined && <div className="h-1 w-16 overflow-hidden rounded-full bg-surface3"><div className="h-full rounded-full bg-accent/50" style={{ width: `${entry.progress}%` }} /></div>}
          <span className="w-5 text-right text-xs text-muted">{entry.count}</span>
        </div>
      </div>)}
    </div>
  </article>
}

function FeaturedContent({ featured }: { featured: LibraryStatistic['featured'] }) {
  return <div><span className="text-[10px] font-bold uppercase tracking-wider text-accent">#1</span><p className="text-sm font-bold leading-tight">{featured.title}</p><p className="text-[11px] text-muted">{featured.subtitle}</p></div>
}

function Metric({ count }: { count: number }) {
  return <div className="ml-auto text-right"><p className="text-xl font-bold">{count}</p><p className="text-[10px] text-muted">plays</p></div>
}

export function LibraryStatisticsGrid() {
  return <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 min-[1440px]:grid-cols-4">
    {libraryStatistics.map((statistic) => <LibraryStatisticCard key={statistic.id} statistic={statistic} />)}
  </div>
}
