import { Router } from "express";
import tokenRouter from "./TokenRoutes";
import vehiclesRouter from "./VehiclesRoutes";
const mainRouter = Router()

mainRouter.get('/', (request, response) => {
    response.send('Tudo Ok na rota principal')
})

export default mainRouter
                    .use(tokenRouter)
                    .use(vehiclesRouter)