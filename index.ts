import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

// you can do stuff in the client constructor
// const prisma = new PrismaClient({
//   __internal: { enginePath: '/Users/matthias/repos/work/prisma-engine/target/debug/query-engine' }
// } as any )

// you can do middlewares on
// prisma.$use

const populate = async () => {
  await prisma.labels.create({
    data: {
      id: BigInt(11111111111111111111),
    },
  });
};

async function test() {
  const a = await prisma.labels.findFirst();
  console.log(a);
}

async function main() {
  await populate();
  // console.log(process.env.DATABASE_URL);
  return test();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect;
  });
