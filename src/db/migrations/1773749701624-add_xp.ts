import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddXp1773749701624 implements MigrationInterface {
  name = 'AddXp1773749701624';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lessons" ADD "xp" double precision`);
    await queryRunner.query(`ALTER TABLE "users" ADD "xp" double precision`);
    await queryRunner.query(
      `ALTER TABLE "lesson_attempts" ADD CONSTRAINT "UQ_fdc73044106e1a442587642b2e6" UNIQUE ("enrollment_id", "lesson_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "UQ_647c6bda9ead37b702421710fde" UNIQUE ("user_id", "course_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enrollments" DROP CONSTRAINT "UQ_647c6bda9ead37b702421710fde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_attempts" DROP CONSTRAINT "UQ_fdc73044106e1a442587642b2e6"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "xp"`);
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "xp"`);
  }
}
