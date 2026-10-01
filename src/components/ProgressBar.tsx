type Props = { value: number; color?: string; className?: string }
export default function ProgressBar({ value, color = 'var(--mint)', className = '' }: Props) {
  return <div className={'progress-track ' + className}><div className="progress-fill" style={{ width: Math.min(100, Math.max(0, value)) + '%', background: color }} /></div>
}
