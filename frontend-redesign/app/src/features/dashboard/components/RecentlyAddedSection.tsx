import { RecentlyAddedGrid } from '../RecentlyAddedGrid'

export function RecentlyAddedSection() {
  return <section>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-semibold">Recently Added</h2>
      <div className="flex items-center gap-2"><div className="flex bg-surface2 border border-border rounded-md p-0.5 text-xs font-medium">
        <button className="px-3 py-1 rounded bg-accent text-black">All</button>
        <button className="px-3 py-1 text-muted hover:text-white transition-colors">Movies</button>
        <button className="px-3 py-1 text-muted hover:text-white transition-colors">TV</button>
        <button className="px-3 py-1 text-muted hover:text-white transition-colors">Music</button>
      </div></div>
    </div>
    <RecentlyAddedGrid />
  </section>
}
