// Run with 
//   npx prisma format && npx prisma db push --force-reset && npm run test

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

const populate = async () => {
  console.log('➡️ Inserting letting')
  await prisma.letting.create({
    data: { lettingid: 'lettingid' },
  })

  console.log('letting updated\n\n\n')

  console.log('➡️ Inserting letting schedule')
  await prisma.lettingSchedule.createMany({
    data: [
      { 
        lettingid: 'lettingid',
        contid: 'contis00'
      },
      {
        lettingid: 'LETTINGID',
        contid: 'contis01'
      }
    ]
  })
  console.log('lettingSchedule updated\n\n\n')
};

async function test() {
  console.log('🔎 Querying for letting')
  const result = await prisma.letting.findMany({
    include: {
      lettingSchedules: true
    },
    where: {
      lettingid: 'lettingid',
    }
  })
  console.log(JSON.stringify(result, null, 2));
}

async function main() {
  await populate();
  // console.log(process.env.DATABASE_URL);
  return test();
}

main()
  .catch(console.error)
  // .finally(prisma.$disconnect);
