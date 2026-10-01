import { useEffect, useState } from 'react'
import AppShell from './components/AppShell'
import Dashboard from './pages/Dashboard'
import Habits from './pages/Habits'
import World from './pages/World'
import Statistics from './pages/Statistics'
import Achievements from './pages/Achievements'
import Settings from './pages/Settings'
import { useHabits } from './hooks/useHabits'
import type { Habit } from './types'
const routes = ['/dashboard', '/habits', '/world', '/statistics', '/achievements', '/settings']
function pathFromLocation() { return routes.includes(window.location.pathname) ? window.location.pathname : '/dashboard' }
export default function App() {
  const [path, setPath] = useState(pathFromLocation)
  const store = useHabits()
  useEffect(() => { const pop = () => setPath(pathFromLocation()); window.addEventListener('popstate', pop); return () => window.removeEventListener('popstate', pop) }, [])
  const navigate = (next: string) => { if (!routes.includes(next)) return; window.history.pushState({}, '', next); setPath(next); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const openEditor = (habit: Habit) => { window.dispatchEvent(new CustomEvent('open-habit-modal', { detail: habit })) }
  return <AppShell path={path} onNavigate={navigate} store={store}>
    {path === '/dashboard' && <Dashboard store={store} onNavigate={navigate}/>}
    {path === '/habits' && <Habits store={store} create={openEditor}/>}
    {path === '/world' && <World store={store}/>}
    {path === '/statistics' && <Statistics store={store}/>}
    {path === '/achievements' && <Achievements store={store}/>}
    {path === '/settings' && <Settings store={store}/>}
  </AppShell>
}
