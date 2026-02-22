import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { Inject, Service } from "typedi";
import { searchPokemonByNameQuery } from "./queries/pokemon";
import { SearchPokemonByNameResponse } from "./responses/pokemon";

@Service()
export class PokeApi {
    apolloClient: ApolloClient;

    constructor(
        @Inject("pokeapiUrlGql") private readonly pokeapiUrlGql: string
    ) {
        this.apolloClient = new ApolloClient({
            link: new HttpLink({ uri: pokeapiUrlGql }),
            cache: new InMemoryCache()
        });
    }

    async searchPokemon(query: string) {
        const gqlResponse = await this.apolloClient.query<SearchPokemonByNameResponse[]>({
            query: searchPokemonByNameQuery,
            variables: {
                name: `%${query}%`
            }
        });

        if(gqlResponse.data) return gqlResponse.data;

        throw new Error(gqlResponse.error?.message);
    }
}