import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Create Customers
  const customer1 = await prisma.customer.upsert({
    where: { id: 'seed-c1' },
    update: {},
    create: {
      id: 'seed-c1',
      name: 'U Aung Kyaw',
      phone: '09791234567',
      village: 'Hline Township',
      planName: 'Home Fiber Ultra',
      monthlyFee: 25.0,
      status: 'ACTIVE',
    },
  });

  const customer2 = await prisma.customer.upsert({
    where: { id: 'seed-c2' },
    update: {},
    create: {
      id: 'seed-c2',
      name: 'Daw Aye Aye',
      phone: '09782223344',
      village: 'Kamayut Sector B',
      planName: 'Basic Connect',
      monthlyFee: 12.0,
      status: 'ACTIVE',
    },
  });

  // Create Bills
  await prisma.bill.create({
    data: {
      customerId: customer1.id,
      customerName: customer1.name,
      village: customer1.village,
      month: 5,
      year: 2026,
      amount: customer1.monthlyFee,
      status: 'PAID',
      dueDate: new Date('2026-05-10'),
      paidAt: new Date('2026-05-05'),
    },
  });

  await prisma.bill.create({
    data: {
      customerId: customer2.id,
      customerName: customer2.name,
      village: customer2.village,
      month: 5,
      year: 2026,
      amount: customer2.monthlyFee,
      status: 'UNPAID',
      dueDate: new Date('2026-05-15'),
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
