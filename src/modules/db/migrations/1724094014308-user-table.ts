import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1724094014308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
                                CREATE TABLE "user" (
                                    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                                    "username" varchar(256) NOT NULL,
                                    "password_hash" varchar(256) NOT NULL,
                                    "email" varchar(256) NOT NULL,
                                    "is_verified" boolean NOT NULL DEFAULT false,
                                    "verification_code" varchar(256) NOT NULL,
                                    "verification_code_expires" timestamp NOT NULL,
                                    CONSTRAINT "user_pk_id" PRIMARY KEY ("id"),
                                    CONSTRAINT "user_uk_username" UNIQUE ("username")
                                );
                            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user;`);
  }
}
