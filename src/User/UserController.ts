import { Router, Request, Response } from 'express'
import UserService from './UserService'
import User from './User.entity'

const router: Router = Router()

router.post('/', async (req: Request, res: Response) => {
    const users: User[] = await UserService.findAll()
    res.status(200).json(users)
})

router.post('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const user = await UserService.findById(id)
    res.status(201).json(user)
})

export default router