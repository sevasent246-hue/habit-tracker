import { Award, Building2, Check, Flame, LockKeyhole, Sparkles, Sprout, Trophy } from 'lucide-react'
import type { HabitStore } from '../hooks/useHabits'
import { ACHIEVEMENTS } from '../utils/achievements'
import { worldLevelForXp, streakStats } from '../utils/habits'
const iconMap = { Sprout, Check, Flame, Trophy, Sparkles, Building2, Crown: Award }
export default function Achievements({ store }: { store: HabitStore }) {
  const streak = streakStats(store.completions)
  const unlocked = store.achievements.length
  return <div className="page-stack"><section className="achievement-hero panel"><div className="achievement-orb"><Trophy size={25}/><span>✦</span></div><div><p className="eyebrow">YOUR MOMENTS OF MOMENTUM</p><h2>Look how far you’ve come.</h2><p>Every milestone is a reminder: you kept showing up.</p></div><div className="achievement-score"><strong>{unlocked}<span> / {ACHIEVEMENTS.length}</span></strong><small>MILESTONES REACHED</small><div className="achievement-mini-bars">{ACHIEVEMENTS.map((a, i) => <i key={a.id} className={i < unlocked ? 'lit' : ''}/>)}</div></div></section>
    <section className="achievement-grid">{ACHIEVEMENTS.map((a, index) => { const Icon = iconMap[a.icon as keyof typeof iconMap]; const isUnlocked = store.achievements.includes(a.id); return <article className={'achievement-card panel ' + (isUnlocked ? 'achievement-unlocked' : 'achievement-locked')} key={a.id}><div className="achievement-card-top"><div className="achievement-icon"><Icon size={21}/></div><span className={isUnlocked ? 'achievement-state earned' : 'achievement-state'}>{isUnlocked ? <><Check size={12}/> EARNED</> : <><LockKeyhole size={11}/> IN TIME</>}</span></div><div className="achievement-card-copy"><h3>{a.name}</h3><p>{a.detail}</p></div>{!isUnlocked && <div className="achievement-hint">{index === 2 ? Math.max(0, 7 - streak.current) + ' days to go' : index === 4 ? Math.max(0, 100 - store.completions.length) + ' completions to go' : index === 5 ? Math.max(0, 1000 - store.xp) + ' XP to go' : index === 6 ? 'World level ' + worldLevelForXp(store.xp) + ' of 3' : 'One step at a time'}</div>}</article>})}</section>
    </div>
}
