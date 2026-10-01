import { BarChart3, Compass, Flower2, LayoutDashboard, Settings, Trophy } from 'lucide-react'
export const navItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard, group: 'WORKSPACE' },
  { path: '/habits', label: 'My habits', icon: Flower2, group: '' },
  { path: '/world', label: 'Habit world', icon: Compass, group: '' },
  { path: '/statistics', label: 'Statistics', icon: BarChart3, group: 'INSIGHTS' },
  { path: '/achievements', label: 'Achievements', icon: Trophy, group: '' },
  { path: '/settings', label: 'Settings', icon: Settings, group: 'PERSONAL' },
]
