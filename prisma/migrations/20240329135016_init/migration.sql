/*
  Warnings:

  - The primary key for the `PipelineNode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `PipelineNode` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `PipelineNode` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PipelineNode" (
    "pipelineId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "orderNo" INTEGER NOT NULL,

    PRIMARY KEY ("pipelineId", "userEmail"),
    CONSTRAINT "PipelineNode_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PipelineNode_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PipelineNode" ("orderNo", "pipelineId") SELECT "orderNo", "pipelineId" FROM "PipelineNode";
DROP TABLE "PipelineNode";
ALTER TABLE "new_PipelineNode" RENAME TO "PipelineNode";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
