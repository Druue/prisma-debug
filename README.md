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
2. npm run migrate -- this should generate the following sql:
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

3. npm run pull
```prisma
@@index([companyId(ops: raw("")), text(ops: raw(""))], type: Gin)
```
becomes
```prisma
@@index([companyId, text], type: Gin)
```

