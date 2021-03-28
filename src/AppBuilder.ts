import HttpError from 'Errors/exceptions/HttpError'
import { Express, Response, Request, NextFunction, Router } from 'express'

type Middleware = (req: Request, res: Response, next: NextFunction) => void
type ErrorHandler = (error: HttpError, req: Request, res: Response, next: NextFunction) => void
type Path = string | RegExp

class AppBuilder {

    private readonly app: Express
    private readonly port: number = Number(process.env.PORT) || 8000

    constructor(app: Express) {
        this.app = app
    }

    public addMiddleware(middleware: Middleware, path?: Path) {
        this.app.use(path, middleware)
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

    public start() {
        this.app.listen(this.port, () => console.log(`Server started at http://localhost:${this.port}`));
    }

}

export default AppBuilder