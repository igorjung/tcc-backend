import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewFieldsToUsers1758200302883 implements MigrationInterface {
  name = 'AddNewFieldsToUsers1758200302883';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'STUDENT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'STUDENT'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_experience_enum" AS ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "experience" "public"."users_experience_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_availability_enum" AS ENUM('LESS_THAN_30_MIN', '30_TO_60_MIN', '1_TO_2_HOURS', 'MORE_THAN_2_HOURS')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "availability" "public"."users_availability_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birth_date"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "birth_date" date`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birth_date"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "birth_date" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "availability"`);
    await queryRunner.query(`DROP TYPE "public"."users_availability_enum"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "experience"`);
    await queryRunner.query(`DROP TYPE "public"."users_experience_enum"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
