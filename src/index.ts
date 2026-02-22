import { createExpressServer, useContainer } from 'routing-controllers';
import 'reflect-metadata';
import { HealthController } from './controllers/healthController';
import { PokemonController } from './controllers/pokemonController';
import Container from 'typedi';

Container.set('pokeapiUrlGql', process.env.POKEAPI_URL_GQL);

useContainer(Container);

const app = createExpressServer({
    controllers: [
        HealthController,
        PokemonController
    ]
});

const port = process.env.PORT || 8080;

app.listen(port);