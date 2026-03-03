import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateLesson1772535544610 implements MigrationInterface {
  name = 'UpdateLesson1772535544610';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lessons" DROP CONSTRAINT "FK_26c5e43eccd34ea6ab760fd0636"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" ALTER COLUMN "answer_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "FK_26c5e43eccd34ea6ab760fd0636" FOREIGN KEY ("answer_id") REFERENCES "lesson-options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lessons" DROP CONSTRAINT "FK_26c5e43eccd34ea6ab760fd0636"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" ALTER COLUMN "answer_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "FK_26c5e43eccd34ea6ab760fd0636" FOREIGN KEY ("answer_id") REFERENCES "lesson-options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
