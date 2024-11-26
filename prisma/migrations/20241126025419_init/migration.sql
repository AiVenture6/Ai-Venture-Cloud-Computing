-- AlterTable
ALTER TABLE `history` ADD COLUMN `place_id` INTEGER NULL;

-- CreateIndex
CREATE INDEX `History_place_id_idx` ON `History`(`place_id`);

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
