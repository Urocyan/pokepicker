import { useContainer, useExpressServer } from 'routing-controllers';
import 'reflect-metadata';
import { HealthController } from './controllers/healthController';
import { PokemonController } from './controllers/pokemonController';
import Container from 'typedi';
import { TypesController } from './controllers/typesController';
import express, { static as static_ } from 'express';

Container.set('pokeapiUrlGql', process.env.POKEAPI_URL_GQL);

useContainer(Container);

const expressServer = express();

expressServer.use(static_('public'));

const app = useExpressServer(expressServer,{
    controllers: [
        HealthController,
        PokemonController,
        TypesController
    ]
});

const port = process.env.PORT || 8080;

app.listen(port);