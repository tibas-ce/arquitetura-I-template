import { Request, Response } from "express"
import { UserDB, UserDBPost } from "../types"
import { UserBusiness } from "../business/UserBusiness"

export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined
            
            const usersBusiness = new UserBusiness()

            const output = await usersBusiness.getUsers(q)

            res.status(200).send({output})
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const { id, name, email, password }: UserDBPost = req.body
            
            const input = {
                id,
                name,
                email,
                password
            }
            
            const userBusinness = new UserBusiness()

            const output = await userBusinness.createUser(input)
    
            res.status(201).send("Pessoa usuária criada com sucesso!")
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}