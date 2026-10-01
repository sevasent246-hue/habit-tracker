import { Building2, Check, Compass, Sparkles, Trees, Zap } from 'lucide-react'
import type { HabitStore } from '../hooks/useHabits'
import WorldScene from '../components/WorldScene'
import ProgressBar from '../components/ProgressBar'
import { levelForXp, worldLevelForXp, xpToNextLevel } from '../utils/habits'
const stages = [
  { xp: 0, title: 'A tiny island', detail: 'A place to begin again', icon: Compass },
  { xp: 250, title: 'A home among the trees', detail: 'Your first cozy home appears', icon: Trees },
  { xp: 600, title: 'A little village', detail: 'The first neighbors arrive', icon: Building2 },
  { xp: 1200, title: 'A seaside town', detail: 'Paths and lights connect it all', icon: Sparkles },
  { xp: 2500, title: 'A thriving city', detail: 'A world built one day at a time', icon: Building2 },
]
export default function World({ store }: { store: HabitStore }) {
  const level = levelForXp(store.xp); const worldLevel = worldLevelForXp(store.xp); const { progress, next } = xpToNextLevel(store.xp)
  return <div className="page-stack">
    <section className="world-hero-panel panel"><div className="world-hero-copy"><p className="eyebrow"><Compass size={13}/> YOUR PERSONAL SANCTUARY</p><h2>Every good day<br/>leaves something <em>growing.</em></h2><p>This little world is yours. Each habit you keep plants a seed, builds a home, and brings a town to life.</p><div className="world-xp-card"><span className="xp-medal"><Zap size={16} fill="currentColor"/></span><div><strong>{store.xp.toLocaleString()} XP</strong><small>Level {level} · {Math.max(0, next - store.xp)} XP to your next chapter</small></div><div className="world-xp-level">LVL {level}</div></div><ProgressBar value={progress} color="#9fd0bb"/></div><div className="world-hero-art"><WorldScene xp={store.xp}/></div><div className="hero-sheen"/></section>
    <div className="world-lower-grid"><section className="panel milestones-panel"><div className="panel-heading"><div><p className="eyebrow">A PLACE TO GROW INTO</p><h2>Your world’s journey</h2></div><span className="milestone-badge">{worldLevel} of 5</span></div><div className="milestone-list">{stages.map((stage, i) => { const unlocked = store.xp >= stage.xp; const Icon = stage.icon; return <div key={stage.title} className={'milestone ' + (unlocked ? 'unlocked' : '')}><div className="milestone-rail"><span className="milestone-icon">{unlocked ? <Check size={15}/> : <Icon size={15}/>}</span>{i < stages.length - 1 && <span className="milestone-line"/>}</div><div className="milestone-copy"><strong>{stage.title}</strong><span>{stage.detail}</span></div><div className="milestone-xp">{unlocked ? 'Reached' : stage.xp.toLocaleString() + ' XP'}</div></div>})}</div></section>
      <section className="panel world-note-panel"><div className="note-top-icon"><Sparkles size={19}/></div><p className="eyebrow">A NOTE TO SELF</p><h2>Progress is a place you build.</h2><p>Some days bring a new building. Some days just keep the lights on. Every day you show up matters.</p><div className="note-footer"><span>YOUR PACE, YOUR PLACE</span><span>✳</span></div></section></div>
  </div>
}
