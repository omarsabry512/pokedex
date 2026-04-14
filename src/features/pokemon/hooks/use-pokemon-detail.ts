import { useQuery } from "@tanstack/react-query";
import { fetchPokemonById } from "@/features/pokemon/services/api";
import { pokemonQueryKeys } from "@/features/pokemon/services/query-keys";
import { mapDetailDtoToModel } from "@/features/pokemon/services/mappers";

export function usePokemonDetail(id: string | undefined) {
    return useQuery({
        queryKey: pokemonQueryKeys.detail(id ?? ""),
        queryFn: () => fetchPokemonById(id!),
        enabled: Boolean(id),
        select: mapDetailDtoToModel,
    });
}
