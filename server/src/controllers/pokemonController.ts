import { Get, JsonController, Param, QueryParam, Req, Res } from "routing-controllers";
import { Response } from "express";
import { PokeApi } from "../lib/web_services/pokeapi/pokeapi";
import { Inject, Service } from "typedi";

@Service()
@JsonController("/pokemon")
export class PokemonController {
    @Inject()
    pokeapi!: PokeApi;

    @Get()
    async get(@QueryParam('query') query: string, @Res() response: Response) {
        try {
            const pokemonResponse = await this.pokeapi.searchPokemon(query);
            return response.status(200).send(pokemonResponse);
        } catch(e) {
            response.status(400).send((e as Error).message);
        }
    }

    @Get("/:id")
    async getById(@Param("id") id: number, @Res() response: Response) {
        try {
            const pokemonResponse = await this.pokeapi.getPokemonById(id);
            if(!pokemonResponse) {
                return response.status(404).send();
            }
            return response.send(pokemonResponse);
        }
        catch(e) {
            response.status(400).send((e as Error).message);
        }
    }
}