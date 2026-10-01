import { ArrowUpRight, ChevronDown, Flower2, Plus, Sparkles, X } from 'lucide-react'
import { navItems } from '../utils/navigation'
export default function Sidebar({ path, onNavigate, onClose, onCreate, level }: { path: string; onNavigate: (path: string) => void; onClose?: () => void; onCreate: () => void; level: number }) {
  return <aside className="sidebar">
    <div className="brand-row"><div className="brand-mark"><Flower2 size={20}/></div><span className="brand-name">bloom<span>.</span></span><button className="icon-button mobile-close" onClick={onClose} aria-label="Close menu"><X size={19}/></button></div>
    <button className="workspace-switch"><span className="workspace-avatar">S</span><span className="workspace-copy"><strong>Sam’s space</strong><small>Personal workspace</small></span><ChevronDown size={15}/></button>
    <button className="button-primary create-sidebar" onClick={onCreate}><Plus size={16}/> Create new habit <span className="shortcut">⌘ K</span></button>
    <nav className="side-nav">{navItems.map(item => <div key={item.path}>{item.group && <div className="nav-group">{item.group}</div>}<button className={'nav-item ' + (path === item.path ? 'active' : '')} onClick={() => { onNavigate(item.path); onClose?.() }}><item.icon size={17} strokeWidth={1.8}/><span>{item.label}</span>{item.path === '/world' && <Sparkles className="nav-spark" size={13}/>}</button></div>)}</nav>
    <div className="sidebar-bottom"><div className="sidebar-tip"><div className="tip-icon"><Sparkles size={15}/></div><div><strong>A little goes a long way</strong><p>Small steps, grown every day.</p></div><ArrowUpRight size={15}/></div><button className="profile-row"><span className="profile-avatar">S</span><span className="profile-copy"><strong>Sam Morgan</strong><small>Level {level} explorer</small></span><ChevronDown size={15}/></button></div>
  </aside>
}
