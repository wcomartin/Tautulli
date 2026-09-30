import { useEffect, useState } from 'react'
import { ActivitySection } from './components/ActivitySection'
import { RecentlyAddedSection } from './components/RecentlyAddedSection'
import { WatchStatisticsSection } from './components/WatchStatisticsSection'

export function DashboardPage() {
  const [advanced, setAdvanced] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('advanced-on', advanced)
    return () => document.documentElement.classList.remove('advanced-on')
  }, [advanced])

  return <main className="flex-1 overflow-y-auto bg-bg" style={{ padding: 'clamp(1.25rem, 2vw, 2.5rem)' }}>
    <ActivitySection advanced={advanced} onAdvancedChange={() => setAdvanced((value) => !value)} />
    <WatchStatisticsSection />
    <RecentlyAddedSection />
  </main>
}
