import { Router } from "express";
import UsersController from "../app/controllers/UsersController";
import auth from "../middleware/auth";

const usersRouter = Router()

//Rotas semânticas => indicar os recursos no plural

usersRouter.post('/users', UsersController.create) // rota livre
usersRouter.get('/users', auth, UsersController.findAll)
usersRouter.get('/users/:id', auth, UsersController.findByPk)
usersRouter.put('/users/:id', auth, UsersController.update)
usersRouter.delete('/users/:id', auth, UsersController.destroy) 

export default usersRouter