import { useMemo } from 'react'
import { worldLevelForXp } from '../utils/habits'
export default function WorldScene({ xp, compact = false }: { xp: number; compact?: boolean }) {
  const level = worldLevelForXp(xp)
  const stage = level >= 5 ? 'A thriving city' : level >= 4 ? 'A little town' : level >= 3 ? 'A growing village' : level >= 2 ? 'A home among the trees' : 'Your first little island'
  const buildings = useMemo(() => Array.from({ length: Math.max(0, level - 1) }, (_, i) => ({ x: 24 + i * 11, h: 18 + ((i * 19 + 13) % 38), color: ['#dfb583', '#c99576', '#f0d4a0', '#a8c9b1'][i % 4] })), [level])
  return <div className={'world-scene ' + (compact ? 'world-compact' : '') + ' stage-' + Math.min(level, 5)} aria-label={stage + ', level ' + level}>
    <div className="world-sky"><span className="star star-one">✦</span><span className="star star-two">✦</span><span className="star star-three">·</span><div className="sun-glow"/><div className="world-cloud cloud-one"/><div className="world-cloud cloud-two"/></div>
    <div className="world-water"><div className="water-line line-one"/><div className="water-line line-two"/><div className="water-line line-three"/></div>
    <div className="island"><div className="island-shore"/><div className="island-grass"/><div className="hill hill-back"/><div className="hill hill-front"/>
      <div className="tree tree-a"><i/><b/></div><div className="tree tree-b"><i/><b/></div><div className="tree tree-c"><i/><b/></div>
      {level >= 2 && <div className="home"><div className="roof"/><div className="house"><i/><b/></div><div className="door"/></div>}
      {buildings.slice(0, level >= 3 ? Math.max(2, level - 1) : 0).map((building, i) => <div className="building" key={i} style={{ left: building.x + '%', height: building.h + 'px', background: building.color }}><i/><i/><i/></div>)}
      {level >= 3 && <><div className="path"/><div className="lamp lamp-a"/><div className="lamp lamp-b"/></>}
      {level >= 4 && <><div className="tower"><span/></div><div className="windmill"><i/><b/></div></>}
      {level >= 5 && <><div className="bridge"/><div className="mini-cloud"/></>}
    </div>
    <div className="world-caption"><span className="world-status-dot"/><span>{stage}</span><span className="caption-divider">·</span><span>Level {level}</span></div>
  </div>
}
