/*
  Warnings:

  - You are about to drop the column `customerId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_customerId_fkey`;

-- DropIndex
DROP INDEX `Order_customerId_fkey` ON `order`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `customerId`;

-- DropTable
DROP TABLE `customer`;
