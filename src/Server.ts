import 'reflect-metadata';
import Express, {Application} from 'express';
import {createConnection, getConnectionOptions} from 'typeorm';
import Dotenv from 'dotenv';
import Cors from 'cors';
import Routes from './controllers/Routes';
import SwaggerUI from 'swagger-ui-express';
import {SnakeNamingStrategy} from 'typeorm-naming-strategies';

export default class Server {
    private readonly express: Application;

    constructor() {
        /* Setup dot env */
        Dotenv.config();
        this.express = Express();

        this.database();
        this.middlewares();
        this.routes();
    }

    public start(): void {
        this.express.set('port', process.env.SERVER_PORT);
        this.express.listen(process.env.SERVER_PORT, () => {
            console.log(`${process.env.SERVER_NAME} running on port ${process.env.SERVER_PORT}.`);
        });
    }

    private middlewares(): void {
        /* Preparing middleware to parse different data formats */
        this.express.use(Express.json());
        this.express.use(Express.urlencoded({ extended: true }));
        /* Setup CORS, adding this options to all response headers. */
        this.express.use(Cors());
    }

    /* connect db. see .env for typeorm config */
    private database(): void {
        getConnectionOptions()
            .then((envOptions) => {
                const additionalOptions: any = {namingStrategy: new SnakeNamingStrategy()}
                if (process.env.DATABASE_URL){
                    additionalOptions.url = process.env.DATABASE_URL
                }
                return {...envOptions, ...additionalOptions}
            })
            .then(createConnection)
            .then(() => console.log('DB Connect'))
            .catch(console.error);
    }

    private routes(): void {
        this.express.use(new Routes().getRouter());
        this.express.use('/docs', SwaggerUI.serve, SwaggerUI.setup(require('../swaggerOutput.json')));
    }
}