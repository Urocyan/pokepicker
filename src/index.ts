import { createExpressServer } from 'routing-controllers';
import { HealthController } from './controllers/healthController';

const app = createExpressServer({
    controllers: [
        HealthController
    ]
});

const port = process.env.PORT || 8080;

app.listen(port);