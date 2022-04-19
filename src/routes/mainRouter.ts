import { response, Router } from "express";
import employeeRouter from "./EmployeeRoutes";

const mainRouter = Router()

mainRouter.get('/', (request, response) => {
    response.send('Tudo Ok na rota principal')
})

export default mainRouter.use(employeeRouter)