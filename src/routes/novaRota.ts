import { Router } from "express";
import xController from "../app/controllers/xController";

const novaRouter = Router()

novaRouter.get('/novarota', xController.x)

export default novaRouter
