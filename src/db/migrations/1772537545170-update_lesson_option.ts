import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateLessonOption1772537545170 implements MigrationInterface {
  name = 'UpdateLessonOption1772537545170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lesson-options" RENAME COLUMN "isCorrect" TO "is_correct"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lesson-options" RENAME COLUMN "is_correct" TO "isCorrect"`,
    );
  }
}
