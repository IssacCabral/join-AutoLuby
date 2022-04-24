import { Router } from "express";
import SalesController from "../app/controllers/SalesController";
import auth from "../middleware/auth";

const salesRouter = Router()

salesRouter.post('/sales', auth, SalesController.create)
salesRouter.get('/sales', auth, SalesController.findAll)
salesRouter.get('/sale/:id', auth, SalesController.findByPk)

export default salesRouter