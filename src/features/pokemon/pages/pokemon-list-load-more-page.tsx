import { useCallback } from "react";
import { POKEMON_PAGE_SIZE } from "@/shared/config/pagination";
import { usePokemonInfiniteList } from "@/features/pokemon/hooks/use-pokemon-infinite-list";
import { useInfiniteScrollTrigger } from "@/features/pokemon/hooks/use-infinite-scroll-trigger";
import { InfiniteScrollFooter } from "@/features/pokemon/components/infinite-scroll-footer";
import { PokemonGrid } from "@/features/pokemon/components/pokemon-grid";
import { PokemonListSkeleton } from "@/features/pokemon/components/pokemon-list-skeleton";
import { QueryErrorPanel } from "@/features/pokemon/components/query-error-panel";

export function PokemonListLoadMorePage() {
    const {
        items,
        isPending,
        isError,
        error,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = usePokemonInfiniteList(POKEMON_PAGE_SIZE);

    const hasMore = Boolean(hasNextPage);

    const loadMore = useCallback(() => {
        void fetchNextPage();
    }, [fetchNextPage]);

    const sentinelRef = useInfiniteScrollTrigger({
        onLoadMore: loadMore,
        hasMore,
        isLoading: isFetchingNextPage,
        enabled: !isPending && !isError,
    });

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
        <div className="space-y-6">
            <PokemonGrid items={items} />

            <InfiniteScrollFooter
                loadedCount={items.length}
                hasMore={hasMore}
                isLoadingMore={isFetchingNextPage}
                sentinelRef={sentinelRef}
            />
        </div>
    );
}
