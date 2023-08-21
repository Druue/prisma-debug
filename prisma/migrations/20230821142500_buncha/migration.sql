-- CreateTable
CREATE TABLE "reports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contracts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "report_id" INTEGER,
    CONSTRAINT "contracts_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_contracts" ("id") SELECT "id" FROM "contracts";
DROP TABLE "contracts";
ALTER TABLE "new_contracts" RENAME TO "contracts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "reports_name_key" ON "reports"("name");