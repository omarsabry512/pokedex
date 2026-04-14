import { Link } from 'react-router'

type PokemonCardProps = {
  id: string
  name: string
  spriteUrl: string | null
}

function formatDexId(id: string): string {
  return id.padStart(3, '0')
}

export function PokemonCard({ id, name, spriteUrl }: PokemonCardProps) {
  const label = name.replace(/-/g, ' ')

  return (
    <Link
      to={`/pokemon/${id}`}
      className="group flex flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)] ring-1 ring-zinc-900/5 transition hover:shadow-[0_8px_24px_rgba(15,23,42,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
    >
      <div className="flex aspect-square items-center justify-center bg-[#F3F4F6] p-4">
        {spriteUrl ? (
          <img
            src={spriteUrl}
            alt=""
            className="max-h-[88%] max-w-[88%] object-contain transition duration-200 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <span className="text-sm text-zinc-400">No image</span>
        )}
      </div>
      <div className="px-3 pb-4 pt-3 text-center sm:px-4 sm:pb-5 sm:pt-3.5">
        <p className="truncate text-[15px] font-bold capitalize text-zinc-900 sm:text-base">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium text-zinc-400">
          #{formatDexId(id)}
        </p>
      </div>
    </Link>
  )
}
