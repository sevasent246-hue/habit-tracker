export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type Frequency = 'Daily' | 'Weekdays' | 'Weekends' | 'Weekly'
export type Category = 'Wellness' | 'Focus' | 'Fitness' | 'Learning' | 'Mindfulness' | 'Other'
export type Habit = { id: string; name: string; category: Category; icon: string; color: string; difficulty: Difficulty; frequency: Frequency; createdAt: string }
export type Completion = { habitId: string; date: string; xp: number }
export type Challenge = { date: string; target: number; reward: number; claimed: boolean }
export type ToastMessage = { id: number; title: string; description: string; kind: 'success' | 'level' | 'info' }
export type HabitState = { habits: Habit[]; completions: Completion[]; xp: number; challenge: Challenge; achievements: string[] }
