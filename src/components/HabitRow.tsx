import { BookOpen, Brain, Check, Clock3, Droplets, Dumbbell, Footprints, Heart, Moon, Pencil, Sprout, Trash2, Zap } from 'lucide-react'
import type { Habit } from '../types'
import { XP_BY_DIFFICULTY } from '../utils/habits'
const iconMap = { BookOpen, Brain, Droplets, Dumbbell, Footprints, Heart, Moon, Sprout }
export function HabitGlyph({ name, size = 19 }: { name: string; size?: number }) {
  const Icon = iconMap[name as keyof typeof iconMap] ?? Sprout
  return <Icon size={size} strokeWidth={1.8}/>
}
export default function HabitRow({ habit, done, onToggle, onEdit, onDelete, compact = false }: { habit: Habit; done: boolean; onToggle: () => void; onEdit?: () => void; onDelete?: () => void; compact?: boolean }) {
  return <div className={'habit-row ' + (done ? 'habit-done ' : '') + (compact ? 'habit-row-compact' : '')}>
    <button className="habit-check" aria-label={done ? 'Undo ' + habit.name : 'Complete ' + habit.name} onClick={onToggle}>{done && <Check size={15} strokeWidth={3}/>}</button>
    <div className="habit-glyph" style={{ color: habit.color, background: habit.color + '17' }}><HabitGlyph name={habit.icon}/></div>
    <div className="habit-info"><div className="habit-title">{habit.name}</div><div className="habit-sub"><span>{habit.category}</span><span className="sub-dot">·</span><Clock3 size={11}/><span>{habit.frequency}</span></div></div>
    <span className={'difficulty-tag diff-' + habit.difficulty.toLowerCase()}>{habit.difficulty}</span>
    <span className="habit-xp"><Zap size={13} fill="currentColor"/> +{XP_BY_DIFFICULTY[habit.difficulty]}</span>
    {!compact && <div className="habit-actions">{onEdit && <button className="icon-button" aria-label={'Edit ' + habit.name} onClick={onEdit}><Pencil size={15}/></button>}{onDelete && <button className="icon-button delete-button" aria-label={'Delete ' + habit.name} onClick={onDelete}><Trash2 size={15}/></button>}</div>}
    {compact && done && <span className="done-label">Done</span>}
  </div>
}
