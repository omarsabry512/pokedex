import { PokemonCardSkeleton } from "@/features/pokemon/components/pokemon-card-skeleton";

type PokemonListSkeletonProps = {
    count?: number;
};

export function PokemonListSkeleton({ count = 20 }: PokemonListSkeletonProps) {
    return (
        <ul
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
            aria-hidden
        >
            {Array.from({ length: count }, (_, i) => (
                <li key={i}>
                    <PokemonCardSkeleton index={i} />
                </li>
            ))}
        </ul>
    );
}
