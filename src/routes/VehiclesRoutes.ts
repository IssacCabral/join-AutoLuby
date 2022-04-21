import { Router } from "express";
import VehiclesController from "../app/controllers/VehiclesController";

const vehiclesRouter = Router()

vehiclesRouter.post('/vehicle', VehiclesController.create) // ok
vehiclesRouter.get('/vehicles', VehiclesController.findAll) // ok 
vehiclesRouter.get('/vehicles/:pageNumber', VehiclesController.findAllPaginated) // ok
vehiclesRouter.get('/vehicle/:id', VehiclesController.findByPk) // ok

// Filter vehicles By status
vehiclesRouter.get('/vehicles/status/:status', VehiclesController.findByStatus) // ok
vehiclesRouter.get('/vehicles/chassis/:chassisNumber', VehiclesController.findByChassis) // ok
vehiclesRouter.put('/vehicle/:id', VehiclesController.update) // ok
vehiclesRouter.delete('/vehicle/:id', VehiclesController.destroy) // ok

export default vehiclesRouter