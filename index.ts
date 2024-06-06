import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

const populate = async () => {
  await prisma.a.upsert({
    create: {
      fav_series: [],
    },
    update: {
      fav_series: [],
    },
    where: {
      id: 0,
    },
  });
};

async function test() {
  const a = await prisma.a.findFirst();
  console.log(a);
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
