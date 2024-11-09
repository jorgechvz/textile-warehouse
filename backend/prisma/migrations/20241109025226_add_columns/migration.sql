/*
  Warnings:

  - You are about to drop the column `lastUpdated` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `InventoryItem` table. All the data in the column will be lost.
  - Added the required column `locationId` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalStock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryItem" DROP COLUMN "lastUpdated",
DROP COLUMN "location",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "totalStock" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "WarehouseLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
