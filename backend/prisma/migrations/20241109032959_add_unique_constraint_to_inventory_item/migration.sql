/*
  Warnings:

  - A unique constraint covering the columns `[productId,locationId]` on the table `InventoryItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_productId_locationId_key" ON "InventoryItem"("productId", "locationId");
