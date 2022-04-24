import { Router } from "express";
import ReservationsController from "../app/controllers/ReservationsController";
import auth from "../middleware/auth";

const reservationsRouter = Router()

reservationsRouter.post('/reservations', auth, ReservationsController.create) // ok
reservationsRouter.get('/reservations', auth, ReservationsController.findAll) // ok
reservationsRouter.get('/reservations/:id', auth, ReservationsController.findByPk) // ok

export default reservationsRouter