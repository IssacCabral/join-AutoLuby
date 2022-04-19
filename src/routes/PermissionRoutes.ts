import { Router } from "express";
import PermissionController from "../app/controllers/PermissionController";

const permissionRouter = Router()

permissionRouter.post('/permission', PermissionController.create)
permissionRouter.get('/permissions', PermissionController.findAll)

export default permissionRouter
