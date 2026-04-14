import { useEffect, useLayoutEffect, useRef } from 'react'

const DEFAULT_PREFETCH_PX = 240

export type UseInfiniteScrollTriggerOptions = {
  onLoadMore: () => void
  hasMore: boolean
  isLoading: boolean
  /** When false, observation is disabled */
  enabled?: boolean
  /** IntersectionObserver root margin (e.g. extra space below viewport to prefetch) */
  rootMargin?: string
}

/**
 * Observes a sentinel element; calls `onLoadMore` when it nears the viewport.
 * Uses refs inside the observer callback so we don’t stale-close over loading state.
 * After each load finishes, re-checks layout: IntersectionObserver may not fire again
 * if the sentinel stayed visible (short pages).
 */
export function useInfiniteScrollTrigger({
  onLoadMore,
  hasMore,
  isLoading,
  enabled = true,
  rootMargin = '0px 0px 240px 0px',
}: UseInfiniteScrollTriggerOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const onLoadMoreRef = useRef(onLoadMore)
  const isLoadingRef = useRef(isLoading)
  const hasMoreRef = useRef(hasMore)
  const wasLoadingRef = useRef(false)

  useLayoutEffect(() => {
    onLoadMoreRef.current = onLoadMore
    isLoadingRef.current = isLoading
    hasMoreRef.current = hasMore
  })

  useEffect(() => {
    if (!enabled) return
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        if (isLoadingRef.current || !hasMoreRef.current) return
        onLoadMoreRef.current()
      },
      { root: null, rootMargin, threshold: 0 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [enabled, hasMore, rootMargin])

  useEffect(() => {
    if (!enabled || !hasMore) return

    const finishedLoading = wasLoadingRef.current && !isLoading
    wasLoadingRef.current = isLoading

    if (!finishedLoading) return

    const node = sentinelRef.current
    if (!node) return
    const { top } = node.getBoundingClientRect()
    if (top <= window.innerHeight + DEFAULT_PREFETCH_PX) {
      onLoadMoreRef.current()
    }
  }, [enabled, hasMore, isLoading])

  return sentinelRef
}
