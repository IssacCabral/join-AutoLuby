import {Request, Response} from 'express'
import VehiclesService from '../services/VehiclesService';
import Vehicle from '../models/Vehicle';

class VehiclesController{
    async create(request: Request, response: Response){
        const {brand, model, year, km, color, chassis, sale_price, cost_price} = request.body
        const data = await VehiclesService.create({brand, model, year, km, color, chassis, sale_price, cost_price})

        return data["error"] ? response.status(400).json(data.error) : response.status(201).json(data.data)
    }

    async findAll(request: Request, response: Response){
        const vehicles = await Vehicle.findAll()
        return response.json(vehicles)
    }

    async findAllPaginated(request: Request, response: Response){
        const pageNumber: number = parseInt(request.params.pageNumber)
        let offSet = 0

        if(isNaN(pageNumber)){
            return response.status(400).json({error: "parâmetro inválido"})
        }else{
            offSet = (pageNumber -1) * 7
        }

        const vehicles = await Vehicle.findAndCountAll({
            limit: 7,
            offset: offSet,
            order: [
                ['id', 'DESC']
            ],
            attributes: {
                exclude: ['cost_price', 'createdAt', 'updatedAt']
            }
        })

        let next: boolean

        if(offSet + 7 >= vehicles.count){
            next = false
        }else{
            next = true
        }

        var result = {
            pageNum: pageNumber,
            vehicles: vehicles.rows,
            next: next
        }

        return response.status(200).json(result)
    }

    async findByPk(request: Request, response: Response){
        const id = parseInt(request.params.id)
        const data = await VehiclesService.findByPk(id)

        return data["error"] ? response.status(404).json(data) : response.status(200).json(data.data)
    }

    async findByStatus(request: Request, response: Response){
        const status = request.params.status
        const data = await VehiclesService.findByStatus(status)

        return data["error"] ? response.status(404).json(data) : response.status(200).json(data.data)
    }

    async findByChassis(request: Request, response: Response){
        const chassis = request.params.chassisNumber
        const data = await VehiclesService.findByChassis(chassis)

        return data["error"] ? response.status(404).json(data) : response.status(200).json(data.data)
    }

    async update(request: Request, response: Response){
        const id = parseInt(request.params.id)
        const {km, color, sale_price} = request.body
        const data = await VehiclesService.findByPk(id)

        if(data["error"]) return response.status(404).json(data)
        
        const updateResult = await VehiclesService.update(data.data, {km, color, sale_price})
        return updateResult["error"] ? response.status(400).json(updateResult.error) : response.status(200).json(updateResult)
    }

    async destroy(request: Request, response: Response){
        const id: number = parseInt(request.params.id)
        const data = await VehiclesService.destroy(id)

        return data["error"] ? response.status(400).json(data) : response.status(200).json(data.data)
    }
}

export default new VehiclesController()