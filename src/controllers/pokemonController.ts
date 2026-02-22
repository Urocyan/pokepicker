import { Controller, Get, QueryParam, Req, Res } from "routing-controllers";
import { Response } from "express";
import { PokeApi } from "../lib/web_services/pokeapi/pokeapi";
import { Inject, Service } from "typedi";

@Service()
@Controller("/pokemon")
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
}