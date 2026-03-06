import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateLessonOption1772537126851 implements MigrationInterface {
  name = 'UpdateLessonOption1772537126851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lessons" DROP CONSTRAINT "FK_26c5e43eccd34ea6ab760fd0636"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" DROP CONSTRAINT "REL_26c5e43eccd34ea6ab760fd063"`,
    );
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "answer_id"`);
    await queryRunner.query(
      `ALTER TABLE "lesson-options" ADD "isCorrect" boolean`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lesson-options" DROP COLUMN "isCorrect"`,
    );
    await queryRunner.query(`ALTER TABLE "lessons" ADD "answer_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "REL_26c5e43eccd34ea6ab760fd063" UNIQUE ("answer_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "FK_26c5e43eccd34ea6ab760fd0636" FOREIGN KEY ("answer_id") REFERENCES "lesson-options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
