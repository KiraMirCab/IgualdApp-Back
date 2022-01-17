import { Request, Response, Router } from "express";
import usuarioController from "../controllers/usuarioController";

const usuarioRutas = Router();
usuarioRutas.get('/getDatos', usuarioController.prototype.getDatos);
usuarioRutas.post('/login', usuarioController.prototype.login);

export default usuarioRutas;