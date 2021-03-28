abstract class HttpError extends Error {

    public abstract statusCode: number
    public abstract name: string

}

export default HttpError