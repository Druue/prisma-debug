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

const populate = async (value: number) => {
  console.log(value);
  await prisma.a.create({
    data: {
      value: value
    }
  })
};

async function test(value: number) {
  const b = await prisma.a.findMany({
    where: { value: { equals: value } }
  });
  console.log(`searching for ${value}, found:`);
  console.log(b);
}

async function main() {
  // [360, 360.6, 360.06, 366].map((value) => populate(value));
  // console.log(process.env.DATABASE_URL);
  [360, 360.6, 360.06, 366].map((value) => test(value));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect;
  });
