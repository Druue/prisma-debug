# local_debug

Setup for local debugging of engines
https://github.com/prisma/local_debug/

Relevant commands `npm run`:
- "latest": "npm i prisma@dev && npm i @prisma/client@dev",
- "archive": "mv ./migrations ./migrations_archive",
- "test": "ts-node index.ts",
- "reset": "npx prisma migrate reset --force",
- "start-dbs": "docker-compose up -d"

Makefile contains commands to spin up dbs in docker.
.env file contains env vars to link custom binaries and also the db credentials.

# Repro steps
1. npm i
2. npx prisma migrate dev --create-only -- this should generate the following sql:
```sql
-- CreateTable
CREATE TABLE "B" (
    "id" SERIAL NOT NULL,
    "text" TEXT[],
    "companyId" INTEGER[],

    CONSTRAINT "B_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "B_companyId_text_idx" ON "B" USING GIN ("companyId" , "text" );
```

3. add to the generated sql file the following:
```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;
```

4. run npx prisma migrate dev, this generates:
```sql
-- DropIndex
DROP INDEX "B_companyId_text_idx";

-- CreateIndex
CREATE INDEX "B_companyId_text_idx" ON "B" USING GIN ("companyId" , "text" );
```

5. npx prisma db pull
```prisma
@@index([companyId(ops: raw("")), text(ops: raw(""))], type: Gin)
```
becomes
```prisma
@@index([companyId, text], type: Gin)
```

Using the engines fix outlined [here](https://github.com/prisma/prisma-engines/pull/3625) and then defined in .env, fixes the the migration bug whereby the SQL outlined in part 4 gets generated.


