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
  await prisma.level.create({
    data: {
      id: "633e96bee022c9818ca1f264",
      name: "beginner",
    },
  });
  await prisma.game.createMany({
    data: [
      {
        id: "633e96bfe022c9818ca1f267",
        name: "discrete",
        levelId: "633e96bee022c9818ca1f264",
        // level: { id: "633e96bee022c9818ca1f264", name: "beginner" },
      },
      {
        id: "633e96bfe022c9818ca1f268",
        name: "blind",
        levelId: "633e96bee022c9818ca1f264",
        // level: { id: "633e96bee022c9818ca1f264", name: "beginner" },
      },
      {
        id: "633e96bfe022c9818ca1f269",
        name: "detailed",
        levelId: "633e96bee022c9818ca1f264",
        // level: { id: "633e96bee022c9818ca1f264", name: "beginner" },
      },
      {
        id: "633e96bfe022c9818ca1f26a",
        name: "villainous",
        levelId: "633e96bee022c9818ca1f264",
        // level: { id: "633e96bee022c9818ca1f264", name: "beginner" },
      },
      {
        id: "633e96bfe022c9818ca1f26b",
        name: "lawful",
        levelId: "633e96bee022c9818ca1f264",
        // level: { id: "633e96bee022c9818ca1f264", name: "beginner" },
      },
    ],
  });
};

async function test() {
  const a = await prisma.game.findFirst({
    where: {
      level: {
        name: "beginner",
      },
    },
  });
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
