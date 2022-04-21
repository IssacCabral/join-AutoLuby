import User from "../models/User"
import {IUserDTO, IUpdateUserDTO} from './DTO/UserDTO'
import bcrypt from 'bcryptjs'

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

        const user = await User.create({email, password: hash, name, cpf, biography, value, avatar})
        return {data: user}
    }

    async update(id: number, {name, email, biography, currentlyPassword, newPassword, value}: IUpdateUserDTO){
        // const userSearch: any = await User.findByPk(id)

        // if(userSearch === null) return {error: "Usuário não encontrado pelo id"}

        // const isCorrect = bcrypt.compareSync(currentlyPassword, userSearch.password)

        // if(!isCorrect) return {error: "A senha atual não corresponde com a senha passada no campo"} 

        // const salt = bcrypt.genSaltSync(10)
        // const hash = bcrypt.hashSync(newPassword, salt)

        // await User.update({name, email, biography, password: hash, value}, {where: {id}})
    }

    async destroy(id: number){
        const userSearch = await User.findByPk(id)
        if(userSearch === null) return {error: "Usuário não encontrada pelo id"}
        await User.destroy({where: {id}})
        return {data: "Usuário removido!"}
    }
}

export default new UsersService()