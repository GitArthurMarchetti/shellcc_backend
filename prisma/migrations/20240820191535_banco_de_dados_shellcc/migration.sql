/*
  Warnings:

  - You are about to drop the column `desvalorizacao` on the `categoria` table. All the data in the column will be lost.
  - Added the required column `TipoCategoria` to the `categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `porcentagemDesvalorizacao` to the `patrimonios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `user_salas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoria` DROP COLUMN `desvalorizacao`,
    ADD COLUMN `TipoCategoria` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `patrimonios` ADD COLUMN `porcentagemDesvalorizacao` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_salas` ADD COLUMN `role` VARCHAR(191) NOT NULL;
