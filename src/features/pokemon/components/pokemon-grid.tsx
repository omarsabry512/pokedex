import type { PokemonSummary } from "@/features/pokemon/services/types";
import { PokemonCard } from "@/features/pokemon/components/pokemon-card";

type PokemonGridProps = {
    items: PokemonSummary[];
};

export function PokemonGrid({ items }: PokemonGridProps) {
    return (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {items.map((p) => (
                <li key={p.id}>
                    <PokemonCard
                        id={p.id}
                        name={p.name}
                        spriteUrl={p.spriteUrl}
                    />
                </li>
            ))}
        </ul>
    );
}
