# Reproduce prisma/prisma#22758

Run the following:
1. `npm i`
2. `make dev-mariadb`
3. `npm run migrate`
4. See the following sql being repeated
      ```sql
      -- AlterTable
      ALTER TABLE `A` ALTER COLUMN `lastSeen` DROP DEFAULT;
      ```
