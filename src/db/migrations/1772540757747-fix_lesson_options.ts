import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixLessonOptions1772540757747 implements MigrationInterface {
  name = 'FixLessonOptions1772540757747';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lesson_options" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lesson_id" uuid NOT NULL, "content" character varying NOT NULL, "is_correct" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a9e9bfa3d35ba1eb9643a399f99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_options" ADD CONSTRAINT "FK_0bc7f24bb77f2dccce930d2fe98" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lesson_options" DROP CONSTRAINT "FK_0bc7f24bb77f2dccce930d2fe98"`,
    );
    await queryRunner.query(`DROP TABLE "lesson_options"`);
  }
}
