import {Request, Response} from 'express'
import SalesService from '../services/SalesService'
import Sale from '../models/Sale'

class SalesController{
    async create(request: Request, response: Response){
        const {userId, vehicleId} = request.body

        const dataMandatory = ["userId", "vehicleId"];

        const erros: Array<any> = []
        dataMandatory.forEach(element => {
            const value = request.body[element]
            if(!value) erros.push({
                field: element,
                message: `O campo ${element} é obrigatório`
            })
        })

        if(erros.length > 0) {
            return response.status(400).json({ erros })
        }

        const data = await SalesService.create({userId, vehicleId})

        return data["error"] ? response.status(400).json(data.error) : response.status(201).json(data.data)
    }

    async findAll(request: Request, response: Response){
        const page = parseInt(request.query.page?.toString() ?? "1");
        const limit = parseInt(request.query.limit?.toString() ?? "5");

        if(isNaN(page) || isNaN(limit)){
            return response.status(400).json({error: "Página ou limite inválidos!"});
        }

        if(page < 0 || limit < 0){ 
            return response.status(400).json({error: "Página ou limite inválidos!"});
        }

        const sales = await Sale.findAll({ limit, offset: (page - 1) * limit });

        return response.status(200).json(sales)
    }

    async findByPk(request: Request, response: Response){
        const id = parseInt(request.params.id)
        const data = await SalesService.findByPk(id)

        return data["error"] ? response.status(404).json(data.error) : response.status(200).json(data.data)
    }
}

export default new SalesController()