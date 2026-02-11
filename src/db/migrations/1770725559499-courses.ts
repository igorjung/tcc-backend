import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseRequirements1770725559499 implements MigrationInterface {
  name = 'CourseRequirements1770725559499';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."courses_subject_enum" AS ENUM('HTML', 'CSS', 'JS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "description" character varying(500) NOT NULL, "subject" "public"."courses_subject_enum" NOT NULL DEFAULT 'JS', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_requirements" ("course_id" uuid NOT NULL, "requirement_id" uuid NOT NULL, CONSTRAINT "PK_6a01e2f457ca52c2a45d4914bc2" PRIMARY KEY ("course_id", "requirement_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_79e177c228dc322e05f26b9afe" ON "course_requirements" ("course_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc631628374624acb9ef162201" ON "course_requirements" ("requirement_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "course_requirements" ADD CONSTRAINT "FK_79e177c228dc322e05f26b9afed" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_requirements" ADD CONSTRAINT "FK_dc631628374624acb9ef1622010" FOREIGN KEY ("requirement_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_requirements" DROP CONSTRAINT "FK_dc631628374624acb9ef1622010"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_requirements" DROP CONSTRAINT "FK_79e177c228dc322e05f26b9afed"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dc631628374624acb9ef162201"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_79e177c228dc322e05f26b9afe"`,
    );
    await queryRunner.query(`DROP TABLE "course_requirements"`);
    await queryRunner.query(`DROP TABLE "courses"`);
    await queryRunner.query(`DROP TYPE "public"."courses_subject_enum"`);
  }
}
