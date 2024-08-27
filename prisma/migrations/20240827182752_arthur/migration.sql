/*
  Warnings:

  - The primary key for the `categoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `TipoCategoria` on the `categoria` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `categoria` table. All the data in the column will be lost.
  - You are about to drop the column `tituloCategoria` on the `categoria` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tipoCategoria]` on the table `categoria` will be added. If there are existing duplicate values, this will fail.
  - The required column `id_categoria` was added to the `categoria` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `porcentagemDepreciacaoCategoria` to the `categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoCategoria` to the `categoria` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `categoria_tituloCategoria_key` ON `categoria`;

-- AlterTable
ALTER TABLE `categoria` DROP PRIMARY KEY,
    DROP COLUMN `TipoCategoria`,
    DROP COLUMN `id`,
    DROP COLUMN `tituloCategoria`,
    ADD COLUMN `id_categoria` VARCHAR(191) NOT NULL,
    ADD COLUMN `porcentagemDepreciacaoCategoria` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoCategoria` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_categoria`);

-- CreateIndex
CREATE UNIQUE INDEX `categoria_tipoCategoria_key` ON `categoria`(`tipoCategoria`);

-- AddForeignKey
ALTER TABLE `patrimonios` ADD CONSTRAINT `patrimonios_id_fkey` FOREIGN KEY (`id`) REFERENCES `categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;
