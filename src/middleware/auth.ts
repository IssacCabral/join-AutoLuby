import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import env from 'dotenv'

env.config()

/**
 * Na hora que o usuário enviar a requisição pra gente, essa requisição
 * passará pelo nosso middleware de autenticação, e dentro dessa requisição
 * temos o headers e um dos headers que temos dentro da requisição é o header
 * de autorização
 */
export default async function auth(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers['authorization']

    if(authToken === undefined || authToken === "Bearer"){
        return response.status(403).json({error: "Token Não provido"})
    }
        
    const token = authToken.split(' ')[1]
    
    jwt.verify(token, process.env.SECRET!, (error, data) => {
        if(error) return response.status(401).json({error: "Token Inválido"})
        request.user = data as any
        next()
    })

}