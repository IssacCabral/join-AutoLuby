import {Request, Response} from 'express'
import User from '../app/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config()

class Token{
    async authenticate(request: Request, response: Response){
        const {email, password} = request.body
        const user: any = await User.findOne({where: {email: email}})

        if(!user) return response.status(404).json({error: "Email inválido"})

        const correct = bcrypt.compareSync(password, user.password)
        if(!correct) return response.status(401).json({error: "Senha inválida"})

        /** Token generation
         * em sign coloco informações que quero saber sobre o usuário que está
         * sendo autenticado
         */
         const token = jwt.sign({userId: user.id, email: email}, process.env.SECRET!, {expiresIn:'1hr'})
         return response.status(200).json({token})  
    }
}

export default new Token()