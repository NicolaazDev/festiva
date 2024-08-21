import { MigrationInterface, QueryRunner } from 'typeorm';

export class PasswordResetMigration1683154682565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "password_reset" (
        "id" SERIAL PRIMARY KEY,
        "user_id" UUID REFERENCES "user"(id) ON DELETE CASCADE,
        "reset_token" VARCHAR(255) NOT NULL UNIQUE,
        "expires_at" TIMESTAMPTZ NOT NULL,
        "created_at" TIMESTAMPTZ DEFAULT NOW()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "password_reset";`);
  }
}
