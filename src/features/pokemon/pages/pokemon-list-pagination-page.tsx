import { useState } from "react";
import { POKEMON_PAGE_SIZE } from "@/shared/config/pagination";
import { usePokemonListPagination } from "@/features/pokemon/hooks/use-pokemon-list-pagination";
import { PaginationControls } from "@/features/pokemon/components/pagination-controls";
import { PokemonGrid } from "@/features/pokemon/components/pokemon-grid";
import { PokemonListSkeleton } from "@/features/pokemon/components/pokemon-list-skeleton";
import { QueryErrorPanel } from "@/features/pokemon/components/query-error-panel";

export function PokemonListPaginationPage() {
    const [page, setPage] = useState(1);
    const { data, isPending, isError, error, refetch, isFetching } =
        usePokemonListPagination(page, POKEMON_PAGE_SIZE);

    if (isError) {
        return (
            <QueryErrorPanel
                message={
                    error instanceof Error ? error.message : "Unknown error"
                }
                onRetry={() => void refetch()}
            />
        );
    }

    if (isPending) {
        return <PokemonListSkeleton count={POKEMON_PAGE_SIZE} />;
    }

    return (
        <div className="space-y-10">
            {isFetching && !isPending ? (
                <p className="text-center text-xs text-zinc-400">Updating…</p>
            ) : null}

            <PokemonGrid items={data.items} />

            <PaginationControls
                page={data.page}
                totalPages={data.totalPages}
                onPageChange={setPage}
                disabled={isFetching}
                pageSize={POKEMON_PAGE_SIZE}
            />
        </div>
    );
}
