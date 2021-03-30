import express from 'express'
import AppBuilder from "AppBuilder";

import cors from 'cors'
import AuthorizationFilter from 'Security/AuthorizationFilter'

import AuthController from 'Security/AuthController'
import UserController from 'User/UserController'
import ErrorHandler from 'Errors/ErrorHandler'

import JsonReplacer from 'Utils/JsonReplacer'

const buildApp = () => {
    return new AppBuilder(express())
        .addMiddleware(cors())
        .addMiddleware(express.json())
        .addMiddleware(AuthorizationFilter, /^((?!\/auth).)*$/)
        .addController('/auth', AuthController)
        .addController('/users', UserController)
        .addErrorHandler(ErrorHandler)
        .addJsonRepleacer(JsonReplacer)
        .build()
}

export default buildApp