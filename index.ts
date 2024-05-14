import { Prisma, PrismaClient } from "@prisma/client";
import { validate } from "@prisma/prisma-schema-wasm";
import { loadSchemaFiles } from "@prisma/schema-files-loader";

const prisma = new PrismaClient({
  // log: ["query"],
});

// you can do stuff in the client constructor
// const prisma = new PrismaClient({
//   __internal: { enginePath: '/prisma-engines/target/debug/query-engine' }
// } as any )

// you can do middlewares on
// prisma.$use

const populate = async () => {
  const { id } = await prisma.user.create({
    data: {
      posts: {
        createMany: {
          data: Array(4000).fill({ title: 'post' }),
        }
      }
    }
  });
};

async function test() {
  // ! this doesn't work
  // const r = await prisma.post.findMany({
  //   where: { authorId: { in: Array.from(Array(4000).keys()) } },
  //   select: { id: true, title: true },
  //   orderBy: { createdAt: 'asc' },
  // });

  // * this works
  const r = await prisma.post.findMany({
    where: { authorId: { in: Array.from(Array(4000).keys()) } },
    select: { id: true, title: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });

  console.log(r);

  // * this works too
  // await prisma.post.findMany({
  //   where: { authorId: { in: Array.from(Array(4000).keys()) } },
  //   orderBy: { createdAt: 'asc' },
  // });
}

async function main() {
  // console.log(process.env.DATABASE_URL);

  await populate();
  return test();

  // const prismaSchema = await loadSchemaFiles("./prisma/schema");
  // return validate(JSON.stringify({ prismaSchema }));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect;
  });
