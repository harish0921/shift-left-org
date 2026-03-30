import { MigrationInterface, QueryRunner } from 'typeorm'
import { hasColumn } from '../../../utils/database.util'

export class AddWorkspaceIdDocumentStore1765407000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExists = await hasColumn(queryRunner, 'document_store', 'workspaceId')
        if (!columnExists) {
            await queryRunner.query('ALTER TABLE "document_store" ADD COLUMN "workspaceId" varchar;')
        }
    }

    public async down(): Promise<void> {}
}
