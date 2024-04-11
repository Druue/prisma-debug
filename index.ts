import { Prisma, PrismaClient } from "@prisma/client";
import { validate } from "@prisma/prisma-schema-wasm";
import { loadSchemaFiles } from "@prisma/schema-files-loader";

const prisma = new PrismaClient({
  log: ["query"],
});

// you can do stuff in the client constructor
// const prisma = new PrismaClient({
//   __internal: { enginePath: '/prisma-engines/target/debug/query-engine' }
// } as any )

// you can do middlewares on
// prisma.$use

const populate = async () => {
  await prisma.a.create({
    data: {
      id: 0,
    },
  });
};

async function test() {
  const a = await prisma.a.findFirst();
  console.log(a);
}

async function main() {
  // console.log(process.env.DATABASE_URL);

  // await populate();
  return test();

  // const prismaSchema = await loadSchemaFiles("./prisma/schema");
  // return validate(JSON.stringify({ prismaSchema }));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect;
  });
