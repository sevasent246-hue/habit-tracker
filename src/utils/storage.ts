import type { Challenge, Habit, HabitState, Completion } from '../types'
import { localDate, uid } from './habits'
const KEY = 'habit-world-v1'
const seeds: Habit[] = [
  { id: 'seed-water', name: 'Drink a glass of water', category: 'Wellness', icon: 'Droplets', color: '#a5d6c0', difficulty: 'Easy', frequency: 'Daily', createdAt: localDate() },
  { id: 'seed-read', name: 'Read for 20 minutes', category: 'Learning', icon: 'BookOpen', color: '#e9bb83', difficulty: 'Medium', frequency: 'Daily', createdAt: localDate() },
  { id: 'seed-walk', name: 'Go for a walk', category: 'Fitness', icon: 'Footprints', color: '#a9b5e8', difficulty: 'Medium', frequency: 'Daily', createdAt: localDate() },
]
const challengeForToday = (): Challenge => ({ date: localDate(), target: 3, reward: 50, claimed: false })
export function loadState(): HabitState {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved) { const parsed = JSON.parse(saved) as HabitState; const normalized = { ...parsed, achievements: parsed.achievements ?? [] }; if (parsed.challenge?.date === localDate()) return normalized; return { ...normalized, challenge: challengeForToday() } }
  } catch { /* Recover with a clean local state if storage is unavailable or invalid. */ }
  return { habits: seeds, completions: [] as Completion[], xp: 0, challenge: challengeForToday(), achievements: [] }
}
export const saveState = (state: HabitState) => { try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* App stays usable for this session if storage is full. */ } }
export const createHabit = (): Habit => ({ id: uid(), name: '', category: 'Wellness', icon: 'Sprout', color: '#a5d6c0', difficulty: 'Easy', frequency: 'Daily', createdAt: localDate() })
