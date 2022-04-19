import { Request, Response } from "express";
import Role from "../models/Role";
import Permission from "../models/Permission";
import Permission_Role from "../models/Permission_Role";

class RoleController{
    async create(request: Request, response: Response){
        const {name, description} = request.body

        const role = await Role.create({name, description})
        return response.status(200).json(role)
    }

    async findAll(request: Request, response: Response){
        const roles = await Role.findAll({
            include: [
                {model: Permission}
            ]
        })
        return response.json(roles)
    }

    async addPermission(request: Request, response: Response){
        const {roleId, permissionId} = request.body
        
        const x = await Permission_Role.create({roleId, permissionId})

        return response.status(200).json({status: "tudo ok"})
    }
}

export default new RoleController()