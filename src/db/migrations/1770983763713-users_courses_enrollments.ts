import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersCoursesEnrollments1770983763713
  implements MigrationInterface
{
  name = 'UsersCoursesEnrollments1770983763713';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."courses_subject_enum" AS ENUM('HTML', 'CSS', 'JS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "description" character varying(500) NOT NULL, "subject" "public"."courses_subject_enum" NOT NULL DEFAULT 'JS', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enrollments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid, "course_id" uuid, CONSTRAINT "PK_7c0f752f9fb68bf6ed7367ab00f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'STUDENT')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_experience_enum" AS ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_availability_enum" AS ENUM('LESS_THAN_30_MIN', '30_TO_60_MIN', '1_TO_2_HOURS', 'MORE_THAN_2_HOURS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying(255) NOT NULL, "birth_date" date, "role" "public"."users_role_enum" NOT NULL DEFAULT 'STUDENT', "experience" "public"."users_experience_enum", "availability" "public"."users_availability_enum", "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
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
      `ALTER TABLE "enrollments" ADD CONSTRAINT "FK_ff997f5a39cd24a491b9aca45c9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "FK_b79d0bf01779fdf9cfb6b092af3" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_requirements" ADD CONSTRAINT "FK_79e177c228dc322e05f26b9afed" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_requirements" ADD CONSTRAINT "FK_dc631628374624acb9ef1622010" FOREIGN KEY ("requirement_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
      `ALTER TABLE "enrollments" DROP CONSTRAINT "FK_b79d0bf01779fdf9cfb6b092af3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollments" DROP CONSTRAINT "FK_ff997f5a39cd24a491b9aca45c9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dc631628374624acb9ef162201"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_79e177c228dc322e05f26b9afe"`,
    );
    await queryRunner.query(`DROP TABLE "course_requirements"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_availability_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_experience_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "enrollments"`);
    await queryRunner.query(`DROP TABLE "courses"`);
    await queryRunner.query(`DROP TYPE "public"."courses_subject_enum"`);
  }
}
