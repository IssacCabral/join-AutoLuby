import {Request, Response} from 'express'
import VehiclesService from '../services/VehiclesService';
import Vehicle from '../models/Vehicle';

class VehiclesController{
    async create(request: Request, response: Response){
        const userLogged = request.user

        if(userLogged.role !== 'admin'){
            return response.status(403).json({error: 'Você não tem permissão para adicionar veículos'})
        }

        const {brand, model, year, km, color, chassis, sale_price, cost_price} = request.body

        const dataMandatory = ['brand', 'model', 'year', 'km', 'color', 'chassis', 'sale_price', 'cost_price']

        const errors: Array<any> = []

        dataMandatory.forEach(element => {
            if(!request.body[element]){
                errors.push({
                    field: element,
                    message: `O campo ${element} é obrigatório`
                })
            }
        })

        if(errors.length > 0){
            return response.json({errors})
        }

        const data = await VehiclesService.create({brand, model, year, km, color, chassis, sale_price, cost_price})

        return data["error"] ? response.status(400).json(data.error) : response.status(201).json(data.data)
    }

    async findAll(request: Request, response: Response){
        const page = parseInt(request.query.page?.toString() ?? "1")
        const limit = parseInt(request.query.limit?.toString() ?? "7")

        if(isNaN(page) || isNaN(limit)){
            return response.status(400).json({error: "Parâmetros inválidos"});
        }

        if(page < 1 || limit < 1){ 
            return response.status(400).json({error: "Parâmetros inválidos"});
        }

        const vehicles = await Vehicle.findAll({ 
            limit, 
            offset: (page - 1) * limit
        })
        return response.json(vehicles)
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

        const dataMandatory = ['km', 'color', 'sale_price'];

        const errors: Array<any> = []

        dataMandatory.forEach(element => {
            if(!request.body[element]){
                errors.push({
                    field: element,
                    message: `O campo ${element} é obrigatório`
                })
            }
        })

        if(errors.length > 0) {
            return response.json({ errors })
        }

        const data = await VehiclesService.findByPk(id)

        if(data["error"]) return response.status(404).json(data)
        
        const updateResult = await VehiclesService.update(data.data, {km, color, sale_price})
        return updateResult["error"] ? response.status(400).json(updateResult.error) : response.status(200).json(updateResult)
    }

    async destroy(request: Request, response: Response){
        const id: number = parseInt(request.params.id)

        const userLogged = request.user;

        if(userLogged.role !== 'admin') {
            return response.status(403).json({ error: 'Você não tem permissão para remover veículos' });
        }

        const data = await VehiclesService.destroy(id)

        return data["error"] ? response.status(400).json(data) : response.status(200).json(data.data)
    }
}

export default new VehiclesController()