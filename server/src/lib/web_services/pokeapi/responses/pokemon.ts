import { PokemonType, TypeEfficacy } from 'types/pokemon_types';

export interface GetPokemonByIdResponse {
    name: string,
    pokemontypes: {
      type: PokemonType & { type_efficacies: TypeEfficacy[] },
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