# local_debug

Run the following command

    docker compose up -d mysql-5-7 && \
    npx prisma format && \
    npx prisma db push --force-reset && \
    npm run test && \
    docker compose down


Gives the result

    > prisma-test@1.0.0 test
    > ts-node index.ts

    ➡️ Inserting letting
    prisma:query BEGIN
    prisma:query INSERT INTO `prisma`.`letting` (`lettingid`) VALUES (?)
    prisma:query SELECT `prisma`.`letting`.`lettingid` FROM `prisma`.`letting` WHERE `prisma`.`letting`.`lettingid` = ? LIMIT ? OFFSET ?
    prisma:query COMMIT
    letting updated

    ➡️ Inserting letting schedule
    prisma:query BEGIN
    prisma:query INSERT INTO `prisma`.`lettingschedule` (`contid`,`lettingid`) VALUES (?,?), (?,?)
    prisma:query COMMIT
    lettingSchedule updated

    🔎 Querying for letting
    prisma:query SELECT `prisma`.`letting`.`lettingid` FROM `prisma`.`letting` WHERE `prisma`.`letting`.`lettingid` = ?
    thread 'tokio-runtime-worker' panicked at 'Expected parent IDs to be set when ordering by parent ID.', query-engine/core/src/interpreter/query_interpreters/inmemory_record_processor.rs:69:18
    note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
    prisma:query SELECT `prisma`.`lettingschedule`.`lettingid`, `prisma`.`lettingschedule`.`contid` FROM `prisma`.`lettingschedule` WHERE `prisma`.`lettingschedule`.`lettingid` IN (?)
    PrismaClientRustPanicError:
    Invalid `prisma.letting.findMany()` invocation in
    /Users/jason.kleinberg/repos/prisma-debug/index.ts:36:39

      33
      34 async function test() {
      35   console.log('🔎 Querying for letting')
    → 36   const result = await prisma.letting.findMany(
    Expected parent IDs to be set when ordering by parent ID.

    This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

    <https://github.com/prisma/prisma/issues/new?body=Hi+Prisma+Team%21+My+Prisma+Client+just+crashed.+This+is+the+report%3A%0A%23%23+Versions%0A%0A%7C+Name++++++++++++%7C+Version++++++++++++%7C%0A%7C-----------------%7C--------------------%7C%0A%7C+Node++++++++++++%7C+v18.8.0++++++++++++%7C+%0A%7C+OS++++++++++++++%7C+darwin+++++++++++++%7C%0A%7C+Prisma+Client+++%7C+4.5.0++++++++++++++%7C%0A%7C+Query+Engine++++%7C+0362da9eebca54d94c8ef5edd3b2e90af99ba452%7C%0A%7C+Database++++++++%7C+mysql++++++++++++++%7C%0A%0A%0A%0A%23%23+Logs%0A%60%60%60%0Aprisma%3AtryLoadEnv+Environment+variables+loaded+from+%2FUsers%2Fjason.kleinberg%2Frepos%2Fprisma-debug%2F.env%0Aprisma%3AtryLoadEnv+Environment+variables+loaded+from+%2FUsers%2Fjason.kleinberg%2Frepos%2Fprisma-debug%2F.env%0Aprisma%3Aclient+dirname+%2FUsers%2Fjason.kleinberg%2Frepos%2Fprisma-debug%2Fnode_modules%2F.prisma%2Fclient%0Aprisma%3Aclient+relativePath+..%2F..%2F..%0Aprisma%3Aclient+cwd+%2FUsers%2Fjason.kleinberg%2Frepos%2Fprisma-debug%0Aprisma%3Aclient+clientVersion+4.5.0%0Aprisma%3Aclient+clientEngineType+library%0Aprisma%3Aclient%3AlibraryEngine+internalSetup%0Aprisma%3Aclient%3AlibraryEngine%3Aloader+Searching+for+Query+Engine+Library+in+%2FUsers%2Fjason.kleinberg%2Frepos%2Fprisma-debug%2Fnode_modules%2F.prisma%2Fclient%0Aprisma%3Aclient%3AlibraryEngine%3Aloader+loadEngine+using+%2FUsers%2Fjason.kleinberg%2Frepos%2Fprisma-debug%2Fnode_modules%2F.prisma%2Fclient%2Flibquery_engine-darwin.dylib.node%0Aprisma%3Aclient%3AlibraryEngine+sending+request%2C+this.libraryStarted%3A+false%0Aprisma%3Aclient%3AlibraryEngine+library+starting%0Aprisma%3Aclient%3AlibraryEngine+library+started%0Aprisma%3Aclient%3AlibraryEngine+sending+request%2C+this.libraryStarted%3A+true%0Aprisma%3Aclient%3AlibraryEngine+sending+request%2C+this.libraryStarted%3A+true%0A%60%60%60%0A%0A%23%23+Client+Snippet%0A%60%60%60ts%0A%2F%2F+PLEASE+FILL+YOUR+CODE+SNIPPET+HERE%0A%60%60%60%0A%0A%23%23+Schema%0A%60%60%60prisma%0A%2F%2F+PLEASE+ADD+YOUR+SCHEMA+HERE+IF+POSSIBLE%0A%60%60%60%0A%0A%23%23+Prisma+Engine+Query%0A%60%60%60%0A%7B%22X%22%3A%7B%7D%7D%0A%60%60%60%0A&title=Expected+parent+IDs+to+be+set+when+ordering+by+parent+ID.&template=bug_report.md>

    If you want the Prisma team to look into it, please open the link above 🙏
    To increase the chance of success, please post your schema and a snippet of
    how you used Prisma Client in the issue.

        at RequestHandler.handleRequestError (/Users/jason.kleinberg/repos/prisma-debug/node_modules/@prisma/client/runtime/index.js:30881:13)
        at RequestHandler.request (/Users/jason.kleinberg/repos/prisma-debug/node_modules/@prisma/client/runtime/index.js:30856:12)
        at async PrismaClient._request (/Users/jason.kleinberg/repos/prisma-debug/node_modules/@prisma/client/runtime/index.js:31836:16) {
      clientVersion: '4.5.0'
    }
