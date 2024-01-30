import { Prisma, PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const prisma = new PrismaClient({
  // adapter,
  log: ["query"],
});

// you can do stuff in the client constructor
// const prisma = new PrismaClient({
//   __internal: { enginePath: '/Users/matthias/repos/work/prisma-engine/target/debug/query-engine' }
// } as any )

// you can do middlewares on
// prisma.$use

const populate = async () => {
  await prisma.user.findFirst();
};

async function test() {
  const user = await prisma.$transaction(
    async (tx) => await tx.user.findFirst()
  );
  console.log(user);
}

async function main() {
  await populate();
  return test();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect;
  });
