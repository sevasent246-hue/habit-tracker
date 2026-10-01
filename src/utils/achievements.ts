import type { Habit, Completion } from '../types'
import { worldLevelForXp } from './habits'
export const ACHIEVEMENTS = [
  { id: 'first-habit', name: 'First Habit', detail: 'Create your first habit', icon: 'Sprout', test: (h: Habit[]) => h.length > 0 },
  { id: 'first-completion', name: 'First Completion', detail: 'Complete a habit for the first time', icon: 'Check', test: (_h: Habit[], c: Completion[]) => c.length > 0 },
  { id: 'streak-7', name: '7 Day Streak', detail: 'Reach a 7 day streak', icon: 'Flame', test: (_h: Habit[], _c: Completion[], s: number) => s >= 7 },
  { id: 'streak-30', name: '30 Day Streak', detail: 'Reach a 30 day streak', icon: 'Crown', test: (_h: Habit[], _c: Completion[], s: number) => s >= 30 },
  { id: 'completions-100', name: '100 Completions', detail: 'Complete 100 habits', icon: 'Trophy', test: (_h: Habit[], c: Completion[]) => c.length >= 100 },
  { id: 'xp-1000', name: '1000 XP', detail: 'Earn 1,000 XP', icon: 'Sparkles', test: (_h: Habit[], _c: Completion[], _s: number, xp = 0) => xp >= 1000 },
  { id: 'world-3', name: 'World Level 3', detail: 'Grow your world to level 3', icon: 'Building2', test: (_h: Habit[], _c: Completion[], _s: number, xp = 0) => worldLevelForXp(xp) >= 3 },
]
