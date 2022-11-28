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
  const res = await prisma.score.update({
    where: {
      id: "score-id"
    },
    data: {
      participation: {
        connectOrCreate: {
          where: {
            promotionId_userId: {
              promotionId: "score.promotionId",
              userId: "session.user.id"
            },
            create: {
              promotionId: "score.promotionId",
              userId: "session.user.id"
            }
          }
        }
      }
    }
  })

};

async function test() {
  // const b = await prisma.b.findFirst();
  // console.log(b);
}

async function main() {
  populate();
  // console.log(process.env.DATABASE_URL);
  return test();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect;
  });
