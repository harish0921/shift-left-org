import { MigrationInterface, QueryRunner } from 'typeorm'
import { hasColumn } from '../../../utils/database.util'

export class AddWorkspaceIdExecution1765361298677 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExists = await hasColumn(queryRunner, 'execution', 'workspaceId')
        if (!columnExists) {
            await queryRunner.query('ALTER TABLE "execution" ADD COLUMN "workspaceId" varchar;')
        }
    }

    public async down(): Promise<void> {}
}
