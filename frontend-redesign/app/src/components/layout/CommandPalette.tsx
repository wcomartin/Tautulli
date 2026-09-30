import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const destinations = [
  ['Dashboard', 'Home · Live activity', '/dashboard'],
  ['History', 'Watch history', '/history'],
  ['Users', 'All Plex users', '/users'],
  ['Libraries', 'Plex libraries', '/libraries'],
  ['Graphs', 'Analytics & charts', '/graphs'],
]

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (!open) return
      }
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose, open])

  return <div id="cmd-overlay" className={open ? 'open' : ''} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div id="cmd-box">
      <div className="flex items-center gap-3 px-4 border-b border-border">
        <svg width={16} height={16} fill="none" stroke="#888890" strokeWidth={2} viewBox="0 0 24 24"><circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" /></svg>
        <input id="cmd-input" placeholder="Go to page, search, find user…" autoComplete="off" />
        <span className="cmd-kbd">ESC</span>
      </div>
      <div className="py-2 pb-3"><div className="cmd-section">Navigation</div>
        {destinations.map(([label, description, path], index) => <button className={`cmd-result w-full text-left${index === 0 ? ' sel' : ''}`} key={path} onClick={() => { navigate(path); onClose() }}><span className="text-sm font-medium flex-1">{label}</span><span className="text-xs text-muted">{description}</span></button>)}
      </div>
      <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-[11px] text-muted"><span><span className="cmd-kbd">ESC</span> close</span></div>
    </div>
  </div>
}
