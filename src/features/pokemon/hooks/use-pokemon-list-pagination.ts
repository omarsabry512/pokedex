import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "@/features/pokemon/services/api";
import { pokemonQueryKeys } from "@/features/pokemon/services/query-keys";
import { mapListItemToSummary } from "@/features/pokemon/services/mappers";
import type { PokemonSummary } from "@/features/pokemon/services/types";

export type PokemonListPaginationResult = {
    items: PokemonSummary[];
    totalCount: number;
    totalPages: number;
    page: number;
    pageSize: number;
};

export function usePokemonListPagination(page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;

    const query = useQuery({
        queryKey: pokemonQueryKeys.list(pageSize, offset),
        queryFn: () => fetchPokemonList(pageSize, offset),
        select: (data): PokemonListPaginationResult => {
            const totalPages = Math.max(1, Math.ceil(data.count / pageSize));
            return {
                items: data.results.map(mapListItemToSummary),
                totalCount: data.count,
                totalPages,
                page,
                pageSize,
            };
        },
    });

    return query;
}
