import "reflect-metadata";
import dotenv from "dotenv"
dotenv.config()

import express from 'express'
import Database from "Database/Database";
import AppBuilder from "AppBuilder";

import cors from 'cors'
import AuthorizationFilter from 'Security/AuthorizationFilter'

import AuthController from 'Security/AuthController'
import UserController from 'User/UserController'
import ErrorHandler from 'Errors/ErrorHandler'


Database.init()
    .then(() => {

        new AppBuilder(express())
            .addMiddleware(cors())
            .addMiddleware(express.json())
            .addMiddleware(AuthorizationFilter, /^((?!\/auth).)*$/)
            .addController('/auth', AuthController)
            .addController('/user', UserController)
            .addErrorHandler(ErrorHandler)
            .start()

    })