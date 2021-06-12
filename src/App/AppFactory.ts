import AppBuilder from "App/AppBuilder";

import { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import AuthorizationFilter from 'Security/Filters/AuthorizationFilter'

import AuthController from 'Security/AuthController'
import UserController from 'User/UserController'

import ErrorHandler from 'Errors/ErrorHandler'
class AppFactory {

    public static get() {

        return new AppBuilder()
            .addMiddleware(helmet())
            .addMiddleware(json())
            .addMiddleware(cors())
            .addMiddleware(morgan('combined', { skip: () => process.env.NODE_ENV === 'test' }))
            .addFilter(new AuthorizationFilter(), /^((?!\/auth).)*$/)
            .addController(AuthController, '/auth')
            .addController(UserController, '/users')
            .addErrorHandler(ErrorHandler)
            .build()
    }

}

export default AppFactory