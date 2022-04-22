import Role from "../models/UsersAccessControl/Role";
import Permission from "../models/UsersAccessControl/Permission";
import Role_Permission from "../models/UsersAccessControl/Role_Permission";
import {Request, Response} from 'express'

class xController{
    async x(request: Request, response: Response){
        const role = await Role.create({name: "Administrator", description: "admin"})
        const permission = await Permission.create({name: "criar venda", description: "cria uma venda"})
        const role_permission = await Role_Permission.create({roleId: 1, permissionId: 1})


        const roles = await Role.findAll()
        const permissions = await Permission.findAll()
        const roles_permissions = await Role_Permission.findAll()

        return response.status(200).json({roles, permissions, roles_permissions})
    }
}

export default new xController()