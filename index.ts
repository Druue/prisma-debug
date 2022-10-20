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
  await prisma.letting.create({
    data: {
      lettingid: "UPPERCASE",
    },
  });

  await prisma.lettingSchedule.create({
    data: {
      lettingid: "uppercase",
      contid: "some-contid",
    },
  });
};

async function test() {
  const lettings = await prisma.letting.findMany({
    include: { lettingSchedules: true },
  });
  console.log(lettings);
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
