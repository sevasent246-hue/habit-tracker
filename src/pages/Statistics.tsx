import { useMemo, useState } from 'react'
import { Activity, ArrowDown, ArrowUp, Check, Flame, Sparkles, Target, Zap } from 'lucide-react'
import type { HabitStore } from '../hooks/useHabits'
import { localDate, streakStats } from '../utils/habits'
import './statistics.css'
export default function Statistics({ store }: { store: HabitStore }) {
  const [monthOffset, setMonthOffset] = useState(0)
  const current = new Date(); const start = new Date(current.getFullYear(), current.getMonth() + monthOffset, 1); const year = start.getFullYear(); const month = start.getMonth()
  const label = start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const [yearly, setYearly] = useState(false)
  const dates = useMemo(() => {
    const total = yearly ? 365 : 140; const end = new Date(); const arr = []
    for (let i = total - 1; i >= 0; i--) { const d = new Date(end); d.setDate(end.getDate() - i); arr.push(localDate(d)) }
    return arr
  }, [yearly])
  const dayCounts = useMemo(() => { const m = new Map<string, number>(); for (const c of store.completions) m.set(c.date, (m.get(c.date) ?? 0) + 1); return m }, [store.completions])
  const week = useMemo(() => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); const key = localDate(d); return { key, day: d.toLocaleDateString('en-US', { weekday: 'short' }), count: dayCounts.get(key) ?? 0 } }), [dayCounts])
  const weeklyMax = Math.max(1, ...week.map(d => d.count))
  const activeIds = new Set(store.habits.map(h => h.id))
  const activeCompletions = store.completions.filter(c => activeIds.has(c.habitId)).length
  const totalScheduled = store.habits.reduce((total, habit) => {
    const start = new Date(habit.createdAt + 'T12:00:00')
    const cursor = Number.isNaN(start.getTime()) ? new Date() : start
    const today = new Date(); today.setHours(12, 0, 0, 0)
    let count = 0; let lastWeek = ''
    while (cursor <= today) {
      if (habit.frequency === 'Daily' || (habit.frequency === 'Weekdays' && cursor.getDay() > 0 && cursor.getDay() < 6) || (habit.frequency === 'Weekends' && (cursor.getDay() === 0 || cursor.getDay() === 6))) count++
      if (habit.frequency === 'Weekly') {
        const week = new Date(cursor); week.setDate(cursor.getDate() - ((cursor.getDay() + 6) % 7))
        const weekKey = localDate(week)
        if (weekKey !== lastWeek) { count++; lastWeek = weekKey }
      }
      cursor.setDate(cursor.getDate() + 1)
    }
    return total + count
  }, 0)
  const rate = Math.round(activeCompletions / Math.max(1, totalScheduled) * 100)
  const monthDays = new Date(year, month + 1, 0).getDate(); const leading = new Date(year, month, 1).getDay()
  const streak = streakStats(store.completions)
  const maxCount = Math.max(1, ...Array.from(dayCounts.values()))
  return <div className="page-stack">
    <section className="stat-summary-grid">
      <article className="stat-summary-card"><span className="stat-icon mint-icon"><Target size={17}/></span><div className="stat-big">{Math.min(100, rate)}<small>%</small></div><span className="stat-label">COMPLETION RATE</span><div className="stat-trend"><ArrowUp size={12}/> Looking steady</div></article>
      <article className="stat-summary-card"><span className="stat-icon amber-icon"><Flame size={17}/></span><div className="stat-big">{streak.current}<small> days</small></div><span className="stat-label">CURRENT STREAK</span><div className="stat-trend">Longest: {streak.longest} days</div></article>
      <article className="stat-summary-card"><span className="stat-icon lavender-icon"><Check size={17}/></span><div className="stat-big">{store.completions.length}</div><span className="stat-label">RITUALS KEPT</span><div className="stat-trend">Every check counts</div></article>
      <article className="stat-summary-card"><span className="stat-icon green-icon"><Zap size={17}/></span><div className="stat-big">{store.xp.toLocaleString()}</div><span className="stat-label">TOTAL XP EARNED</span><div className="stat-trend"><Sparkles size={12}/> Well earned</div></article>
    </section>
    <section className="panel weekly-panel"><div className="panel-heading"><div><p className="eyebrow">A GENTLE RHYTHM</p><h2>This week’s activity</h2></div><span className="week-total">{week.reduce((sum, d) => sum + d.count, 0)} completions</span></div><div className="weekly-chart">{week.map(day => <div className="week-column" key={day.key}><div className="week-bar-wrap"><span className="week-count">{day.count || ''}</span><div className="week-bar" style={{ height: Math.max(5, day.count / weeklyMax * 68) + 'px', opacity: day.count ? 1 : .28 }}/></div><span className="week-day">{day.day}</span></div>)}</div></section>
    <section className="panel activity-panel"><div className="panel-heading"><div><p className="eyebrow">YOUR CONSISTENCY</p><h2>Activity over time</h2></div><div className="view-switch"><button className={!yearly ? 'active' : ''} onClick={() => setYearly(false)}>6 months</button><button className={yearly ? 'active' : ''} onClick={() => setYearly(true)}>1 year</button></div></div>
      <div className="heatmap-months"><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span></div><div className={'heatmap ' + (yearly ? 'heatmap-year' : '')}>{dates.map((day, i) => { const count = dayCounts.get(day) ?? 0; return <div key={day} className={'heat-day heat-' + (count ? Math.min(4, Math.ceil(count / Math.max(1, maxCount) * 4)) : 0)} title={day + ': ' + count + ' completions'}>{i === 0 && <span className="heat-day-label">Mon</span>}</div>})}</div><div className="heatmap-legend"><span>Less</span>{[0, 1, 2, 3, 4].map(n => <i key={n} className={'heat-' + n}/ >)}<span>More</span><span className="heatmap-total">{store.completions.length} meaningful moments</span></div>
    </section>
    <section className="panel calendar-panel"><div className="panel-heading"><div><p className="eyebrow">THE DAYS ADD UP</p><h2>A month at a glance</h2></div><div className="calendar-controls"><button className="icon-button" aria-label="Previous month" onClick={() => setMonthOffset(monthOffset - 1)}><ArrowDown className="rotate-up" size={15}/></button><span>{label}</span><button className="icon-button" aria-label="Next month" onClick={() => setMonthOffset(monthOffset + 1)} disabled={monthOffset >= 0}><ArrowDown className="rotate-down" size={15}/></button></div></div>
      <div className="calendar-grid">{['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <span className="calendar-weekday" key={d}>{d}</span>)}{Array.from({ length: leading }, (_, i) => <span key={'blank'+i} className="calendar-empty"/>)}{Array.from({ length: monthDays }, (_, i) => { const day = i + 1; const key = localDate(new Date(year, month, day)); const n = dayCounts.get(key) ?? 0; const today = key === localDate(); return <span key={key} className={'calendar-day ' + (n ? 'calendar-active ca-' + Math.min(4, n) : '') + (today ? ' calendar-today' : '')}>{day}</span>})}</div>
      <div className="calendar-footnote"><span><span className="calendar-dot"/> Days you showed up</span><span><Activity size={13}/> {Array.from(dayCounts.keys()).filter(k => k.startsWith(year + '-' + String(month + 1).padStart(2, '0'))).length} active days this month</span></div>
    </section>
  </div>
}
