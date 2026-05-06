'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCustomers() {
  try {
    return await prisma.customer.findMany({
      orderBy: { createdAt: 'desc' },
      include: { bills: true }
    });
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    return [];
  }
}

export async function createCustomer(formData: {
  name: string;
  phone: string;
  village: string;
  planName: string;
  monthlyFee: number;
}) {
  try {
    const customer = await prisma.customer.create({
      data: {
        ...formData,
        status: 'ACTIVE',
      },
    });
    revalidatePath('/admin/customers');
    return { success: true, customer };
  } catch (error) {
    console.error('Failed to create customer:', error);
    return { success: false, error: 'Database connection failed' };
  }
}

export async function getBills() {
  try {
    return await prisma.bill.findMany({
      orderBy: { createdAt: 'desc' },
      include: { customer: true }
    });
  } catch (error) {
    console.error('Failed to fetch bills:', error);
    return [];
  }
}
