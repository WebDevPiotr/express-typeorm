import { NextFunction, Request, Response } from 'express'
import HttpError from 'Errors/exceptions/HttpError';
import ErrorResponse from 'Errors/ErrorResponse';

const errorHandler = (error: HttpError, req: Request, res: Response, next: NextFunction) => {

    const responseBody: ErrorResponse = {
        name: error.name || '',
        status: error.statusCode || 500,
        message: error.message,
    }

    res.status(responseBody.status).send(responseBody)
}

export default errorHandler