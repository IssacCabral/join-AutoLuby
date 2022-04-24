import User from "../models/User"
import {IUserDTO, IUpdateUserDTO} from './DTO/UserDTO'
import bcrypt from 'bcryptjs'
import Sale from "../models/Sale"
import Reservation from "../models/Reservation"
import Vehicle from "../models/Vehicle"
import Role from "../models/Role"

class UsersService{
    async create({email, password, name, cpf, biography, value, avatar}: IUserDTO){
        let error = []

        const cpfExists = await User.findOne({where: {cpf}})
        const emailExists = await User.findOne({where: {email}})

        cpfExists ? error.push({error: "CPF duplicado"}) : ""
        emailExists ? error.push({error: "Email já existente"}) : ""

        if(error.length > 0) return {error}

        // password Hash
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        //Por padrão um usuário é um employee
        const role = await Role.findOne({where: {name: 'employee'}})

        const user = await User.create({email, password: hash, name, cpf, biography, value, avatar, roleId: role?.getDataValue('id')})
        const userData = await User.findOne({where: {email}, attributes: {exclude: ['password']}})
        
        return {data: userData}
    }


    private async auxFindUserByPk(id: number, {userSales, userReservations}: any){
        // vendedores que não fizeram nem vendas e nem reservas
        if(userReservations.length == 0 && userSales.length == 0){
            const userSearch = await User.findAll({
                include: [
                    {model: Sale}, {model: Reservation}
                ], 
                attributes:{exclude: ['password', 'createdAt', 'updatedAt']} , where: {id}
            }) 
            return {data: userSearch}
        }
        // vendedores que fizeram apenas reservas ou vendedores que fizeram apenas vendas 
        if(userReservations.length > 0 && userSales.length == 0 || userReservations.length == 0 && userSales.length > 0){
            const userSearch = await User.findAll({
                include: [
                    {model: Sale}, {model: Reservation}
                ],
                attributes: {exclude: ['password', 'createdAt', 'updatedAt']}, where: {id}
            })
            return {data: userSearch}
        }
        // vendedores que fizeram vendas e reservas e não possuem veículos com status reservado na listagem de reservas
        const countReservedStatus = await Reservation.findAndCountAll({where: {userId: id, vehicleStatus: "reserved"}})
        if(countReservedStatus.count == 0){
            const userSearch: any = await User.findAll({
                include: [
                    {model: Sale, attributes: {exclude: [
                        'id', 'saleDate', 'userName', 'price', 'userId', 'vehicleId'
                    ]}, 
                    include: [{model: Vehicle, attributes: {exclude: [
                        'id', 'cost_price', 'createdAt', 'updatedAt', 'status'
                    ]}}]
                },
                    {model: Reservation, attributes: {exclude: [
                        'id', 'reservationDate', 'userName', 'userId', 'vehicleId'
                    ]}, 
                    include: [{model: Vehicle, attributes: {exclude: [
                        'id', 'cost_price', 'createdAt', 'updatedAt', 'status'
                    ]}}],
                    where: {
                        vehicleStatus: "sold"
                    }}
                ], 
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }, where: {id}
            })     
            console.log('cheguei aqui')
            return {data: userSearch}  
        }
        // vendedores que fizeram vendas e reservas e possuem veículos com status reservado na listagem de reservas
        const userSearch: any = await User.findAll({
            include: [
                {model: Sale, attributes: {exclude: [
                    'id', 'saleDate', 'userName', 'price', 'userId', 'vehicleId'
                ]}, 
                include: [{model: Vehicle, attributes: {exclude: [
                    'id', 'cost_price', 'createdAt', 'updatedAt', 'status'
                ]}}]
            },
                {model: Reservation, attributes: {exclude: [
                    'id', 'reservationDate', 'userName', 'userId', 'vehicleId'
                ]}, 
                include: [{model: Vehicle, attributes: {exclude: [
                    'id', 'cost_price', 'createdAt', 'updatedAt', 'status'
                ]}}],
                where: {
                    vehicleStatus: "reserved"
                }}
            ], 
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }, where: {id}
        })        
        return {data: userSearch}
    }

    // Deve ser possível visualizar um único funcionário e as vendas/reservas de veículos deste.
    async findUserByPk(id: number){
        const user = await User.findByPk(id)

        if(user === null) return {error: "usuário não encontrado pelo id"}

        const userSales = await Sale.findAll({where: {userId: id}})
        const userReservations = await Reservation.findAll({where: {userId: id}})
        
        const result = await this.auxFindUserByPk(id, {userSales, userReservations})
        return {data: result.data}
    }

    async update(id: number, {name, email, biography, currentlyPassword, newPassword, value}: IUpdateUserDTO){
        const userExists = await User.findOne({where: {email}})
        
        const userSearch: any = await User.findByPk(id)

        if(userExists && userExists.getDataValue('email') !== userSearch.getDataValue('email')) return {error: "O email já existe no banco"}

        const isCorrect = bcrypt.compareSync(currentlyPassword, userSearch.password)
        
        if(!isCorrect) return {error: "A senha atual não corresponde com a senha passada no campo"} 

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(newPassword, salt)

        await User.update({name, email, biography, password: hash, value}, {where: {id}})
        return {data: "usuário atualizado com sucesso"}
    }

    async destroy(id: number){
        const userSearch = await User.findByPk(id)
        if(userSearch === null) return {error: "Usuário não encontrada pelo id"}
        await User.destroy({where: {id}})
        return {data: "Usuário removido!"}
    }
}

export default new UsersService()