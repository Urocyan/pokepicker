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