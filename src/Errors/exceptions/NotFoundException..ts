import HttpError from './HttpError'

class NotFoundException extends HttpError {

    public statusCode: number = 404
    public name: string = 'Not Found Error'

}

export default NotFoundException