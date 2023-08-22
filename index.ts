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

const populate = async (value: bigint) => {
  await prisma.b.create({ data: { value } });
};

async function test() {
  const b = await prisma.$queryRaw<
    { value: bigint }[]
  >`SELECT SUM(1::BIGINT) AS value`;
  const x = await prisma.$queryRaw<
    { value: bigint }[]
  >`SELECT SUM(1::BIGINT)::BIGINT AS value`;

  const properBigint: bigint = 1n;
  console.log(
    `b (not cast): ${b[0].value}, type is ${typeof b[0]
      .value}, should be ${typeof properBigint}`
  );
  console.log(
    `x (cast): ${x[0].value}, type is ${typeof x[0]
      .value}, should be ${typeof properBigint}`
  );
}

async function main() {
  // [9223372036854775807n].map(v => populate(v));
  // console.log(process.env.DATABASE_URL);
  return test();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect;
  });
