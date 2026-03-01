import { ApolloClient, DocumentNode, HttpLink, InMemoryCache } from "@apollo/client";
import { Inject, Service } from "typedi";
import { getPokemonByIdQuery, searchPokemonByNameQuery } from "./queries/pokemon";
import { GetPokemonByIdResponse, PokemonResponse } from "./responses/pokemon";
import { getPokemonTypesQuery } from "./queries/pokemonTypes";
import { GetPokemonTypesQueryResponse } from "./responses/pokemonTypes";
import { PokemonBase } from "types/pokemon";

@Service()
export class PokeApi {
    apolloClient: ApolloClient;

    constructor(
        @Inject("pokeapiUrlGql") pokeapiUrlGql: string
    ) {
        this.apolloClient = new ApolloClient({
            link: new HttpLink({ uri: pokeapiUrlGql }),
            cache: new InMemoryCache(),
        });
    }

    private async _makeGqlQuery<T>(query: DocumentNode, queryOptions: Omit<ApolloClient.QueryOptions<T>, 'query'> | null = null): Promise<T|null> {
        try {
            const gqlResponse = await this.apolloClient.query<T>({
                query,
                ...queryOptions
            });

            if(gqlResponse.data) return gqlResponse.data;

            throw new Error(gqlResponse.error?.message);
        }
        catch(e) {
            console.log((e as any).message);
            return null;
        }
    }

    async searchPokemon(query: string) {
        return this._makeGqlQuery<PokemonResponse<PokemonBase>>(searchPokemonByNameQuery, {
            variables: {
                name: `%${query}%`
            }
        });
    }

    async getAllPokemonTypes() {
        return this._makeGqlQuery<GetPokemonTypesQueryResponse>(getPokemonTypesQuery);
    }

    async getPokemonById(id: number) {
        const response = await this._makeGqlQuery<PokemonResponse<GetPokemonByIdResponse>>(getPokemonByIdQuery, {
            variables: {
                id
            }
        });

        return response?.pokemon?.[0];
    }
}