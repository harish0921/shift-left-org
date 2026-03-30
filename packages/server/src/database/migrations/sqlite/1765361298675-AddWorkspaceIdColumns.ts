import { MigrationInterface, QueryRunner } from 'typeorm'
import { hasColumn } from '../../../utils/database.util'

export class AddWorkspaceIdColumns1765361298675 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tables = ['apikey', 'tool', 'credential', 'variable']

        for (const tableName of tables) {
            const columnExists = await hasColumn(queryRunner, tableName, 'workspaceId')
            if (!columnExists) {
                await queryRunner.query(`ALTER TABLE "${tableName}" ADD COLUMN "workspaceId" varchar;`)
            }
        }
    }

    public async down(): Promise<void> {}
}
