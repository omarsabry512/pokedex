import type { RefObject } from 'react'

type InfiniteScrollFooterProps = {
  loadedCount: number
  hasMore: boolean
  isLoadingMore: boolean
  sentinelRef: RefObject<HTMLDivElement | null>
}

export function InfiniteScrollFooter({
  loadedCount,
  hasMore,
  isLoadingMore,
  sentinelRef,
}: InfiniteScrollFooterProps) {
  return (
    <div className="flex flex-col items-center gap-5 py-10">
      {isLoadingMore ? (
        <div className="flex flex-col items-center gap-3" aria-busy aria-live="polite">
          <div
            className="h-7 w-7 animate-spin rounded-full border-2 border-[#86EFAC] border-t-[#22C55E]"
            aria-hidden
          />
          <p className="text-sm font-medium text-zinc-500">
            Loading more Pokémon…
          </p>
        </div>
      ) : null}

      <p className="text-center text-sm text-zinc-500">
        Showing{' '}
        <span className="font-semibold text-zinc-800">{loadedCount}</span> Pokémon
      </p>

      {!hasMore ? (
        <p className="text-sm text-zinc-400">You&apos;ve reached the end.</p>
      ) : null}

      <div ref={sentinelRef} className="h-3 w-full shrink-0" aria-hidden />
    </div>
  )
}
