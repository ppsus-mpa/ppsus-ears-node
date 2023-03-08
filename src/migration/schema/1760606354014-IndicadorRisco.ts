import { MigrationInterface, QueryRunner } from 'typeorm';

export class IndicadorRisco1760606354014 implements MigrationInterface {
    name = 'IndicadorRisco1760606354014';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`indicador_risco\` (
                \`id_indicador_risco\` int NOT NULL AUTO_INCREMENT, 
                \`nome\` varchar(255) NOT NULL COMMENT 'Nome do indicador de risco', 
            PRIMARY KEY (\`id_indicador_risco\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `indicador_risco`');
    }
}
