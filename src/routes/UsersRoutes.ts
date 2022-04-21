import { Router } from "express";
import UsersController from "../app/controllers/UsersController";

const usersRouter = Router()

usersRouter.post('/user', UsersController.create) // ok
usersRouter.get('/users/:pageNumber', UsersController.findAllPaginated) // ok
usersRouter.get('/users', UsersController.findAll) // ok
usersRouter.get('/user/:id', UsersController.findByPk)
usersRouter.put('/user/:id', UsersController.update)
usersRouter.delete('/user/:id', UsersController.destroy) // ok

export default usersRouter