import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

// you can do stuff in the client constructor
// const prisma = new PrismaClient({
//   __internal: { enginePath: '/Users/matthias/repos/work/prisma-engine/target/debug/query-engine' }
// } as any )

// you can do middlewares on
// prisma.$use

// const populate = async () => {
//   await prisma.b.create({ data: {} });
// };

// async function test() {
//   const b = await prisma.b.findFirst();
//   console.log(b);
// }

export async function openFileFromGithubRepo(
  filePath: string,
  backgroundJobId: string,
  _cb: (file: File) => void
): Promise<void> {
  const queryStatement = Prisma.sql`SELECT (gitTree.obj ->> 'path') as path, (gitTree.obj ->> 'content_url') as content_url FROM "BackgroundJobResult" bgr LEFT JOIN LATERAL jsonb_array_elements(bgr."data") WITH ORDINALITY AS gitTree(obj, pos) ON true WHERE (gitTree.obj ->> 'path') = ${filePath} AND "backgroundJobId" = ${backgroundJobId}::UUID;`;

  const queryResult = await prisma.$queryRaw<
    Array<{ path: string; content_url: string }>
  >(queryStatement);
}

const main = async () =>
  openFileFromGithubRepo("filePath", "ee988485-1e4c-4d9f-af9b-146a9418ccd7", () => null);

main()
  .catch(console.error)
  .finally(async () => {
    prisma.$disconnect;
  });
