import { PrismaClient } from "@prisma/client";

// you can do stuff in the client constructor
// const prisma = new PrismaClient({
//   __internal: { enginePath: '/Users/matthias/repos/work/prisma-engine/target/debug/query-engine' }
// } as any )

// you can do middlewares on
// prisma.$use

const prisma = new PrismaClient({
  log: ["query"],
});

const caseInsensitiveField = "hello world";
const id = "9df0f936-51d6-4c55-8e01-5144e588a8a1";

const populate = async () => {
  await prisma.test.deleteMany();

  await prisma.test.createMany({
    data: {
      id,
      caseInsensitiveField,
    },
  });
};

async function test() {
  const list = [0, 0] as const;
  console.log("Case insensitive field", {
    findFirst: await Promise.all(
      list.map(() =>
        prisma.test.findFirst({
          where: { caseInsensitiveField: caseInsensitiveField.toUpperCase() },
        })
      )
    ),
    findUnique: await Promise.all(
      list.map(() =>
        prisma.test.findUnique({
          where: { caseInsensitiveField: caseInsensitiveField.toUpperCase() },
        })
      )
    ),
  });
  console.log("Normal field", {
    findFirst: await Promise.all(
      list.map(() => prisma.test.findFirst({ where: { id } }))
    ),
    findUnique: await Promise.all(
      list.map(() => prisma.test.findUnique({ where: { id } }))
    ),
  });
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
