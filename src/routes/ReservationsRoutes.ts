import { Router } from "express";
import ReservationsController from "../app/controllers/ReservationsController";

const reservationsRouter = Router()

reservationsRouter.post('/reservation', ReservationsController.create) // ok
reservationsRouter.get('/reservations', ReservationsController.findAll) // ok
reservationsRouter.get('/reservation/:id', ReservationsController.findByPk)

export default reservationsRouter