const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@kickoff.local';
  const plain = 'admin123';
  const hashed = await bcrypt.hash(plain, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Admin',
      password: hashed,
      role: 'ADMIN',
      active: true,
      ownerApproved: true,
    },
  });

  console.log('✓ Seed: admin user ensured ->', email, '(password: admin123)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
