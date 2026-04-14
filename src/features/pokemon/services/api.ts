import type {
    PokemonDetailDto,
    PokemonListResponseDto,
} from "@/features/pokemon/services/types";

const POKE_API = "https://pokeapi.co/api/v2";

async function parseJson<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => res.statusText);
        throw new Error(text || `Request failed (${res.status})`);
    }
    return res.json() as Promise<T>;
}

export function pokemonListUrl(limit: number, offset: number): string {
    return `${POKE_API}/pokemon?limit=${limit}&offset=${offset}`;
}

export async function fetchPokemonList(
    limit: number,
    offset: number,
): Promise<PokemonListResponseDto> {
    const res = await fetch(pokemonListUrl(limit, offset));
    return parseJson<PokemonListResponseDto>(res);
}

export async function fetchPokemonById(id: string): Promise<PokemonDetailDto> {
    const res = await fetch(`${POKE_API}/pokemon/${encodeURIComponent(id)}`);
    return parseJson<PokemonDetailDto>(res);
}
