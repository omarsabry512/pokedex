import { ShimmerBlock } from '@/shared/ui/shimmer-block'

type PokemonCardSkeletonProps = {
  /** Row index for staggered shimmer */
  index?: number
}

export function PokemonCardSkeleton({ index = 0 }: PokemonCardSkeletonProps) {
  const stagger = index * 45

  return (
    <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)] ring-1 ring-zinc-900/5">
      <ShimmerBlock className="aspect-square bg-[#E5E7EB]" delayMs={stagger} />
      <div className="space-y-2 px-4 py-4">
        <ShimmerBlock
          className="mx-auto h-4 w-28 rounded-md bg-zinc-200"
          delayMs={stagger}
        />
        <ShimmerBlock
          className="mx-auto h-3.5 w-14 rounded-md bg-zinc-100"
          delayMs={stagger}
        />
      </div>
    </div>
  )
}
