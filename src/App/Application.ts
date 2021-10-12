import { useExpressServer } from "routing-controllers";
import express, { Express, json } from 'express'
import helmet from "helmet";
import morgan from "morgan";

import AuthController from "Security/AuthController";
import UserController from "User/UserController";
import ErrorHandler from "Utils/ErrorHandler";
class Application {

    public static start() {
        const app = express()
        this.addMiddlewares(app)
        this.addRouting(app) 
        return app
    }

    private static addRouting(app: Express){
        useExpressServer(app, {
            cors: true,
            defaultErrorHandler: false,
            controllers: [UserController, AuthController],
            middlewares: [ErrorHandler]
        });
    }

    private static addMiddlewares(app: Express) {
        app.use(helmet())
        app.use(json())
        app.use(morgan('combined', { skip: () => process.env.NODE_ENV === 'test' }))
    }

}

export default Application