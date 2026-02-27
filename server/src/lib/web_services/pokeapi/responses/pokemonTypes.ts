export interface GetPokemonTypesQueryResponse extends PokemonType {
    typeefficacies: {
        damage_factor: number,
        target_type: PokemonType
    }
}

interface PokemonType {
    name: string,
    id: number
}