import { Router } from "express";
import VehiclesController from "../app/controllers/VehiclesController";
import auth from "../middleware/auth";

const vehiclesRouter = Router()

vehiclesRouter.post('/vehicles', auth, VehiclesController.create) // apenas admins podem criar veículos
vehiclesRouter.get('/vehicles', auth, VehiclesController.findAll) 
vehiclesRouter.get('/vehicles/:id', auth, VehiclesController.findByPk) 

// Filter vehicles By status
vehiclesRouter.get('/vehicles/status/:status', auth, VehiclesController.findByStatus) 
vehiclesRouter.get('/vehicles/chassis/:chassisNumber', auth, VehiclesController.findByChassis)
vehiclesRouter.put('/vehicles/:id', auth, VehiclesController.update) 
vehiclesRouter.delete('/vehicles/:id', auth, VehiclesController.destroy) // apenas admins poderão deletar um veículo

export default vehiclesRouter