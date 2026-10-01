import { Check, Sparkles, X } from 'lucide-react'
import type { ToastMessage } from '../types'
export default function ToastStack({ items, dismiss }: { items: ToastMessage[]; dismiss: (id: number) => void }) {
  return <div className="toast-stack" aria-live="polite">{items.map(item => <div className={'toast toast-' + item.kind} key={item.id}><span className="toast-icon">{item.kind === 'level' ? <Sparkles size={19} /> : <Check size={19} />}</span><div><strong>{item.title}</strong><p>{item.description}</p></div><button className="icon-button toast-close" aria-label="Dismiss" onClick={() => dismiss(item.id)}><X size={16}/></button></div>)}</div>
}
