import { Plus, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Habit } from '../types'
import type { HabitStore } from '../hooks/useHabits'
import HabitRow from '../components/HabitRow'
import { createHabit } from '../utils/storage'
import { isHabitDone } from '../utils/habits'
export default function Habits({ store, create }: { store: HabitStore; create: (habit: Habit) => void }) {
  const [filter, setFilter] = useState('All rituals'); const [query, setQuery] = useState('')
  const shown = useMemo(() => store.habits.filter(h => h.name.toLowerCase().includes(query.toLowerCase()) && (filter === 'All rituals' || (filter === 'Completed' ? isHabitDone(store.completions, h.id) : !isHabitDone(store.completions, h.id)))), [store.habits, store.completions, query, filter])
  return <div className="page-stack"><section className="panel habits-page-panel"><div className="habit-toolbar"><div className="filter-pills">{['All rituals', 'To do', 'Completed'].map(f => <button key={f} className={filter === f ? 'filter-pill selected' : 'filter-pill'} onClick={() => setFilter(f)}>{f}{f === 'All rituals' && <span>{store.habits.length}</span>}</button>)}</div><div className="habit-toolbar-right"><label className="habit-search"><Search size={15}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a habit"/></label><button className="icon-button filter-button" aria-label="Sort habits"><SlidersHorizontal size={16}/></button><button className="button-primary compact-primary" onClick={() => create(createHabit())}><Plus size={15}/> Add habit</button></div></div>
    <div className="habits-list">{shown.map(habit => <HabitRow key={habit.id} habit={habit} done={isHabitDone(store.completions, habit.id)} onToggle={() => store.toggle(habit)} onEdit={() => create(habit)} onDelete={() => { if (window.confirm('Delete "' + habit.name + '"?')) store.remove(habit.id) }}/>)}
      {!shown.length && <div className="empty-state"><span>☼</span><strong>No rituals found</strong><p>Try another search, or plant a new habit.</p><button className="button-primary" onClick={() => create(createHabit())}><Plus size={15}/> Create a habit</button></div>}</div>
    <div className="habits-page-footer"><span>Showing {shown.length} of {store.habits.length} rituals</span><span><SlidersHorizontal size={13}/> Your routines, your pace</span></div></section>
  </div>
}
