import { Prisma, PrismaClient, BaseUser } from "@prisma/client";
import { validate } from "@prisma/prisma-schema-wasm";
import { loadSchemaFiles } from "@prisma/schema-files-loader";

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter,
  log: ["query"],
});

// const prisma = new PrismaClient({
//   log: ["query"],
// });

// you can do stuff in the client constructor
// const prisma = new PrismaClient({
//   __internal: { enginePath: '/prisma-engines/target/debug/query-engine' }
// } as any )

// you can do middlewares on
// prisma.$use

const id = "123e4567-e89b-12d3-a456-426655440000";

const populate = async () => {
  await prisma.baseUser.create({
    data: {
      id,
      intId: 1,
    },
  });
};

const getUnsafe = async (id: bigint): Promise<BaseUser | null> => {
  const query = {
    where: { intId: id },
    // include: { user: true },
  };

  const result = await prisma.baseUser.findUnique(query);
  if (!result) {
    return null;
  }

  return result;
};

async function test() {
  const u = getUnsafe(BigInt(1));
  console.log(u);
}

async function main() {
  // console.log(process.env.DATABASE_URL);

  await populate();
  return test();

  // const prismaSchema = await loadSchemaFiles("./prisma/schema");
  // return validate(JSON.stringify({ prismaSchema }));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect;
  });
