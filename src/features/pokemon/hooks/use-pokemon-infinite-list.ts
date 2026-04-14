import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "@/features/pokemon/services/api";
import { pokemonQueryKeys } from "@/features/pokemon/services/query-keys";
import { mapListItemToSummary } from "@/features/pokemon/services/mappers";
import type { PokemonSummary } from "@/features/pokemon/services/types";

function nextOffset(nextUrl: string | null): number | undefined {
    if (!nextUrl) return undefined;
    try {
        const u = new URL(nextUrl);
        const offset = u.searchParams.get("offset");
        if (offset === null) return undefined;
        const n = Number.parseInt(offset, 10);
        return Number.isFinite(n) ? n : undefined;
    } catch {
        return undefined;
    }
}

function flattenPages(
    pages: Awaited<ReturnType<typeof fetchPokemonList>>[],
): PokemonSummary[] {
    const seen = new Set<string>();
    const items: PokemonSummary[] = [];
    for (const page of pages) {
        for (const row of page.results) {
            const summary = mapListItemToSummary(row);
            if (!seen.has(summary.id)) {
                seen.add(summary.id);
                items.push(summary);
            }
        }
    }
    return items;
}

export function usePokemonInfiniteList(pageSize: number) {
    const query = useInfiniteQuery({
        queryKey: pokemonQueryKeys.infiniteList(pageSize),
        queryFn: ({ pageParam }) => fetchPokemonList(pageSize, pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => nextOffset(lastPage.next) ?? undefined,
    });

    const items = query.data ? flattenPages(query.data.pages) : [];

    return {
        ...query,
        items,
    };
}
