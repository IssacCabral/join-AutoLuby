import { Router } from "express";
import EmployeeController from "../app/controllers/EmployeeController";

const employeeRouter = Router()

employeeRouter.post('/employee', EmployeeController.create)
employeeRouter.get('/employees', EmployeeController.findAll)
employeeRouter.get('/employee/:id', EmployeeController.findByPk)
employeeRouter.put('/employee/:id')

export default employeeRouter