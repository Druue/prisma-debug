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

const populate = async (id: Prisma.IDCreateInput) => {
  console.log(id)
  const data = await prisma.iD.create({
    data: id
  })
};

async function test() {
  const b = await prisma.iD.findMany({});
  console.log('b');
  console.log(b);
}

async function main() {
  populate({
    id: "id",
    identifier: "identifier",
    provider: "provider",
    default: "",
    arweaveTx: {},
  });
  // console.log(process.env.DATABASE_URL);
  return test();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect;
  });
