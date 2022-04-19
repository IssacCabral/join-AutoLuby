import { Request, Response } from "express";
import Employee from "../models/Employee";

// request: Request, response: Response
class EmployeeController{
    async create(request: Request, response: Response){
        const {email, name} = request.body
        const data = await Employee.create({email, name})

        return response.status(201).json({status: "Usuário criado com sucesso", data})
    }

    async findAll(request: Request, response: Response){
        const users = await Employee.findAll()

        return users.length > 0 ? response.status(200).json(users) : response.status(204).json({status: "Not found"})
    }

    async findByPk(request: Request, response: Response){
        const id = parseInt(request.params.id)
        const user = await Employee.findByPk(id)

        return user ? response.status(200).json(user) : response.status(404).json({status: "Not found"})
    }

    async update(request: Request, response: Response){
        const id = parseInt(request.params.id)
        const {email, name, age} = request.body

        const userExists = await Employee.findByPk(id)
        if (!userExists){ return response.status(400).json({status: "User Not Found"})}

        await Employee.update({email, name, age}, {where: {id}})
        return response.status(200).json({status: "Atualizado com sucesso"})
    }

    async destroy(request: Request, response: Response){

    }
}

export default new EmployeeController()