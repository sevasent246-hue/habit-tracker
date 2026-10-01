import { Bell, ChevronDown, Menu, Plus, Search, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { navItems } from '../utils/navigation'
import HabitModal from './HabitModal'
import ToastStack from './ToastStack'
import { createHabit } from '../utils/storage'
import type { HabitStore } from '../hooks/useHabits'
import type { Habit } from '../types'
import { levelForXp } from '../utils/habits'
const todayLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()).toUpperCase()
const titles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Good morning, Sam', subtitle: 'A new day is a fresh page. Let’s make it count.' },
  '/habits': { title: 'Your daily rituals', subtitle: 'Small actions, repeated with care.' },
  '/world': { title: 'Your world, in bloom', subtitle: 'Every promise you keep helps this little place grow.' },
  '/statistics': { title: 'Your progress, over time', subtitle: 'Every small win leaves a mark.' },
  '/achievements': { title: 'Little things, celebrated', subtitle: 'You’re doing better than you think.' },
  '/settings': { title: 'Make it yours', subtitle: 'A few details to make this space feel like home.' },
}
export default function AppShell({ path, onNavigate, store, children }: { path: string; onNavigate: (path: string) => void; store: HabitStore; children: React.ReactNode }) {
  const [modal, setModal] = useState<Habit | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const meta = titles[path] ?? titles['/dashboard']
  useEffect(() => { const handler = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setModal(createHabit()) } }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler) }, [])
  useEffect(() => { const handler = (event: Event) => setModal((event as CustomEvent<Habit>).detail); window.addEventListener('open-habit-modal', handler); return () => window.removeEventListener('open-habit-modal', handler) }, [])
  const save = (habit: Habit) => { store.upsert(habit); setModal(null) }
  return <div className="app-shell">
    <div className={'sidebar-overlay ' + (mobileOpen ? 'show' : '')} onClick={() => setMobileOpen(false)} />
    <div className={'sidebar-wrap ' + (mobileOpen ? 'sidebar-open' : '')}><Sidebar path={path} level={levelForXp(store.xp)} onNavigate={onNavigate} onClose={() => setMobileOpen(false)} onCreate={() => setModal(createHabit())}/></div>
    <main className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20}/></button><div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>{navItems.find(n => n.path === path)?.label ?? 'Overview'}</strong></div></div>
        <div className="topbar-actions"><button className={'search-control ' + (searchOpen ? 'focused' : '')} onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Search size={15}/><span>{searchOpen ? 'Search habits' : 'Quick find'}</span><kbd>⌘ K</kbd></button><span className="topbar-divider"/><button className="icon-button notification-button" aria-label="Notifications" onClick={() => store.addToast('You’re all caught up', 'Your next small win is waiting.') }><Bell size={18}/><i/></button><button className="top-profile"><span className="profile-avatar">S</span><ChevronDown size={14}/></button></div>
      </header>
      {searchOpen && <div className="search-popover"><Search size={16}/><input autoFocus placeholder="Find a habit…" onKeyDown={e => { if (e.key === 'Escape') setSearchOpen(false) }}/><span>ESC</span>{store.habits.slice(0, 4).map(h => <button key={h.id} onClick={() => { onNavigate('/habits'); setSearchOpen(false) }}>{h.name}</button>)}</div>}
      <div className="page-content"><div className="page-heading"><div><p className="eyebrow">{todayLabel}</p><h1>{meta.title}<span className="title-spark"> ✳</span></h1><p className="page-subtitle">{meta.subtitle}</p></div><button className="button-primary heading-create" onClick={() => setModal(createHabit())}><Plus size={16}/> New habit</button></div>{children}</div>
      <footer className="app-footer"><span>Made for the life you’re building.</span><span><Sparkles size={13}/> Level {levelForXp(store.xp)} explorer</span></footer>
    </main>
    {modal && <HabitModal initial={modal} onClose={() => setModal(null)} onSave={save}/>}
    <ToastStack items={store.toasts} dismiss={store.dismissToast}/>
  </div>
}
