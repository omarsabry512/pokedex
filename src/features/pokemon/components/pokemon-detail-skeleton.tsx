import { ShimmerBlock } from '@/shared/ui/shimmer-block'

const STAT_PLACEHOLDER_ROWS = 6

export function PokemonDetailSkeleton() {
  return (
    <div className="mx-auto max-w-[900px]">
      <ShimmerBlock className="h-11 w-40 rounded-xl bg-white shadow-sm ring-1 ring-zinc-200/80" />

      <article className="mt-6 overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.1)] ring-1 ring-zinc-900/5">
        <ShimmerBlock className="h-[120px] bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 sm:h-[136px]" />

        <div className="grid gap-8 p-6 sm:grid-cols-2 sm:gap-10 sm:p-10">
          <div className="flex flex-col items-center sm:items-start">
            <ShimmerBlock className="h-48 w-48 shrink-0 rounded-full bg-[#F3F4F6] ring-4 ring-white sm:h-56 sm:w-56" />

            <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              <ShimmerBlock className="h-8 w-16 rounded-full bg-zinc-200" />
              <ShimmerBlock
                className="h-8 w-20 rounded-full bg-zinc-200"
                delayMs={70}
              />
            </div>

            <div className="mt-6 w-full max-w-sm rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <ShimmerBlock className="h-3 w-16 rounded bg-zinc-200" />
                  <ShimmerBlock className="h-7 w-20 rounded-md bg-zinc-200" />
                </div>
                <div className="space-y-2">
                  <ShimmerBlock className="h-3 w-16 rounded bg-zinc-200" />
                  <ShimmerBlock className="h-7 w-20 rounded-md bg-zinc-200" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <ShimmerBlock className="h-6 w-28 rounded-md bg-zinc-200" />
            <ul className="mt-4 space-y-3">
              {Array.from({ length: STAT_PLACEHOLDER_ROWS }, (_, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[1fr_minmax(0,1fr)_2.5rem] items-center gap-3"
                >
                  <ShimmerBlock
                    className="h-4 w-20 rounded bg-zinc-200"
                    delayMs={i * 40}
                  />
                  <ShimmerBlock
                    className="h-2.5 min-w-0 w-full rounded-full bg-zinc-200"
                    delayMs={i * 40}
                  />
                  <ShimmerBlock
                    className="h-4 w-8 justify-self-end rounded bg-zinc-200"
                    delayMs={i * 40}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-100 px-6 pb-8 pt-2 sm:px-10 sm:pb-10">
          <ShimmerBlock className="h-6 w-24 rounded-md bg-zinc-200" />
          <div className="mt-4 flex flex-wrap gap-2">
            <ShimmerBlock className="h-8 w-24 rounded-full bg-zinc-200" />
            <ShimmerBlock className="h-8 w-28 rounded-full bg-zinc-200" delayMs={50} />
          </div>

          <ShimmerBlock className="mt-8 h-6 w-36 rounded-md bg-zinc-200" />
          <ShimmerBlock className="mt-3 h-9 w-28 rounded-md bg-sky-200/80" delayMs={40} />
        </div>
      </article>
    </div>
  )
}
