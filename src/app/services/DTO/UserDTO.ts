export interface IUserDTO{
    email: string,
    password: string,
    name: string,
    cpf: string,
    biography: string,
    value: number,
    avatar: string
}

export interface IUpdateUserDTO{
    name: string,
    email: string,
    biography: string,
    currentlyPassword: string,
    newPassword: string,
    value: number
}