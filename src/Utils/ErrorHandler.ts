import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'routing-controllers';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';

type ErrorResponse = {
    name: string
    status: number,
    message: string,
}
@Middleware({ type: 'after' })
class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: HttpError, req: Request, res: Response, next: NextFunction) {
        const responseBody: ErrorResponse = {
            name: error.name || '',
            status: error.httpCode || 500,
            message: error.message || 'Internal server error',
        }

        res.status(responseBody.status).json(responseBody)
    }
}

export default CustomErrorHandler