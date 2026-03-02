import axios, { AxiosInstance } from 'axios';
import { PokemonBase } from 'types/pokemon';
import { PokemonTypes } from 'types/pokemon_types';

export interface Pokemon {
    name: string,
    pokemontypes: {
      type: {
        name: PokemonTypes
      },
      slot: number
    }[],
    pokemonsprites: {
        frontDefault: string,
        backDefault: string
    }[]
}

export class PokeapiClient {
    private readonly _axiosClient: AxiosInstance;

    constructor() {
        this._axiosClient = axios.create();
    }

    async getPokemonById(id: number): Promise<Pokemon | null> {
        try {
            const response = await this._axiosClient.get<Pokemon>(`/pokemon/${id}`);
            if(response.status === 200) {
                return response.data;
            }
        }
        catch(_) {}
        return null;
    }

    async searchPokemonByName(name: string): Promise<PokemonBase[] | null> {
        try {
            const response = await this._axiosClient.get<{ pokemon: PokemonBase[] }>(`/pokemon?query=${name}`);
            if(response.status === 200) {
                return response.data.pokemon;
            }
        }
        catch(_) {}
        return null;
    }
}