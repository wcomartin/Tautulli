import { recentlyAdded } from './dashboardData'

export function RecentlyAddedGrid() {
  return <div className="grid grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-3">
    {recentlyAdded.map(([title, year, added, image], index) => <div className={`group relative cursor-pointer ${index === 5 || index === 6 ? 'hidden lg:block' : ''} ${index > 7 ? 'hidden xl:block' : ''}`} key={title}>
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-surface3">
        <img src={`https://image.tmdb.org/t/p/w342/${image}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" alt="" />
      </div>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
        <p className="text-[11px] font-semibold leading-tight">{title}</p><p className="text-[10px] text-muted">{year}</p>
      </div>
      <p className="mt-1.5 text-[11px] font-medium truncate">{title}</p><p className="text-[10px] text-muted">{added}</p>
    </div>)}
  </div>
}
