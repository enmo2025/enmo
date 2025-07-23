import { Partner } from '@prisma/client';
import { prisma } from '~/lib/server/db';

export const getPartners = async () => {
  const partners = await prisma.partner.findMany();
  return partners;
};

export const createPartner = async (data: Partner) => {
  const partner = await prisma.partner.create({ data });
  return partner;
};
