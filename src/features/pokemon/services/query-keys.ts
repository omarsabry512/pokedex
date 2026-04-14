export const pokemonQueryKeys = {
  all: ['pokemon'] as const,
  list: (limit: number, offset: number) =>
    [...pokemonQueryKeys.all, 'list', limit, offset] as const,
  infiniteList: (limit: number) =>
    [...pokemonQueryKeys.all, 'infinite', limit] as const,
  detail: (id: string) => [...pokemonQueryKeys.all, 'detail', id] as const,
}
