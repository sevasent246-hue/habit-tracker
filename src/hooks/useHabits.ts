import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Habit, HabitState, ToastMessage } from '../types'
import { isHabitDone, localDate, streakStats, todayHabits, XP_BY_DIFFICULTY, levelForXp } from '../utils/habits'
import { loadState, saveState } from '../utils/storage'
import { ACHIEVEMENTS } from '../utils/achievements'

export function useHabits() {
  const [state, setState] = useState<HabitState>(loadState)
  const stateRef = useRef(state)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const notify = useCallback((title: string, description: string, kind: ToastMessage['kind'] = 'success') => {
    const id = Date.now() + Math.random()
    setToasts(current => [...current, { id, title, description, kind }])
    window.setTimeout(() => setToasts(current => current.filter(t => t.id !== id)), 3800)
  }, [])
  useEffect(() => {
    saveState(state)
    const unlocked = ACHIEVEMENTS.filter(a => a.test(state.habits, state.completions, streakStats(state.completions).current, state.xp)).map(a => a.id)
    const achievements = Array.from(new Set([...state.achievements, ...unlocked]))
    if (achievements.length !== state.achievements.length) {
      const next = { ...state, achievements }
      stateRef.current = next; setState(next)
    }
  }, [state])
  const today = useMemo(() => todayHabits(state.habits, new Date(), state.completions), [state.habits, state.completions])
  const doneToday = useMemo(() => today.filter(h => isHabitDone(state.completions, h.id)).length, [today, state.completions])
  const streak = useMemo(() => streakStats(state.completions), [state.completions])
  const toggle = useCallback((habit: Habit) => {
    const date = localDate()
    const current = stateRef.current
    const existing = current.completions.find(c => c.habitId === habit.id && c.date === date)
    if (existing) {
      const next = { ...current, completions: current.completions.filter(c => c !== existing), xp: Math.max(0, current.xp - existing.xp) }
      stateRef.current = next; setState(next); return
    }
    const earned = XP_BY_DIFFICULTY[habit.difficulty]
    const completions = [...current.completions, { habitId: habit.id, date, xp: earned }]
    const previousLevel = levelForXp(current.xp)
    const next = { ...current, completions, xp: current.xp + earned }
    const completedNow = todayHabits(current.habits, new Date(), completions).filter(h => isHabitDone(completions, h.id, date)).length
    if (!current.completions.length) window.setTimeout(() => notify('First step taken', 'Your first habit is in the books.'), 80)
    if (!current.challenge.claimed && completedNow >= current.challenge.target) {
      next.xp += current.challenge.reward; next.challenge = { ...current.challenge, claimed: true }
      window.setTimeout(() => notify('Daily challenge complete', '+' + current.challenge.reward + ' bonus XP earned.', 'level'), 160)
    }
    if (levelForXp(next.xp) > previousLevel) window.setTimeout(() => notify('Level up!', 'You reached level ' + levelForXp(next.xp) + '. Your world is growing.', 'level'), 80)
    stateRef.current = next; setState(next)
  }, [notify])
  const upsert = useCallback((habit: Habit) => {
    const current = stateRef.current
    const exists = current.habits.some(h => h.id === habit.id)
    const next = { ...current, habits: exists ? current.habits.map(h => h.id === habit.id ? habit : h) : [...current.habits, habit] }
    stateRef.current = next; setState(next)
    notify('Habit saved', habit.name + ' is ready for your next win.')
  }, [notify])
  const remove = useCallback((id: string) => { const next = { ...stateRef.current, habits: stateRef.current.habits.filter(h => h.id !== id) }; stateRef.current = next; setState(next) }, [])
  const addToast = useCallback((title: string, description: string) => notify(title, description, 'info'), [notify])
  return { ...state, today, doneToday, streak, toasts, toggle, upsert, remove, addToast, dismissToast: (id: number) => setToasts(items => items.filter(t => t.id !== id)) }
}
export type HabitStore = ReturnType<typeof useHabits>
