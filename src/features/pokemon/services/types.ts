/** Raw list item from PokéAPI */
export type PokemonListItemDto = {
  name: string
  url: string
}

export type PokemonListResponseDto = {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItemDto[]
}

export type PokemonTypeSlotDto = {
  slot: number
  type: { name: string; url: string }
}

export type PokemonStatDto = {
  base_stat: number
  effort: number
  stat: { name: string; url: string }
}

export type PokemonAbilitySlotDto = {
  is_hidden: boolean
  slot: number
  ability: { name: string; url: string }
}

/** Subset of full Pokémon resource used by our UI */
export type PokemonDetailDto = {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  types: PokemonTypeSlotDto[]
  stats: PokemonStatDto[]
  abilities: PokemonAbilitySlotDto[]
  sprites: {
    front_default: string | null
    other?: {
      'official-artwork'?: { front_default: string | null }
    }
  }
}

export type PokemonSummary = {
  id: string
  name: string
  spriteUrl: string | null
}

export type PokemonStat = {
  /** API slug e.g. special-attack */
  key: string
  label: string
  base: number
}

export type PokemonAbility = {
  name: string
  isHidden: boolean
}

export type PokemonDetail = {
  id: string
  name: string
  spriteUrl: string | null
  heightDm: number
  weightHg: number
  types: string[]
  stats: PokemonStat[]
  abilities: PokemonAbility[]
  baseExperience: number
}
