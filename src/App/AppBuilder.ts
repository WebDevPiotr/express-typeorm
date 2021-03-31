import HttpError from 'Errors/exceptions/HttpError'
import { Express, Response, Request, NextFunction, Router } from 'express'

type Middleware = (req: Request, res: Response, next: NextFunction) => void
type ErrorHandler = (error: HttpError, req: Request, res: Response, next: NextFunction) => void
type Path = string | RegExp
type Replacer = (key: string, value: any) => any

class AppBuilder {

    private readonly app: Express

    constructor(app: Express) {
        this.app = app
    }

    public addMiddleware(middleware: Middleware, path?: Path) {
        if (path) this.app.use(path, middleware)
        else this.app.use(middleware)
        return this
    }

    public addController(path: Path, controller: Router) {
        this.app.use(path, controller)
        return this
    }

    public addErrorHandler(handler: ErrorHandler) {
        this.app.use(handler)
        return this
    }

    public build() {
        return this.app
    }

    public addJsonRepleacer(replacer: Replacer) {
        this.app.set("json replacer", replacer)
        return this
    }

}

export default AppBuilder