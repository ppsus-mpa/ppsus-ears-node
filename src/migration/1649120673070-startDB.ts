import { MigrationInterface, QueryRunner } from 'typeorm';

export class StartDB1649120673070 implements MigrationInterface {
    name = 'startDB1649120673070';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `email_secretaria` (`id_email` int NOT NULL AUTO_INCREMENT COMMENT \'Chave primaria de um email\', `email` varchar(255) ' +
            'NOT NULL COMMENT \'Endereço de email para contato\', `is_principal` tinyint NOT NULL COMMENT \'Marca o email principal da conta\' DEFAULT 0, `data_cadastro` ' +
            'datetime(6) NOT NULL COMMENT \'Data de cadastro do email\' DEFAULT CURRENT_TIMESTAMP(6), `data_desativado` datetime(6) NULL COMMENT \'Coluna usada para o Soft ' +
            'Delete, caso tenha um valor, o email foi inativado nessa data\', `fk_usuario` int NOT NULL COMMENT \'Chave primária de um usuário. é única apenas dentro de uma ' +
            'tabela.\', UNIQUE INDEX `IDX_7be91b49157d8838ca8a0bd0ac` (`email`), PRIMARY KEY (`id_email`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `usuario_secretaria` (`id_usuario` int NOT NULL AUTO_INCREMENT COMMENT \'Chave primária de um usuário. é única apenas dentro de ' +
            'uma tabela.\', `password` varchar(255) NOT NULL, `data_cadastro` datetime(6) NOT NULL COMMENT \'Data de cadastro do usuário\' DEFAULT CURRENT_TIMESTAMP(6), ' +
            '`data_desativado` datetime(6) NULL COMMENT \'Coluna usada para o Soft Delete, caso tenha um valor, o usuário foi inativado nessa data\', `fk_secretaria_estado` ' +
            'int NULL, `fk_secretaria_regiao` int NULL, PRIMARY KEY (`id_usuario`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `estado` (`id_estado` int NOT NULL AUTO_INCREMENT, `codigo_ibge` int NOT NULL, `nome` varchar(20) NOT NULL, `uf` varchar(2) ' +
            'NOT NULL, `secretaria_nome` varchar(255) NULL COMMENT \'Rua em que se encontra esse endereço\', `secretaria_emails` text NULL COMMENT \'Endereços de email para ' +
            'contato\', UNIQUE INDEX `IDX_002b78d13edfb2d040f9b4eced` (`codigo_ibge`), UNIQUE INDEX `IDX_002b78d13edfb2d040f9b4ecee` (`uf`), PRIMARY KEY (`id_estado`)) ' +
            'ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `regiao` (`id_regiao` int NOT NULL AUTO_INCREMENT, `data_cadastro` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), ' +
            '`data_desativado` datetime(6) NULL, `fk_estado` int NOT NULL, `secretaria_nome` varchar(255) NULL COMMENT \'Rua em que se encontra esse endereço\', ' +
            '`secretaria_emails` text NULL COMMENT \'Endereços de email para contato\', PRIMARY KEY (`id_regiao`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `municipio` (`id_municipio` int NOT NULL AUTO_INCREMENT, `nome` varchar(20) NOT NULL, `data_cadastro` datetime(6) NOT NULL COMMENT ' +
            '\'Data de cadastro do município\' DEFAULT CURRENT_TIMESTAMP(6), `fk_regiao` int NULL, PRIMARY KEY (`id_municipio`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `email_responsavel` (`id_email` int NOT NULL AUTO_INCREMENT COMMENT \'Chave primaria de um email\', `email` varchar(255) NOT NULL ' +
            'COMMENT \'Endereço de email para contato\', `is_principal` tinyint NOT NULL COMMENT \'Marca o email principal da conta\' DEFAULT 0, `data_cadastro` datetime(6) NOT NULL ' +
            'COMMENT \'Data de cadastro do email\' DEFAULT CURRENT_TIMESTAMP(6), `data_desativado` datetime(6) NULL COMMENT \'Coluna usada para o Soft Delete, caso tenha um valor, o ' +
            'email foi inativado nessa data\', `fk_responsavel` int NOT NULL COMMENT \'Chave primária de um usuário. é única apenas dentro de uma tabela.\', UNIQUE INDEX ' +
            '`IDX_34f1e858a86d2a2397ccb7af9b` (`email`), PRIMARY KEY (`id_email`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `tel_responsavel` (`id_tel` int NOT NULL AUTO_INCREMENT COMMENT \'Chave primaria de um telefone\', `numero` varchar(13) NOT NULL ' +
            'COMMENT \'Número do telefone, DDD + número\', `nome_contato` varchar(45) NULL COMMENT \'Nome do contato do número telefonico\', `is_whatsapp` tinyint NOT NULL ' +
            'COMMENT \'Diz se o número tem uma conta no whatsapp\' DEFAULT 0, `is_principal` tinyint NOT NULL COMMENT \'Marca o telefone principal da conta\' DEFAULT 0, ' +
            '`data_cadastro` datetime(6) NOT NULL COMMENT \'Data de cadastro do telefone\' DEFAULT CURRENT_TIMESTAMP(6), `data_desativado` datetime(6) NULL COMMENT \'Coluna ' +
            'usada para o Soft Delete, caso tenha um valor, o telefone foi inativado nessa data\', `fk_responsavel` int NOT NULL COMMENT \'Chave primária de um usuário. é única ' +
            'apenas dentro de uma tabela.\', PRIMARY KEY (`id_tel`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `responsavel` (`id_usuario` int NOT NULL AUTO_INCREMENT COMMENT \'Chave primária de um usuário. é única apenas dentro de uma ' +
            'tabela.\', `password` varchar(255) NOT NULL, `data_cadastro` datetime(6) NOT NULL COMMENT \'Data de cadastro do usuário\' DEFAULT CURRENT_TIMESTAMP(6), ' +
            '`data_desativado` datetime(6) NULL COMMENT \'Coluna usada para o Soft Delete, caso tenha um valor, o usuário foi inativado nessa data\', `data_nascimento` ' +
            'date NOT NULL COMMENT \'Data de nascimento do responsável (para cálculo de idade e afins)\', `cpf` varchar(11) NOT NULL COMMENT \'CPF do responsável\', `fk_municipio`' +
            ' int NOT NULL, `rua` varchar(255) NOT NULL COMMENT \'Rua em que se encontra esse endereço\', `numero` int NOT NULL COMMENT \'Numero do estabelecimento\', `complemento`' +
            ' varchar(255) NULL COMMENT \'Complemento para o endereço\', `CEP` varchar(8) NOT NULL COMMENT \'CEP do endereço\', UNIQUE INDEX `IDX_eb83e23f5d564d476d25858172` ' +
            '(`cpf`), PRIMARY KEY (`id_usuario`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `bebe` (`id_bebe` int NOT NULL AUTO_INCREMENT COMMENT \'Chave primária do bebê\', `peso` float NOT NULL COMMENT \'Peso do bebê\', ' +
            '`altura` float NOT NULL COMMENT \'Altura do bebê\', `circumferencia` float NOT NULL COMMENT \'Circunferência da cabeça do bebê\', `data_nascimento` datetime NOT NULL ' +
            'COMMENT \'Data de nascimento do responsável (para cálculo de idade e afins)\', `idade_gestacional` int NOT NULL COMMENT \'Tempo de duração da gestação do bebê marcado ' +
            'em semanas\', `tipo_parto` enum (\'Parto Cirúrgico (Cesárea)\', \'Parto Vaginal Natural\', \'Parto Vaginal com Extrator a vácuo\', \'Parto Vaginal com Fórceps\', \'Parto' +
            ' na água\') NOT NULL COMMENT \'Tipo do parto do bebê\', `obito_materno` tinyint NOT NULL COMMENT \'Chave primária do responsável\', `data_cadastro` datetime(6) NOT NULL ' +
            'COMMENT \'Data de cadastro do bebê\' DEFAULT CURRENT_TIMESTAMP(6), `data_desativado` datetime(6) NULL COMMENT \'Coluna usada para o Soft Delete, caso tenha um valor, o ' +
            'serviço de referencia foi inativado nessa data\', `fk_mae_bio` int NOT NULL COMMENT \'Chave primária de um usuário. é única apenas dentro de uma tabela.\', UNIQUE INDEX ' +
            '`REL_05c2dbd5574e98c267b3b80645` (`fk_mae_bio`), PRIMARY KEY (`id_bebe`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `instituicao` (`id_instituicao` int NOT NULL AUTO_INCREMENT COMMENT \'Chave primária da instituição\', `nome_fantasia` varchar(255)' +
            ' NOT NULL COMMENT \'Nome Fantasia (Comercial) da instituição\', `razao_social` varchar(255) NOT NULL COMMENT \'Razão Social da instituição\', `is_maternidade` tinyint ' +
            'NOT NULL COMMENT \'Define se a instituição é ou não uma maternidade\', `fk_municipio` int NOT NULL, `rua` varchar(255) NOT NULL COMMENT \'Rua em que se encontra esse ' +
            'endereço\', `numero` int NOT NULL COMMENT \'Numero do estabelecimento\', `complemento` varchar(255) NULL COMMENT \'Complemento para o endereço\', `CEP` varchar(8) NOT ' +
            'NULL COMMENT \'CEP do endereço\', PRIMARY KEY (`id_instituicao`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `email_servico_referencia` (`id_email` int NOT NULL AUTO_INCREMENT COMMENT \'Chave primaria de um email\', `email` varchar(255) NOT ' +
            'NULL COMMENT \'Endereço de email para contato\', `is_principal` tinyint NOT NULL COMMENT \'Marca o email principal da conta\' DEFAULT 0, `data_cadastro` datetime(6) ' +
            'NOT NULL COMMENT \'Data de cadastro do email\' DEFAULT CURRENT_TIMESTAMP(6), `data_desativado` datetime(6) NULL COMMENT \'Coluna usada para o Soft Delete, caso tenha ' +
            'um valor, o email foi inativado nessa data\', `fk_servico` int NOT NULL COMMENT \'Chave primária do servico de referencia\', UNIQUE INDEX ' +
            '`IDX_41663cddfe8b58a6356d719ccd` (`email`), PRIMARY KEY (`id_email`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `tel_servico_referencia` (`id_tel` int NOT NULL AUTO_INCREMENT COMMENT \'Chave primaria de um telefone\', `numero` varchar(13) NOT ' +
            'NULL COMMENT \'Número do telefone, DDD + número\', `nome_contato` varchar(45) NULL COMMENT \'Nome do contato do número telefonico\', `is_whatsapp` tinyint NOT NULL ' +
            'COMMENT \'Diz se o número tem uma conta no whatsapp\' DEFAULT 0, `is_principal` tinyint NOT NULL COMMENT \'Marca o telefone principal da conta\' DEFAULT 0, ' +
            '`data_cadastro` datetime(6) NOT NULL COMMENT \'Data de cadastro do telefone\' DEFAULT CURRENT_TIMESTAMP(6), `data_desativado` datetime(6) NULL COMMENT \'Coluna usada' +
            ' para o Soft Delete, caso tenha um valor, o telefone foi inativado nessa data\', `fk_servico` int NOT NULL COMMENT \'Chave primária do servico de referencia\', ' +
            'PRIMARY KEY (`id_tel`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `servico_referencia` (`id_servico` int NOT NULL AUTO_INCREMENT COMMENT \'Chave primária do servico de referencia\', `nome_fantasia`' +
            ' varchar(255) NOT NULL COMMENT \'Nome fantasia do endereço de referencia\', `razao_social` varchar(255) NULL COMMENT \'Razão social do endereço de referencia\', `cnpj`' +
            ' varchar(13) NULL COMMENT \'CNPJ do servico de referencia\', `cnes` varchar(7) NULL, `is_sus` tinyint NOT NULL COMMENT \'Se o serviço de referencia é referente ao SUS ' +
            'Privado\' DEFAULT 0, `data_cadastro` datetime(6) NOT NULL COMMENT \'Data de cadastro do serviço de referencia\' DEFAULT CURRENT_TIMESTAMP(6), `data_desativado` ' +
            'datetime(6) NULL COMMENT \'Coluna usada para o Soft Delete, caso tenha um valor, o serviço de referencia foi inativado nessa data\', `fk_municipio` int NOT NULL, `rua`' +
            ' varchar(255) NOT NULL COMMENT \'Rua em que se encontra esse endereço\', `numero` int NOT NULL COMMENT \'Numero do estabelecimento\', `complemento` varchar(255) NULL ' +
            'COMMENT \'Complemento para o endereço\', `CEP` varchar(8) NOT NULL COMMENT \'CEP do endereço\', PRIMARY KEY (`id_servico`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `bebe_responsavel` (`fk_bebe` int NOT NULL, `fk_responsavel` int NOT NULL, INDEX `IDX_7a4e62e4f8e13c282c3e2c9c37` (`fk_bebe`), INDEX' +
            ' `IDX_9e1792f437507f6e3e44a2c142` (`fk_responsavel`), PRIMARY KEY (`fk_bebe`, `fk_responsavel`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `email_secretaria` ADD CONSTRAINT `FK_7fce7ce9ab351d900273f01dae5` FOREIGN KEY (`fk_usuario`) REFERENCES `usuario_secretaria`' +
            '(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `usuario_secretaria` ADD CONSTRAINT `FK_eda65607580b1c279c6cd43f7b4` FOREIGN KEY (`fk_secretaria_estado`) REFERENCES `estado`' +
            '(`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `usuario_secretaria` ADD CONSTRAINT `FK_52b786b3619332df99cb60cf8ef` FOREIGN KEY (`fk_secretaria_regiao`) REFERENCES `regiao`' +
            '(`id_regiao`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `regiao` ADD CONSTRAINT `FK_eda3deae3e311892ea17a144cd8` FOREIGN KEY (`fk_estado`) REFERENCES `estado`(`id_estado`) ON DELETE NO ACTION' +
            ' ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `municipio` ADD CONSTRAINT `FK_fea5bb63901e034be0275ee274a` FOREIGN KEY (`fk_regiao`) REFERENCES `regiao`(`id_regiao`) ON DELETE NO ' +
            'ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `email_responsavel` ADD CONSTRAINT `FK_44688b0e148ecf48ec20b3088f8` FOREIGN KEY (`fk_responsavel`) REFERENCES `responsavel`' +
            '(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `tel_responsavel` ADD CONSTRAINT `FK_4fcfd91762f182b28fb02eccf8c` FOREIGN KEY (`fk_responsavel`) REFERENCES `responsavel`(`id_usuario`)' +
            ' ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `responsavel` ADD CONSTRAINT `FK_f4bc3143258b4fb476c8d29dc77` FOREIGN KEY (`fk_municipio`) REFERENCES `municipio`(`id_municipio`) ON ' +
            'DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `bebe` ADD CONSTRAINT `FK_05c2dbd5574e98c267b3b80645c` FOREIGN KEY (`fk_mae_bio`) REFERENCES `responsavel`(`id_usuario`) ON DELETE NO ' +
            'ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `instituicao` ADD CONSTRAINT `FK_39217a93fde8a514cdc2509fdb2` FOREIGN KEY (`fk_municipio`) REFERENCES `municipio`(`id_municipio`) ON ' +
            'DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `email_servico_referencia` ADD CONSTRAINT `FK_315b71d40067a1be8d8fedf4369` FOREIGN KEY (`fk_servico`) REFERENCES `servico_referencia`' +
            '(`id_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `tel_servico_referencia` ADD CONSTRAINT `FK_b813f5f461c807672b102ac7dd9` FOREIGN KEY (`fk_servico`) REFERENCES `servico_referencia`' +
            '(`id_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `servico_referencia` ADD CONSTRAINT `FK_b64e7693a00951e8c517cc7fcf8` FOREIGN KEY (`fk_municipio`) REFERENCES `municipio`(`id_municipio`)' +
            ' ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `bebe_responsavel` ADD CONSTRAINT `FK_7a4e62e4f8e13c282c3e2c9c37c` FOREIGN KEY (`fk_bebe`) REFERENCES `bebe`(`id_bebe`) ON DELETE CASCADE' +
            ' ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE `bebe_responsavel` ADD CONSTRAINT `FK_9e1792f437507f6e3e44a2c1428` FOREIGN KEY (`fk_responsavel`) REFERENCES `responsavel`(`id_usuario`) ' +
            'ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `bebe_responsavel` DROP FOREIGN KEY `FK_9e1792f437507f6e3e44a2c1428`');
        await queryRunner.query('ALTER TABLE `bebe_responsavel` DROP FOREIGN KEY `FK_7a4e62e4f8e13c282c3e2c9c37c`');
        await queryRunner.query('ALTER TABLE `servico_referencia` DROP FOREIGN KEY `FK_b64e7693a00951e8c517cc7fcf8`');
        await queryRunner.query('ALTER TABLE `tel_servico_referencia` DROP FOREIGN KEY `FK_b813f5f461c807672b102ac7dd9`');
        await queryRunner.query('ALTER TABLE `email_servico_referencia` DROP FOREIGN KEY `FK_315b71d40067a1be8d8fedf4369`');
        await queryRunner.query('ALTER TABLE `instituicao` DROP FOREIGN KEY `FK_39217a93fde8a514cdc2509fdb2`');
        await queryRunner.query('ALTER TABLE `bebe` DROP FOREIGN KEY `FK_05c2dbd5574e98c267b3b80645c`');
        await queryRunner.query('ALTER TABLE `responsavel` DROP FOREIGN KEY `FK_f4bc3143258b4fb476c8d29dc77`');
        await queryRunner.query('ALTER TABLE `tel_responsavel` DROP FOREIGN KEY `FK_4fcfd91762f182b28fb02eccf8c`');
        await queryRunner.query('ALTER TABLE `email_responsavel` DROP FOREIGN KEY `FK_44688b0e148ecf48ec20b3088f8`');
        await queryRunner.query('ALTER TABLE `municipio` DROP FOREIGN KEY `FK_fea5bb63901e034be0275ee274a`');
        await queryRunner.query('ALTER TABLE `regiao` DROP FOREIGN KEY `FK_eda3deae3e311892ea17a144cd8`');
        await queryRunner.query('ALTER TABLE `usuario_secretaria` DROP FOREIGN KEY `FK_52b786b3619332df99cb60cf8ef`');
        await queryRunner.query('ALTER TABLE `usuario_secretaria` DROP FOREIGN KEY `FK_eda65607580b1c279c6cd43f7b4`');
        await queryRunner.query('ALTER TABLE `email_secretaria` DROP FOREIGN KEY `FK_7fce7ce9ab351d900273f01dae5`');
        await queryRunner.query('ALTER TABLE `municipio` DROP COLUMN `nome`');
        await queryRunner.query('ALTER TABLE `regiao` DROP COLUMN `secretaria_emails`');
        await queryRunner.query('ALTER TABLE `regiao` DROP COLUMN `secretaria_nome`');
        await queryRunner.query('ALTER TABLE `estado` DROP COLUMN `secretaria_emails`');
        await queryRunner.query('ALTER TABLE `estado` DROP COLUMN `secretaria_nome`');
        await queryRunner.query('DROP INDEX `IDX_9e1792f437507f6e3e44a2c142` ON `bebe_responsavel`');
        await queryRunner.query('DROP INDEX `IDX_7a4e62e4f8e13c282c3e2c9c37` ON `bebe_responsavel`');
        await queryRunner.query('DROP TABLE `bebe_responsavel`');
        await queryRunner.query('DROP TABLE `servico_referencia`');
        await queryRunner.query('DROP TABLE `tel_servico_referencia`');
        await queryRunner.query('DROP INDEX `IDX_41663cddfe8b58a6356d719ccd` ON `email_servico_referencia`');
        await queryRunner.query('DROP TABLE `email_servico_referencia`');
        await queryRunner.query('DROP TABLE `instituicao`');
        await queryRunner.query('DROP INDEX `REL_05c2dbd5574e98c267b3b80645` ON `bebe`');
        await queryRunner.query('DROP TABLE `bebe`');
        await queryRunner.query('DROP INDEX `IDX_eb83e23f5d564d476d25858172` ON `responsavel`');
        await queryRunner.query('DROP TABLE `responsavel`');
        await queryRunner.query('DROP TABLE `tel_responsavel`');
        await queryRunner.query('DROP INDEX `IDX_34f1e858a86d2a2397ccb7af9b` ON `email_responsavel`');
        await queryRunner.query('DROP TABLE `email_responsavel`');
        await queryRunner.query('DROP TABLE `municipio`');
        await queryRunner.query('DROP TABLE `regiao`');
        await queryRunner.query('DROP INDEX `IDX_002b78d13edfb2d040f9b4ecee` ON `estado`');
        await queryRunner.query('DROP INDEX `IDX_002b78d13edfb2d040f9b4eced` ON `estado`');
        await queryRunner.query('DROP TABLE `estado`');
        await queryRunner.query('DROP TABLE `usuario_secretaria`');
        await queryRunner.query('DROP INDEX `IDX_7be91b49157d8838ca8a0bd0ac` ON `email_secretaria`');
        await queryRunner.query('DROP TABLE `email_secretaria`');
    }

}
