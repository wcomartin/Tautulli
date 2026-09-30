import { libraryOverview } from './dashboardData'

export function LibraryOverviewRows() {
  return <div className="bg-surface border border-border rounded-xl overflow-hidden">
    {libraryOverview.map(([name, type, items, added, plays]) => <div className="library-row grid grid-cols-[minmax(12rem,1fr)_7rem_7rem_7rem] gap-4 items-center px-4 py-3 border-b border-border/60 last:border-b-0" key={name}>
      <div className="flex items-center gap-3 min-w-0"><div className="w-9 h-9 rounded-lg bg-surface3 border border-border flex items-center justify-center text-muted flex-shrink-0">▣</div><div className="min-w-0"><p className="text-sm font-medium truncate">{name}</p><p className="text-[10px] text-muted">{type}</p></div></div>
      <div className="library-detail text-xs">{items}</div><div className="library-detail text-xs text-muted">{added}</div><div className="library-detail text-xs text-muted">{plays}</div>
    </div>)}
  </div>
}
