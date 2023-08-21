-- CreateTable
CREATE TABLE "A" (
    "id" INTEGER NOT NULL,
    "naics_prefixes" VARCHAR(6)[] DEFAULT ARRAY[]::VARCHAR(6)[],

    CONSTRAINT "A_pkey" PRIMARY KEY ("id")
);
