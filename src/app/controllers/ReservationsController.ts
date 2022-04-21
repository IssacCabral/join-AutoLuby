import {Request, Response} from 'express' 
import ReservationsService from '../services/ReservationsService'
import Reservation from '../models/Reservation'

class ReservationsController{
    async create(request: Request, response: Response){
        const {userId, vehicleId} = request.body
        const data = await ReservationsService.create({userId, vehicleId}) 

        return data["error"] ? response.status(400).json(data.error) : response.status(201).json(data.data)
    }

    async findAll(request: Request, response: Response){
        const reservations = await Reservation.findAll()

        return response.status(200).json(reservations)
    }

    async findByPk(request: Request, response: Response){
        const id = parseInt(request.params.id)
        const data = await ReservationsService.findByPk(id)

        return data["error"] ? response.status(404).json(data.error) : response.status(200).json(data.data)
    }
}

export default new ReservationsController()