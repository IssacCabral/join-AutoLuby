import {Request, Response} from 'express'
import User from '../app/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
import Role from '../app/models/Role'
env.config()

class Token{
    async authenticate(request: Request, response: Response){
        const {email, password} = request.body
        const user = await User.findOne({where: {email: email}, include: [{ model: Role, as: 'role'}]})

        if(!user) return response.status(404).json({error: "Email inválido"})

        const correct = bcrypt.compareSync(password, user.getDataValue('password'))
        if(!correct) return response.status(401).json({error: "Senha inválida"})

        /** Token generation
         * em sign coloco informações que quero saber sobre o usuário que está
         * sendo autenticado
         * 
         * Passei a role para saber nas rotas qual o tipo de usuário que está logado
         */
         const token = jwt.sign({userId: user.getDataValue('id'), email: email, role: user.getDataValue('role')?.name}, process.env.SECRET!, {expiresIn:'1hr'})
         return response.status(200).json({token})  
    }
}

export default new Token()