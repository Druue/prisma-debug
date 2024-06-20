import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

const populate = async () => {
  await prisma.skillsAnnotation.createMany({
    data: [
      {
        name: "JavaScript(JS)",
        canonical: "JAVASCRIPT",
        suggest: true,
        rejectAs: null,
      },
      {
        name: "JS",
        canonical: "Javascript",
        suggest: true,
        rejectAs: null,
      },
    ],
  });
};

async function test() {
  const a = await prisma.skillsView.findMany({
    select: { canonical: true },
    where: { suggest: true, rejectAs: null },
    distinct: ["canonical"],
  });

  console.log(a);
}

async function main() {
  // await populate();
  return test();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect;
  });
