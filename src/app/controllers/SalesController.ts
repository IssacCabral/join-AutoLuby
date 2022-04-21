import {Request, Response} from 'express'
import SalesService from '../services/SalesService'
import Sale from '../models/Sale'

class SalesController{
    async create(request: Request, response: Response){
        const {userId, vehicleId} = request.body
        const data = await SalesService.create({userId, vehicleId})

        return data["error"] ? response.status(400).json(data.error) : response.status(201).json(data.data)
    }

    async findAll(request: Request, response: Response){
        const sales = await Sale.findAll()

        return response.status(200).json(sales)
    }

    async findByPk(request: Request, response: Response){
        const id = parseInt(request.params.id)
        const data = await SalesService.findByPk(id)

        return data["error"] ? response.status(404).json(data.error) : response.status(200).json(data.data)
    }
}

export default new SalesController()