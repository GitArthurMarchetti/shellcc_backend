/*
  Warnings:

  - The primary key for the `categoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_categoria` on the `categoria` table. All the data in the column will be lost.
  - The required column `id` was added to the `categoria` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `patrimonios` DROP FOREIGN KEY `patrimonios_id_fkey`;

-- AlterTable
ALTER TABLE `categoria` DROP PRIMARY KEY,
    DROP COLUMN `id_categoria`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `patrimonios` ADD CONSTRAINT `patrimonios_id_fkey` FOREIGN KEY (`id`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
