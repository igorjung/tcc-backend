import { MigrationInterface, QueryRunner } from 'typeorm';

export class LessonAttempts1772626604416 implements MigrationInterface {
  name = 'LessonAttempts1772626604416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lesson_attempts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "enrollment_id" uuid NOT NULL, "lesson_id" uuid NOT NULL, "lesson_option_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "REL_4d39ad28743d68a3dca73773cd" UNIQUE ("lesson_option_id"), CONSTRAINT "PK_f77f6a55976c55b6639d7136578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_attempts" ADD CONSTRAINT "FK_ad5061c90c8adbda3a21615aa57" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_attempts" ADD CONSTRAINT "FK_1c23b47d5ea764a62d6f61bad7d" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_attempts" ADD CONSTRAINT "FK_4d39ad28743d68a3dca73773cd3" FOREIGN KEY ("lesson_option_id") REFERENCES "lesson_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lesson_attempts" DROP CONSTRAINT "FK_4d39ad28743d68a3dca73773cd3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_attempts" DROP CONSTRAINT "FK_1c23b47d5ea764a62d6f61bad7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_attempts" DROP CONSTRAINT "FK_ad5061c90c8adbda3a21615aa57"`,
    );
    await queryRunner.query(`DROP TABLE "lesson_attempts"`);
  }
}
