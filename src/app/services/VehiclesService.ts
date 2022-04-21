import Vehicle from "../models/Vehicle";
import {IVehicleDTO} from './DTO/VehicleDTO'
import {IUpdateVehicleDTO} from './DTO/VehicleDTO'

class VehiclesService{
    async create({brand, model, year, km, color, chassis, sale_price, cost_price}: IVehicleDTO){
        let error = []

        const chassisExists = await Vehicle.findOne({where: {chassis}})

        chassisExists ? error.push({error: "Número de chassi duplicado"}) : ""
        typeof year !== "number" ? error.push({error: "o ano do carro não está no formato numérico"}) : ""
        typeof sale_price !== "number" ? error.push({error: "o preço de venda não está no formato numérico"}) : ""
        typeof cost_price !== "number" ? error.push({error: "o preço de custo não está no formato numérico"}) : ""

        if(error.length > 0) return {error}

        const vehicle = await Vehicle.create({brand, model, year, km, color, chassis, sale_price, cost_price})
        return {data: vehicle}
    }

    async findByPk(id: number){
        const vehicleSearch = await Vehicle.findByPk(id)

        if(vehicleSearch === null){return {error: "Veículo não encontrado pelo id"}}

        return {data: vehicleSearch}
    }

    async findByStatus(status: string){
        if(status !== "available" && status !== "sold" && status !== "reserved") return {error: "Status inválido"}

        const vehicles = await Vehicle.findAll({where: {status}})
        if(vehicles.length === 0) return {error: "Não há carros para esse status"}
        return {data: vehicles}
    }

    async findByChassis(chassis: string){
        const vehicleSearch = await Vehicle.findOne({where: {chassis}})

        if(vehicleSearch === null){
            return {error: "Veículo não encontrado pelo chassi"}
        }

        return {data: vehicleSearch}
    }

    async update(vehicle: any , {km, color, sale_price} : IUpdateVehicleDTO){
        let error = []

        vehicle.status === "sold" ? error.push({error: "Não é possível atualizar um veículo vendido"}) : ""
        typeof sale_price !== "number" ? error.push({error: "o preço de venda não está no formato numérico"}) : ""

        if(error.length > 0) return {error}

        await Vehicle.update({km, color, sale_price}, {where: {id: vehicle.id}})
        return {data: "Veículo atualizado!"}
    }

    async destroy(id: number){
        const vehicleSearch = await Vehicle.findByPk(id)
        if(vehicleSearch === null) return {error: "Veículo não encontrado pelo id"}
        await Vehicle.destroy({where: {id}})
        return {data: "Veículo removido!"}
    }
}

export default new VehiclesService()