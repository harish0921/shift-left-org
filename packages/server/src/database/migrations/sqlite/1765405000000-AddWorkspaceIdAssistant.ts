import { MigrationInterface, QueryRunner } from 'typeorm'
import { hasColumn } from '../../../utils/database.util'

export class AddWorkspaceIdAssistant1765405000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExists = await hasColumn(queryRunner, 'assistant', 'workspaceId')
        if (!columnExists) {
            await queryRunner.query(`ALTER TABLE "assistant" ADD COLUMN "workspaceId" varchar;`)
        }
    }

    public async down(): Promise<void> {}
}
