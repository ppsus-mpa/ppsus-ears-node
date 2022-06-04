import AbstractController from "../AbstractController";
import {State} from "../../entity/secretaries/State";
import {HttpStatus} from "../../helpers/HttpStatus";
import {Request, Response} from "express";
import SecretaryService from "../../services/SecretaryService";

export default class StateController extends AbstractController {

    constructor() {
        super()
        const {getAll, getById, updateSecretary} = StateController
        const {verifyJWTMiddleware} = this.getJwt()
        const router = this.getRouter()
        router.get("/", getAll)
        router.get("/:id", getById)
        router.put("/:id", verifyJWTMiddleware, updateSecretary)
    }

    private static getAll = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para recuperar todas as secretarias de estado'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const [states, count] = await State.findAndCount()
        return res.status(HttpStatus.OK).json({states, count})
    }

    private static getById = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para recuperar uma secretaria do estado pelo id'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const state = await State.findOne(req.params.id)
        if (!state) {
                res.status(HttpStatus.NOT_FOUND).json({message: "ID não encontrado"})
        }
        return res.status(HttpStatus.OK).json({state})
    }

    private static updateSecretary = async (req: Request, res: Response) => {
        /*
           #swagger.description = 'Endpoint para atualizar uma secretaria do estado pelo id'
           #swagger.parameters['secretary'] = {
               in: 'body',
               required: 'true',
               description: 'Secretaria',
               schema: {$ref: '#/definitions/Secretary'}
           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        const {name, emails} = req.body
        const id = parseInt(req.params.id)
        const state = await State.findOne(id)
        const [status, response] = await SecretaryService.saveSecretary(state, {name, emails})
        return res.status(status).json(response)
    }
}