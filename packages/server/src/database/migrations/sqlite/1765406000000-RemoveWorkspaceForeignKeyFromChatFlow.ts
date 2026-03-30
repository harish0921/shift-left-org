import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveWorkspaceForeignKeyFromChatFlow1765406000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const foreignKeys = await queryRunner.query(`PRAGMA foreign_key_list("chat_flow");`)
        const hasWorkspaceForeignKey = foreignKeys.some((fk: any) => fk.table === 'workspace' && fk.from === 'workspaceId')

        if (!hasWorkspaceForeignKey) {
            return
        }

        await queryRunner.query(`
            CREATE TABLE "chat_flow_temp" (
                "id" varchar PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "flowData" text NOT NULL,
                "deployed" boolean,
                "isPublic" boolean,
                "apikeyid" varchar,
                "chatbotConfig" text,
                "createdDate" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedDate" datetime NOT NULL DEFAULT (datetime('now')),
                "apiConfig" TEXT,
                "analytic" TEXT,
                "category" TEXT,
                "speechToText" TEXT,
                "type" VARCHAR(20) NOT NULL DEFAULT 'CHATFLOW',
                "workspaceId" TEXT,
                "followUpPrompts" TEXT,
                "textToSpeech" TEXT
            );
        `)

        await queryRunner.query(`
            INSERT INTO "chat_flow_temp"
            ("id", "name", "flowData", "deployed", "isPublic", "apikeyid", "chatbotConfig", "createdDate", "updatedDate", "apiConfig", "analytic", "category", "speechToText", "type", "workspaceId", "followUpPrompts", "textToSpeech")
            SELECT "id", "name", "flowData", "deployed", "isPublic", "apikeyid", "chatbotConfig", "createdDate", "updatedDate", "apiConfig", "analytic", "category", "speechToText", "type", "workspaceId", "followUpPrompts", "textToSpeech"
            FROM "chat_flow";
        `)

        await queryRunner.query(`DROP TABLE "chat_flow";`)
        await queryRunner.query(`ALTER TABLE "chat_flow_temp" RENAME TO "chat_flow";`)
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_CHAT_FLOW_NAME" ON "chat_flow" ("name");`)
    }

    public async down(_: QueryRunner): Promise<void> {}
}
