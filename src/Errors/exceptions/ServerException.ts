import HttpError from './HttpError'

class ServerException extends HttpError {

    public statusCode: number = 500
    public name: string = 'Server Error'

}

export default ServerException