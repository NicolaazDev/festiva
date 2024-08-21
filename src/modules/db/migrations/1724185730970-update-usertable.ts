import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTimestampsAndLastLogin1683154682562
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD COLUMN "created_at" TIMESTAMPTZ DEFAULT NOW(),
      ADD COLUMN "updated_at" TIMESTAMPTZ DEFAULT NOW(),
      ADD COLUMN "last_login" TIMESTAMPTZ;
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_modified_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER update_user_modtime
      BEFORE UPDATE ON "user"
      FOR EACH ROW
      EXECUTE FUNCTION update_modified_column();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      DROP COLUMN "created_at",
      DROP COLUMN "updated_at",
      DROP COLUMN "last_login";
    `);

    await queryRunner.query(`
      DROP TRIGGER IF EXISTS update_user_modtime ON "user";
      DROP FUNCTION IF EXISTS update_modified_column;
    `);
  }
}
