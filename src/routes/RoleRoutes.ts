import { Router } from "express";
import RoleController from "../app/controllers/RoleController";

const roleRouter = Router()

roleRouter.post('/role', RoleController.create)
roleRouter.get('/roles', RoleController.findAll)
roleRouter.post('/addpermission', RoleController.addPermission)

export default roleRouter