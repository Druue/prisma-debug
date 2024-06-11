import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

const populate = async () => {
  const fav_series = [1, 2, 3, null, 1, 2];
  const [a] = await prisma.$transaction([
    prisma.a.upsert({
      create: { id: 0, fav_series },
      update: { fav_series },
      where: { id: 0 },
    }),
  ]);
  console.log(a);
};

async function test() {}

async function main() {
  await populate();
  return test();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect;
  });
