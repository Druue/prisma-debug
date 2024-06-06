-- CreateTable
CREATE TABLE "A" (
    "id" SERIAL NOT NULL,
    "fav_series" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "A_pkey" PRIMARY KEY ("id")
);
