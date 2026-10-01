import type { Difficulty, Habit } from '../types'

export const XP_BY_DIFFICULTY: Record<Difficulty, number> = { Easy: 10, Medium: 20, Hard: 35 }
export const LEVELS = [0, 100, 250, 500, 850, 1300, 1900, 2700, 3700, 5000]
export const WORLD_STAGES = [0, 250, 600, 1200, 2500]
export const worldLevelForXp = (xp: number) => WORLD_STAGES.reduce((stage, threshold, i) => xp >= threshold ? i + 1 : stage, 1)
export const levelForXp = (xp: number) => xp > LEVELS[LEVELS.length - 1] ? LEVELS.length + Math.floor((xp - LEVELS[LEVELS.length - 1]) / 1500) : LEVELS.reduce((level, threshold, i) => xp >= threshold ? i + 1 : level, 1)
export const xpForLevel = (level: number) => LEVELS[Math.min(Math.max(level - 1, 0), LEVELS.length - 1)] ?? 5000
export const xpToNextLevel = (xp: number) => { const level = levelForXp(xp); const current = xpForLevel(level); const next = LEVELS[level] ?? current + 1500; return { level, current, next, progress: Math.min(100, ((xp - current) / (next - current)) * 100) } }
export const localDate = (date = new Date()) => date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')
export const isHabitDone = (completions: { habitId: string; date: string }[], habitId: string, date = localDate()) => completions.some(c => c.habitId === habitId && c.date === date)
export const completionDays = (completions: { date: string }[]) => [...new Set(completions.map(c => c.date))].sort()
export function streakStats(completions: { date: string }[]) {
  const days = completionDays(completions)
  const set = new Set(days)
  const today = new Date(); const todayKey = localDate(today); const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1)
  let current = 0; let cursor = new Date(set.has(todayKey) ? today : yesterday)
  while (set.has(localDate(cursor))) { current++; cursor.setDate(cursor.getDate() - 1) }
  let longest = 0; let run = 0; let previous = ''
  for (const day of days) { const toUtc = (value: string) => { const [y, m, d] = value.split('-').map(Number); return Date.UTC(y, m - 1, d) }; if (previous && (toUtc(day) - toUtc(previous)) === 86400000) run++; else run = 1; longest = Math.max(longest, run); previous = day }
  return { current, longest }
}
export const todayHabits = (habits: Habit[], day = new Date(), completions: { habitId: string; date: string }[] = []) => {
  const today = localDate(day)
  const weekStart = new Date(day); weekStart.setDate(day.getDate() - ((day.getDay() + 6) % 7))
  const weekStartKey = localDate(weekStart)
  return habits.filter(h => {
    if (h.frequency === 'Daily') return true
    if (h.frequency === 'Weekdays') return day.getDay() > 0 && day.getDay() < 6
    if (h.frequency === 'Weekends') return day.getDay() === 0 || day.getDay() === 6
    return !completions.some(c => c.habitId === h.id && c.date >= weekStartKey && c.date < today)
  })
}
export const uid = () => globalThis.crypto?.randomUUID?.() ?? (Date.now() + '-' + Math.random().toString(36).slice(2))
