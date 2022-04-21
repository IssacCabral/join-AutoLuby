import {Request, Response} from 'express' 
import UsersService from '../services/UsersService'
import User from '../models/User'

class UsersController{
    async create(request: Request, response: Response){
        const {email, password, name, cpf, biography, value, avatar} = request.body
        const data = await UsersService.create({email, password, name, cpf, biography, value, avatar})

        return data["error"] ? response.status(400).json(data.error) : response.status(201).json(data.data)
    }

    async findAllPaginated(request: Request, response: Response){
        const pageNumber: number = parseInt(request.params.pageNumber)
        let offset = 0

        if(isNaN(pageNumber)){
            offset = 0
        }else{
            offset = (pageNumber - 1) * 5
        }

        const users = await User.findAndCountAll({
            limit: 5,
            offset: offset,
            order: [
                ['id', 'DESC']
            ],
            attributes: {
                exclude: ['password', 'avatar', 'createdAt', 'updatedAt']
            }
        })

        let next: boolean

        if(offset + 5 >= users.count){
            next = false
        }else{
            next = true
        }

        var result = {
            pageNum: pageNumber,
            employees: users.rows,
            next: next
        }

        response.status(200).json(result)
    }

    async findAll(request: Request, response: Response){
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
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
        const data = await UsersService.findUserByPk(id)

        if(data["error"]) return response.status(404).json(data.error)

        const updateResult = await UsersService.update(id, {name, email, biography, currentlyPassword, newPassword, value})

        return updateResult['error'] ? response.status(400).json(updateResult.error) : response.status(200).json(updateResult.data)
    }

    async destroy(request: Request, response: Response){
        const id: number = parseInt(request.params.id)
        const data = await UsersService.destroy(id)

        return data["error"] ? response.status(400).json(data) : response.status(200).json(data.data)
    }
}

export default new UsersController()