import type { CSSProperties } from 'react'

type ShimmerBlockProps = {
  className?: string
  /** Stagger animations when many blocks mount together */
  delayMs?: number
}

/**
 * Tailwind-driven skeleton block: base fill + sweeping highlight via `shimmer-slide`.
 */
export function ShimmerBlock({ className = '', delayMs = 0 }: ShimmerBlockProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={
        {
          '--shimmer-delay': `${delayMs}ms`,
        } as CSSProperties
      }
    >
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer-slide_1.35s_ease-in-out_infinite] bg-[linear-gradient(105deg,transparent_40%,rgb(255_255_255/0.62)_50%,transparent_60%)] [animation-delay:var(--shimmer-delay,0ms)]"
        aria-hidden
      />
    </div>
  )
}
