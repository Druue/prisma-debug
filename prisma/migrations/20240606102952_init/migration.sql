-- CreateTable
CREATE TABLE `A` (
    `id` INTEGER NOT NULL,
    `lastSeen` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
