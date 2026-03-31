import { MigrationInterface, QueryRunner } from "typeorm";

export class FixLessonAttempt1774610406155 implements MigrationInterface {
    name = 'FixLessonAttempt1774610406155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_attempts" DROP CONSTRAINT "FK_4d39ad28743d68a3dca73773cd3"`);
        await queryRunner.query(`ALTER TABLE "lesson_attempts" DROP CONSTRAINT "REL_4d39ad28743d68a3dca73773cd"`);
        await queryRunner.query(`ALTER TABLE "lesson_attempts" ADD CONSTRAINT "FK_4d39ad28743d68a3dca73773cd3" FOREIGN KEY ("lesson_option_id") REFERENCES "lesson_options"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_attempts" DROP CONSTRAINT "FK_4d39ad28743d68a3dca73773cd3"`);
        await queryRunner.query(`ALTER TABLE "lesson_attempts" ADD CONSTRAINT "REL_4d39ad28743d68a3dca73773cd" UNIQUE ("lesson_option_id")`);
        await queryRunner.query(`ALTER TABLE "lesson_attempts" ADD CONSTRAINT "FK_4d39ad28743d68a3dca73773cd3" FOREIGN KEY ("lesson_option_id") REFERENCES "lesson_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
