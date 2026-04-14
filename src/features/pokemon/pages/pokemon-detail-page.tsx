import type { ReactNode } from "react";
import { useParams } from "react-router";
import { usePokemonDetail } from "@/features/pokemon/hooks/use-pokemon-detail";
import { PokemonDetailSkeleton } from "@/features/pokemon/components/pokemon-detail-skeleton";
import { PokemonDetailView } from "@/features/pokemon/components/pokemon-detail-view";
import { QueryErrorPanel } from "@/features/pokemon/components/query-error-panel";

export function PokemonDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data, isPending, isError, error, refetch } = usePokemonDetail(id);

    const shell = (children: ReactNode) => (
        <div className="min-h-dvh bg-[#F5F3FF] px-4 py-8 font-sans text-zinc-900 antialiased sm:px-6 sm:py-10">
            {children}
        </div>
    );

    if (!id) {
        return shell(
            <p className="text-center text-zinc-500" role="status">
                Missing Pokémon id.
            </p>,
        );
    }

    if (isError) {
        return shell(
            <QueryErrorPanel
                message={
                    error instanceof Error ? error.message : "Unknown error"
                }
                onRetry={() => void refetch()}
            />,
        );
    }

    if (isPending || !data) {
        return shell(<PokemonDetailSkeleton />);
    }

    return shell(<PokemonDetailView pokemon={data} />);
}
