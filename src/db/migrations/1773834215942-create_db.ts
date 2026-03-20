import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDb1773834215942 implements MigrationInterface {
  name = 'CreateDb1773834215942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lesson_options" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lesson_id" uuid NOT NULL, "content" character varying NOT NULL, "is_correct" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a9e9bfa3d35ba1eb9643a399f99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_attempts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "enrollment_id" uuid NOT NULL, "lesson_id" uuid NOT NULL, "lesson_option_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_fdc73044106e1a442587642b2e6" UNIQUE ("enrollment_id", "lesson_id"), CONSTRAINT "REL_4d39ad28743d68a3dca73773cd" UNIQUE ("lesson_option_id"), CONSTRAINT "PK_f77f6a55976c55b6639d7136578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lessons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "course_id" uuid NOT NULL, "title" character varying(100) NOT NULL, "description" character varying(500) NOT NULL, "content" character varying NOT NULL, "question" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "xp" double precision, CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."courses_subject_enum" AS ENUM('HTML', 'CSS', 'JS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "description" character varying(500) NOT NULL, "subject" "public"."courses_subject_enum" NOT NULL DEFAULT 'JS', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enrollments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "course_id" uuid NOT NULL, "grade" double precision, "is_completed" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_647c6bda9ead37b702421710fde" UNIQUE ("user_id", "course_id"), CONSTRAINT "PK_7c0f752f9fb68bf6ed7367ab00f" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying(255) NOT NULL, "birth_date" date, "role" "public"."users_role_enum" NOT NULL DEFAULT 'STUDENT', "experience" "public"."users_experience_enum", "availability" "public"."users_availability_enum", "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "xp" double precision, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
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
      `ALTER TABLE "lesson_options" ADD CONSTRAINT "FK_0bc7f24bb77f2dccce930d2fe98" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "FK_3c4e299cf8ed04093935e2e22fe" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
      `ALTER TABLE "lessons" DROP CONSTRAINT "FK_3c4e299cf8ed04093935e2e22fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_attempts" DROP CONSTRAINT "FK_4d39ad28743d68a3dca73773cd3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_attempts" DROP CONSTRAINT "FK_1c23b47d5ea764a62d6f61bad7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_attempts" DROP CONSTRAINT "FK_ad5061c90c8adbda3a21615aa57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_options" DROP CONSTRAINT "FK_0bc7f24bb77f2dccce930d2fe98"`,
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
    await queryRunner.query(`DROP TABLE "lessons"`);
    await queryRunner.query(`DROP TABLE "lesson_attempts"`);
    await queryRunner.query(`DROP TABLE "lesson_options"`);
  }
}
