import { Request, Response } from "express";
import Permission from "../models/Permission";

class PermissonController{
    async create(request: Request, response: Response){
        const {name, description} = request.body

        const permission = await Permission.create({name, description})
        return response.status(200).json(permission)
    }

    async findAll(request: Request, response: Response){
        const permissions = await Permission.findAll()
        return response.json(permissions)
    }
}

export default new PermissonController()