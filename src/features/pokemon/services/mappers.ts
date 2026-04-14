import type {
    PokemonDetail,
    PokemonDetailDto,
    PokemonListItemDto,
    PokemonSummary,
} from "@/features/pokemon/services/types";

const STAT_LABELS: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Attack",
    "special-defense": "Sp. Defense",
    speed: "Speed",
};

const STAT_ORDER = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
];

export function pokemonIdFromListUrl(url: string): string {
    const trimmed = url.replace(/\/$/, "");
    const segment = trimmed.split("/").pop();
    return segment ?? "";
}

export function officialArtworkUrl(id: string): string | null {
    if (!id) return null;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function mapListItemToSummary(item: PokemonListItemDto): PokemonSummary {
    const id = pokemonIdFromListUrl(item.url);
    return {
        id,
        name: item.name,
        spriteUrl: officialArtworkUrl(id),
    };
}

function mapStats(dto: PokemonDetailDto) {
    const byKey = new Map(dto.stats.map((s) => [s.stat.name, s]));
    return STAT_ORDER.map((key) => {
        const row = byKey.get(key);
        const base = row?.base_stat ?? 0;
        return {
            key,
            label: STAT_LABELS[key] ?? key,
            base,
        };
    });
}

export function mapDetailDtoToModel(dto: PokemonDetailDto): PokemonDetail {
    const spriteUrl =
        dto.sprites.other?.["official-artwork"]?.front_default ??
        dto.sprites.front_default;

    const abilities = [...dto.abilities]
        .sort((a, b) => a.slot - b.slot)
        .map((a) => ({
            name: a.ability.name.replace(/-/g, " "),
            isHidden: a.is_hidden,
        }));

    return {
        id: String(dto.id),
        name: dto.name,
        spriteUrl,
        heightDm: dto.height,
        weightHg: dto.weight,
        types: [...dto.types]
            .sort((a, b) => a.slot - b.slot)
            .map((t) => t.type.name),
        stats: mapStats(dto),
        abilities,
        baseExperience: dto.base_experience,
    };
}
