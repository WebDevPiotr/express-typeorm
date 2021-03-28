import HttpError from './HttpError'

class UnauthorizedException extends HttpError {

    public statusCode: number = 401
    public name: string = 'Unauthorized Error'

}

export default UnauthorizedException
