import {Conduct} from "../../../entity/conduct/Conduct";

export default class ConductRepository {

    public getAll(therapistId: number): Promise<Conduct[] | undefined>{
        let query = Conduct.createQueryBuilder('conduct')
            .select([
                'conduct.id AS id',
                'CONCAT(conduct.resultDescription, conduct.accompanyDescription) AS name',
                'conduct.resultDescription AS resultDescription',
                'conduct.accompanyDescription AS accompanyDescription',
                'conduct.leftEar AS leftEar',
                'conduct.rightEar AS rightEar',
                'conduct.irda AS irda',
                'conduct.testType AS testType'
            ])
            .where('conduct.therapist = :id', { id: therapistId })
            .orWhere('conduct.therapist is null');
        return query.getRawMany()
    }

    public save(conduct: Conduct): Promise<Conduct>{
        return Conduct.save(conduct);
    }
}