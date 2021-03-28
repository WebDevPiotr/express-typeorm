import { Router, Request, Response } from 'express'
import AuthService from './AuthService'


const router: Router = Router()

router.post('/login', async (req: Request, res: Response) => {
    await AuthService.handleLoginRequest(req, res)
    res.status(200).send()
})

router.post('/register', async (req: Request, res: Response) => {
    await AuthService.handleRegisterRequest(req, res)
    res.status(201).send()
})

export default router

