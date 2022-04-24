import {Request, Response} from 'express' 
import UsersService from '../services/UsersService'
import User from '../models/User'
import {formatDate} from '../../util/format-date'

class UsersController{
    async create(request: Request, response: Response){
        const {email, password, name, cpf, biography, value, avatar} = request.body

        const mandatoryData = ["email", "password", "name", "cpf", "biography", "value"]

        const errors: Array<any> = []
        mandatoryData.forEach(element => {
            const value = request.body[element]
            if(!value) errors.push({
                field: element,
                message: `O campo ${element} é obrigatório`
            })
        })

        if(errors.length > 0){
            return response.status(400).json({errors})
        }

        const data = await UsersService.create({email, password, name, cpf, biography, value, avatar})

        return data["error"] ? response.status(400).json(data.error) : response.status(201).json(data.data)
    }

    //http://localhost:3000/users?page=1&limit=1
    async findAll(request: Request, response: Response){
        
        const page = parseInt(request.query.page?.toString() ?? "1")
        const limit = parseInt(request.query.limit?.toString() ?? "5")

        if(isNaN(page) || isNaN(limit)){
            return response.status(400).json({error: "Página ou limite inválidos"})
        }

        if(page < 0 || limit < 0){
            return response.status(400).json({error: "Página ou limite inválidos"})
        }

        const users = (await User.findAll({
            attributes: {
                exclude: ['password']
            },
            limit,
            offset: (page - 1) * limit,
        })).map((v) => v.toJSON()).map((v) => ({
            ...v,
            createdAt: formatDate(new Date(v.createdAt)),
            updatedAt: formatDate(new Date(v.updatedAt)),
        }))
        return response.json(users) 
    }

    async findByPk(request: Request, response: Response){
        const id = parseInt(request.params.id)
        const data = await UsersService.findUserByPk(id)

        data["error"] ? response.status(404).json(data.error) : response.status(200).json(data.data)
    }

    async update(request: Request, response: Response){
        const id = parseInt(request.params.id)
        const {name, email, biography, currentlyPassword, newPassword, value} = request.body

        const mandatoryData = ["email", "currentlyPassword", "newPassword", "name", "biography", "value"]

        const errors: Array<any> = []
        mandatoryData.forEach(element => {
            const value = request.body[element]
            if(!value) errors.push({
                field: element,
                message: `O campo ${element} é obrigatório`
            })
        })

        if(errors.length > 0){
            return response.status(400).json({errors})
        }

        const data = await UsersService.findUserByPk(id)

        if(data["error"]) return response.status(404).json(data.error)

        const updateResult = await UsersService.update(id, {name, email, biography, currentlyPassword, newPassword, value})

        return updateResult['error'] ? response.status(400).json(updateResult.error) : response.status(200).json(updateResult.data)
    }

    async destroy(request: Request, response: Response){
        const id: number = parseInt(request.params.id)

        const userLogged = request.user;
        if(userLogged.role !== 'admin'){
            return response.status(403).json({error: 'Você não tem permissão para deletar usuários'})
        }

        const data = await UsersService.destroy(id)

        return data["error"] ? response.status(400).json(data) : response.status(200).json(data.data)
    }
}

export default new UsersController()