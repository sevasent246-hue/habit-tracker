import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import type { Category, Difficulty, Frequency, Habit } from '../types'
import { HabitGlyph } from './HabitRow'
const categories: Category[] = ['Wellness', 'Focus', 'Fitness', 'Learning', 'Mindfulness', 'Other']
const icons = ['Sprout', 'Droplets', 'BookOpen', 'Footprints', 'Dumbbell', 'Brain', 'Heart', 'Moon']
const colors = ['#a5d6c0', '#e9bb83', '#a9b5e8', '#e7a99a', '#cab0e4', '#9ccbd0']
export default function HabitModal({ initial, onSave, onClose }: { initial: Habit; onSave: (habit: Habit) => void; onClose: () => void }) {
  const [habit, setHabit] = useState(initial)
  useEffect(() => { const handler = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler) }, [onClose])
  const update = <K extends keyof Habit>(key: K, value: Habit[K]) => setHabit(current => ({ ...current, [key]: value }))
  return <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}><section className="habit-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div className="modal-head"><div><p className="eyebrow">{initial.name ? 'REFINE YOUR ROUTINE' : 'MAKE IT A RITUAL'}</p><h2 id="modal-title">{initial.name ? 'Edit habit' : 'Create a habit'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={18}/></button></div>
    <label className="field-label">Habit name<input autoFocus maxLength={60} value={habit.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Take a mindful walk" /></label>
    <div className="field-grid"><label className="field-label">Category<select value={habit.category} onChange={e => update('category', e.target.value as Category)}>{categories.map(c => <option key={c}>{c}</option>)}</select></label><label className="field-label">Frequency<select value={habit.frequency} onChange={e => update('frequency', e.target.value as Frequency)}>{(['Daily', 'Weekdays', 'Weekends', 'Weekly'] as Frequency[]).map(c => <option key={c}>{c}</option>)}</select></label></div>
    <label className="field-label">Difficulty</label><div className="option-row">{(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((d, i) => <button type="button" key={d} onClick={() => update('difficulty', d)} className={'choice-card ' + (habit.difficulty === d ? 'selected' : '')}><strong>{d}</strong><span>{[10, 20, 35][i]} XP</span></button>)}</div>
    <label className="field-label">Pick an icon</label><div className="icon-picker">{icons.map(icon => <button type="button" key={icon} aria-label={icon} className={habit.icon === icon ? 'icon-choice chosen' : 'icon-choice'} onClick={() => update('icon', icon)}><HabitGlyph name={icon}/></button>)}</div>
    <label className="field-label">Accent color</label><div className="color-picker">{colors.map(color => <button type="button" key={color} aria-label={'Select ' + color} className={'color-choice ' + (habit.color === color ? 'chosen' : '')} style={{ background: color }} onClick={() => update('color', color)}/>)}</div>
    <div className="modal-footer"><button className="button-quiet" onClick={onClose}>Cancel</button><button className="button-primary" disabled={!habit.name.trim()} onClick={() => onSave({ ...habit, name: habit.name.trim() })}>{initial.name ? 'Save changes' : 'Create habit'} <span>↗</span></button></div>
  </section></div>
}
