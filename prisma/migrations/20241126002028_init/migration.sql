-- AlterTable
ALTER TABLE `bookmark` ADD COLUMN `place_id` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Bookmark_place_id_idx` ON `Bookmark`(`place_id`);

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
