import { NavLink } from 'react-router-dom'
import tautulliLogo from '../../assets/logo-tautulli-45.png'

type AppHeaderProps = {
  onOpenCommand: () => void
}

export function AppHeader({ onOpenCommand }: AppHeaderProps) {
  return (
  <header className="bg-surface border-b border-border flex-shrink-0">
    {/* Top row: logo + search + user */}
    <div className="flex items-center gap-4 px-6" style={{height: '3.75rem'}}>
      {/* Logo */}
      <NavLink to="/dashboard" className="flex items-center mr-2" aria-label="Tautulli dashboard">
        <img src={tautulliLogo} width={135} height={45} alt="Tautulli" className="h-9 w-auto" />
      </NavLink>
      {/* Server status pill */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface2 border border-border rounded-full text-muted" style={{fontSize: '0.75rem'}}>
        <div className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
        My Plex Server
      </div>
      <div className="flex-1" />
      {/* Search — command palette trigger */}
      <button type="button" onClick={onOpenCommand} className="flex items-center gap-2.5 bg-surface2 border border-border rounded-lg px-3.5 text-muted hover:border-muted hover:bg-surface3 transition-all group" style={{width: '16rem', height: '2.25rem', fontSize: '0.875rem'}}>
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="flex-shrink-0" style={{width: '0.875rem', height: '0.875rem'}}><circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" /></svg>
        <span className="flex-1 text-left">Search or go to…</span>
        <span className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity" style={{fontSize: '0.7rem'}}>
          <span className="bg-surface border border-border rounded px-1.5 py-0.5 font-medium">⌘</span>
          <span className="bg-surface border border-border rounded px-1.5 py-0.5 font-medium">K</span>
        </span>
      </button>
      {/* Notification bell */}
      <button className="relative flex items-center justify-center rounded-lg text-muted hover:bg-surface2 hover:text-white transition-colors" style={{width: '2.25rem', height: '2.25rem'}}>
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{width: '1.1rem', height: '1.1rem'}}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border-2 border-surface" />
      </button>
      {/* User menu */}
      <div className="flex items-center gap-2.5 pl-3 border-l border-border cursor-pointer">
        <img src="https://i.pravatar.cc/36?u=admin" className="rounded-full border border-border" style={{width: '2rem', height: '2rem'}} />
        <div className="hidden sm:block">
          <p className="font-medium leading-none" style={{fontSize: '0.875rem'}}>Admin</p>
          <p className="text-muted mt-0.5" style={{fontSize: '0.7rem'}}>Administrator</p>
        </div>
        <svg fill="none" stroke="#888890" strokeWidth={2} viewBox="0 0 24 24" className="ml-1" style={{width: '0.875rem', height: '0.875rem'}}><path d="m6 9 6 6 6-6" /></svg>
      </div>
    </div>
    {/* Nav row */}
    <div className="flex items-center gap-1 px-5 relative" style={{height: '2.75rem'}}>
      <NavLink to="/dashboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
        <svg style={{width: '.875rem', height: '.875rem'}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x={3} y={3} width={7} height={7} /><rect x={14} y={3} width={7} height={7} /><rect x={3} y={14} width={7} height={7} /><rect x={14} y={14} width={7} height={7} /></svg>
        Dashboard
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
        <svg style={{width: '.875rem', height: '.875rem'}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx={12} cy={12} r={10} /><polyline points="12 6 12 12 16 14" /></svg>
        History
      </NavLink>
      <NavLink to="/users" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
        <svg style={{width: '.875rem', height: '.875rem'}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx={9} cy={7} r={4} /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
        Users
      </NavLink>
      <NavLink to="/libraries" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
        <svg style={{width: '.875rem', height: '.875rem'}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
        Libraries
      </NavLink>
      <NavLink to="/graphs" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
        <svg style={{width: '.875rem', height: '.875rem'}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1={18} y1={20} x2={18} y2={10} /><line x1={12} y1={20} x2={12} y2={4} /><line x1={6} y1={20} x2={6} y2={14} /></svg>
        Graphs
      </NavLink>
      <NavLink to="/recently-added" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
        <svg style={{width: '.875rem', height: '.875rem'}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx={12} cy={12} r={10} /><line x1={12} y1={8} x2={12} y2={16} /><line x1={8} y1={12} x2={16} y2={12} /></svg>
        Recently Added
      </NavLink>
      {/* Divider */}
      <div className="w-px h-5 bg-border mx-1" />
      <NavLink to="/sync" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
        <svg style={{width: '.875rem', height: '.875rem'}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
        Sync
      </NavLink>
      <NavLink to="/logs" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
        <svg style={{width: '.875rem', height: '.875rem'}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
        Logs
      </NavLink>
      <div className="flex-1" />
      <NavLink to="/settings" className={({ isActive }) => `nav-link text-muted${isActive ? ' active' : ''}`}>
        <svg style={{width: '.875rem', height: '.875rem'}} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx={12} cy={12} r={3} /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
        Settings
      </NavLink>
    </div>
  </header>
  )
}
