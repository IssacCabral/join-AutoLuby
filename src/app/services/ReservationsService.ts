import { IReservationDTO } from "./DTO/ReservationDTO";
import User from "../models/User";
import Vehicle from "../models/Vehicle";
import Reservation from "../models/Reservation";

class ReservationsService{
    async create({userId, vehicleId}: IReservationDTO){
        let error = []

        const userExists: any = await User.findByPk(userId)
        const vehicleExists: any = await Vehicle.findByPk(vehicleId)

        if(userExists === null) error.push({error: "usuário não encontrado"})
        if(vehicleExists === null) error.push({error: "veiculo não encontrado"})

        const vehicleStatus = vehicleExists?.status
        if(vehicleStatus === "sold" || vehicleStatus === "reserved") error.push({error: "não é possível fazer essa operação com um veículo vendido ou alugado"})

        if(error.length > 0) return {error}

        const userName = userExists.name
        // O valor da reserva será de 2% do valor de venda do veículo
        const reservationValue = vehicleExists.sale_price * 0.02

        await Vehicle.update({status: "reserved"}, {where: {id: vehicleId}})

        const reservation = await Reservation.create({userId, vehicleId, vehicleStatus: "reserved", reservationValue})
        return {data: reservation}
    }

    async findByPk(id: number){
        const reservationSearch = await Reservation.findByPk(id)
        if(reservationSearch === null) return {error: "reserva não encontrada pelo id"}
        return {data: reservationSearch}
    }
}

export default new ReservationsService()