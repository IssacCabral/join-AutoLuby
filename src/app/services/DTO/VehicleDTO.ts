export interface IVehicleDTO{
    brand: string,
    model: string,
    year: number,
    km: string,
    color: string,
    chassis: string,
    sale_price: number,
    cost_price: number
}

export interface IUpdateVehicleDTO{
    km: string,
    color: string,
    sale_price: number
}