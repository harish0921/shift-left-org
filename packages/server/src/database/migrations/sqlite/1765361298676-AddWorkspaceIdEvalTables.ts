import { MigrationInterface, QueryRunner } from 'typeorm'
import { hasColumn } from '../../../utils/database.util'

export class AddWorkspaceIdEvalTables1765361298676 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tables = ['evaluation', 'dataset', 'evaluator']

        for (const tableName of tables) {
            const columnExists = await hasColumn(queryRunner, tableName, 'workspaceId')
            if (!columnExists) {
                await queryRunner.query(`ALTER TABLE "${tableName}" ADD COLUMN "workspaceId" varchar;`)
            }
        }
    }

    public async down(): Promise<void> {}
}
