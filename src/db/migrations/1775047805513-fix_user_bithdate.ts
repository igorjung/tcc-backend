import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUserBithdate1775047805513 implements MigrationInterface {
  name = 'FixUserBithdate1775047805513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birth_date"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "birth_date" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birth_date"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "birth_date" date`);
  }
}
