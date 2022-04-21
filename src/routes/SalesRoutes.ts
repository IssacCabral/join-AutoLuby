import { Router } from "express";
import SalesController from "../app/controllers/SalesController";

const salesRouter = Router()

salesRouter.post('/sale', SalesController.create)
salesRouter.get('/sales', SalesController.findAll)
salesRouter.get('/sale/:id', SalesController.findByPk)

export default salesRouter