import { Request, Response } from 'express';
import AbstractController from '../AbstractController';
import { HttpStatus } from '../../helpers/HttpStatus';
import { Therapist } from '../../entity/therapist/Therapist';
import TriageController from './triage/TriageController';

export default class TherapistController extends AbstractController {

    constructor() {
        super();
        const { create, getDashboard } = this;
        const { verifyJWTMiddleware } = this.getJwt();
        const router = this.getRouter();

        router.use('/triage', new TriageController().getRouter());

        router.post('/', create);
        router.get('/dashboard', verifyJWTMiddleware, getDashboard);
    }

    private create = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Therapist']
           #swagger.description = 'Endpoint para salvar uma fono'
           #swagger.parameters['therapist'] = {
            in: 'body',
            required: 'true',
            description: 'Fonoaudiologo',
            type: 'object',
            schema: {
                "lembrar": "arrumarEsseJson"
            }
           }
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        let therapist: Therapist;

        try{
            therapist = req.body as Therapist;
        }catch (e: any){
            return res.status(HttpStatus.BAD_REQUEST).json({ message: e, fancyMessage: 'Ocorreu um erro ao tentar criar o usuario' });
        }

        try{
            const therapist2 = await Therapist.findOne({ login: therapist.login });
            if(therapist2){
                return res.status(HttpStatus.BAD_REQUEST).json({ message: { id: therapist2.id }, fancyMessage: 'Já existe um usuario com esse login' });
            }
        }catch (e: any) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e, fancyMessage: 'Ocorreu um erro ao tentar criar o usuario' });
        }

        try{
            therapist = await Therapist.save(therapist);
            return res.status(HttpStatus.OK).json(therapist);
        }catch (e: any){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e, fancyMessage: 'Ocorreu um erro ao tentar criar o usuario' });
        }
    };

    private getDashboard = async (req: Request, res: Response) => {
        /*
           #swagger.tags = ['Therapist']
           #swagger.description = 'Endpoint para recuperar todos os reports do dashboard de um Fono'
           #swagger.security = [{
                "ApiKeyAuth": []
            }]
        */
        return res.status(HttpStatus.OK).json([
            { type: 'baby-pass-fail' },
            { type: 'baby-come-born' },
            { type: 'indicators-percent' },
            { type: 'indicators' },
            { type: 'equipment' }
        ]);
    };
}
