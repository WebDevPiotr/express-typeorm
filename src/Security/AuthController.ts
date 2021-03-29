import { Router, Request, Response, NextFunction } from 'express'
import AuthService from './AuthService'


const router: Router = Router()

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await AuthService.handleLoginRequest(req, res)
        res.status(200).send()
    } catch (e) {
        next(e)
    }
})

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await AuthService.handleRegisterRequest(req, res)
        res.status(201).send()
    } catch (e) {
        next(e)
    }
})

export default router

