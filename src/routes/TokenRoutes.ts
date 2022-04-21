import { Router } from "express";
import Token from "../auth/Token";

const tokenRouter = Router()

tokenRouter.post('/auth', Token.authenticate)

export default tokenRouter