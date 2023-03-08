import { MigrationInterface, QueryRunner } from 'typeorm';

export class TelServicoReferencia1760606354024 implements MigrationInterface {
    name = 'TelServicoReferencia1760606354024';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tel_servico_referencia\` (
                \`id_tel\` int NOT NULL AUTO_INCREMENT COMMENT 'Chave primaria de um telefone',
                \`numero\` varchar(13) NOT NULL COMMENT 'Número do telefone, DDD + número',
                \`nome_contato\` varchar(45) NULL COMMENT 'Nome do contato do número telefonico',
                \`is_whatsapp\` tinyint NOT NULL COMMENT 'Diz se o número tem uma conta no whatsapp' DEFAULT 0,
                \`is_principal\` tinyint NOT NULL COMMENT 'Marca o telefone principal da conta' DEFAULT 0,
                \`data_cadastro\` datetime(6) NOT NULL COMMENT 'Data de cadastro do telefone' DEFAULT CURRENT_TIMESTAMP(6),
                \`data_desativado\` datetime(6) NULL COMMENT 'Coluna usada para o Soft Delete, caso tenha um valor, o telefone foi inativado nessa data',
                \`fk_servico\` int NOT NULL COMMENT 'Chave primária do servico de referencia', 
            PRIMARY KEY (\`id_tel\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `tel_servico_referencia`');
    }
}