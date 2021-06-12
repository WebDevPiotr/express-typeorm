import { NextFunction, Request, Response } from 'express'

interface Filter {
    filter: (req: Request, res: Response, next: NextFunction) => void
}

export default Filter