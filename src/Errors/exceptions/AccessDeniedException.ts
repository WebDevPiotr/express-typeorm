import HttpError from './HttpError'

class AccessDeniedException extends HttpError {

    public statusCode: number = 403
    public name: string = 'Access Denied Error'

}

export default AccessDeniedException