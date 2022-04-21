import {ISaleDTO} from './DTO/SaleDTO'
import User from '../models/User'
import Vehicle from '../models/Vehicle'
import Reservation from '../models/Reservation'
import Sale from '../models/Sale'

class SalesService{
    private async searchAux({userId, vehicleId}: ISaleDTO){
        const userSearch: any = await User.findByPk(userId)
        const vehicleSearch: any = await Vehicle.findByPk(vehicleId)
        
        // Procura o veículo, se o veículo não existir retorna erro
        if(vehicleSearch === null) return {error: "Veículo não encontrado"}

        // veículo existe, verifica o status do veículo. se o veículo estiver
        // marcado como vendido, retorna erro.
        const vehicleStatus = vehicleSearch.status
        if(vehicleStatus === "sold") return {error: "não é possível fazer essa operação com um veículo vendido"}

        return {vehicleSearch, userSearch, vehicleStatus}
    }

    /**preciso verificar se o veículo que está sendo vendido, se ele é reservado. Se ele for reservado, 
     * só pode ser vendido por quem o reservou. caso quem o reservou tenha sido deletado(demitido), daí 
     * permitir a venda para outro vendedor
     */
    
    /**
     * verifico se o veículo é reservado, se ele for reservado, busco na tabela de reservas
     * se o vendedor que o reservou existe. se o vendedor tiver sido demitido(employeeId = null), posso permitir
     * a venda para outro vendedor. Logo, verifico se o employeeId passado aqui nesse método
     * existe. Se existir, realizo a venda. Se não existir, retorna erro de pessoa não encontrada.
     * OK, agora se o vendedor que o reservou existir, verifico se o id passado nesse método bate
     * com o id da reserva do veículo e realizo a venda. se não bater retorno erro informando: 
     * apenas o vendedor que o reservou poderá vender esse veículo  
     */

    async create({userId, vehicleId} : ISaleDTO){
        // userId, vehicleId, saleDate, vehicleStatus, userName, price
        let resultSearch = await this.searchAux({userId, vehicleId})
        if(resultSearch["error"]) return ({error: resultSearch.error})

        if(resultSearch.vehicleStatus === "reserved"){
            const reservation: any = await Reservation.findOne({include: [{model: User}], where: {vehicleId}})

            if(reservation.userId === null) {
                if(resultSearch.userSearch === null){
                    return {error: "usuário não encontrado"}
                }else{
                    const userName = resultSearch.userSearch.name
                    const price = resultSearch.vehicleSearch.sale_price
                    const sale = await Sale.create({userId, vehicleId, vehicleStatus: "sold", userName, price})
                    await Vehicle.update({status: "sold"}, {where: {id: vehicleId}})

                    await Reservation.update({vehicleStatus: "sold"}, {where: {vehicleId}})
                    return {data: sale}
                }
            }else{
                if(userId !== reservation.userId){
                    return {error: "apenas o usuário que o reservou poderá vender esse veículo"}
                }
                const userName = resultSearch.userSearch.name
                const price = resultSearch.vehicleSearch.sale_price
                const sale = await Sale.create({userId, vehicleId, vehicleStatus: "sold", userName, price})
                await Vehicle.update({status: "sold"}, {where: {id: vehicleId}})
                await Reservation.update({vehicleStatus: "sold"}, {where: {vehicleId}})
                return {data: sale}
            }
        }

        const userName = resultSearch.userSearch.dataValues.name
        const price = resultSearch.vehicleSearch.sale_price
        const sale = await Sale.create({userId, vehicleId, vehicleStatus: "sold", userName, price})
        await Vehicle.update({status: "sold"}, {where: {id: vehicleId}})
        await Reservation.update({vehicleStatus: "sold"}, {where: {vehicleId}})

        return {data: sale}
    }   

    async findByPk(id: number){
        const saleSearch = await Sale.findByPk(id)
        if(saleSearch === null) return {error: "venda não encontrada pelo id"}

        return {data: saleSearch}
    }
}

export default new SalesService()