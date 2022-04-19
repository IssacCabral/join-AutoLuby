import { response, Router } from "express";
import employeeRouter from "./EmployeeRoutes";
import permissionRouter from "./PermissionRoutes";
import roleRouter from "./RoleRoutes";

import Permission from "../app/models/Permission";
import Role from "../app/models/Role";
import Permission_Role from "../app/models/Permission_Role";

const mainRouter = Router()

mainRouter.get('/', (request, response) => {
    response.send('Tudo Ok na rota principal')
})

export default mainRouter
                    .use(employeeRouter)
                    .use(permissionRouter)
                    .use(roleRouter)