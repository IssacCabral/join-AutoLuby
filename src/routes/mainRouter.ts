import { Router } from "express";
import tokenRouter from "./TokenRoutes";
import vehiclesRouter from "./VehiclesRoutes";
import usersRouter from "./UsersRoutes";
import reservationsRouter from "./ReservationsRoutes";
import salesRouter from "./SalesRoutes";

const mainRouter = Router()

mainRouter.get('/', (request, response) => {
    response.send('Tudo Ok na rota principal')
})

export default mainRouter
                    .use(tokenRouter)
                    .use(vehiclesRouter)
                    .use(usersRouter)
                    .use(reservationsRouter)
                    .use(salesRouter)