import express from 'express'
import HttpError from 'Errors/exceptions/HttpError'
import { Express, Response, Request, NextFunction, Router } from 'express'
import Filter from 'Security/Filters/Filter'

type Middleware = (req: Request, res: Response, next: NextFunction) => void
type ErrorHandler = (error: HttpError, req: Request, res: Response, next: NextFunction) => void
type Path = string | RegExp
class AppBuilder {

    private readonly app: Express
    private middlewares: Array<Middleware> = []
    private controllers: Array<{ controller: Middleware, path: Path }> = []
    private filters: Array<{ filter: Filter, path: Path }> = []
    private errorHandler: ErrorHandler

    constructor() {
        this.app = express()
    }

    public addMiddleware(middleware: Middleware) {
        this.middlewares.push(middleware)
        return this
    }

    public addFilter(filter: Filter, path: Path) {
        this.filters.push({ filter, path })
        return this
    }

    public addController(controller: Router, path: Path) {
        this.controllers.push({ controller, path })
        return this
    }

    public addErrorHandler(handler: ErrorHandler) {
        this.errorHandler = handler
        return this
    }

    public build() {
        this.middlewares.forEach(middleware => this.app.use(middleware))
        this.filters.forEach(({ filter, path }) => {
            if (path) this.app.use(path, filter.filter)
            else this.app.use(filter.filter)
        })
        this.controllers.forEach(({ controller, path }) => this.app.use(path, controller))
        if (this.errorHandler) this.app.use(this.errorHandler)
        return this.app
    }

}

export default AppBuilder