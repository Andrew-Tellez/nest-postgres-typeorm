import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnRoleToUsers1726439350451 implements MigrationInterface {
  name = 'AddColumnRoleToUsers1726439350451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
  }
}
