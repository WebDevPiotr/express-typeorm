import { useExpressServer } from "routing-controllers";
import express, { Express, json } from 'express'
import AuthController from "Security/AuthController";
import UserController from "User/UserController";

import helmet from "helmet";
import morgan from "morgan";
import CustomErrorHandler from "Utils/ErrorHandler";

class Application {

    private static application: Express

    public static start() {
        this.application = express()
        this.addMiddlewares()
        this.addRouting() 
        return this.application
    }

    private static addRouting(){
        useExpressServer(this.application, {
            cors: true,
            defaultErrorHandler: false,
            controllers: [UserController, AuthController],
            middlewares: [CustomErrorHandler]
        });
    }

    private static addMiddlewares() {
        this.application.use(helmet())
        this.application.use(json())
        this.application.use(morgan('combined', { skip: () => process.env.NODE_ENV === 'test' }))
    }

}

export default Application