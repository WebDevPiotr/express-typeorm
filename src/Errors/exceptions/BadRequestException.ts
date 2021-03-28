import HttpError from './HttpError'

class BadRequestException extends HttpError {

    public statusCode: number = 401
    public name: string = 'Bad Request Error'

}

export default BadRequestException