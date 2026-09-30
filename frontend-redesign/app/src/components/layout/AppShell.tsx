import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppHeader } from './AppHeader'
import { CommandPalette } from './CommandPalette'

export function AppShell() {
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen(true)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return <div className="bg-bg text-white h-screen flex flex-col overflow-hidden">
    <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    <AppHeader onOpenCommand={() => setCommandOpen(true)} />
    <Outlet />
  </div>
}
