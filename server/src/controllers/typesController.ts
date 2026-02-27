import { Get, JsonController, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { PokeApi } from "../lib/web_services/pokeapi/pokeapi";

@Service()
@JsonController("/types")
export class TypesController {
    @Inject()
    pokeapi!: PokeApi;

    @Get()
    async get(@Req() _: Request, @Res() response: Response) {
        try {
            const typesResponse = await this.pokeapi.getAllPokemonTypes();
            return response.status(200).send(typesResponse);
        } catch(e) {
            response.status(400).send((e as Error).message);
        }
    }
}