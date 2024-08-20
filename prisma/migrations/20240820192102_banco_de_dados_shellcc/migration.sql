/*
  Warnings:

  - You are about to alter the column `porcentagemDesvalorizacao` on the `patrimonios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `patrimonios` MODIFY `porcentagemDesvalorizacao` INTEGER NOT NULL;
