export interface SearchPokemonByNameResponse {
    name: string;
    id: number,
    pokemonTypes: {
        slot: number,
        type: {
            name: string
        }
    }[]
};

export interface GetPokemonByIdResponse {
    name: string,
    pokemontypes: {
      type: {
        name: string
      },
      slot: number
    }[],
    pokemonsprites: {
        frontDefault: string,
        backDefault: string
    }[]
}

export interface PokemonResponse<T> {
    pokemon: T[]
}