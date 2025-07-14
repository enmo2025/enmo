import { prisma } from '~/lib/server/db';

export interface CreateEventInput {
  title: string;
  description: string;
  eventDetailBanner: string;
  content: string;
  participantFee: string;
  date: string;
  location: string;
  companyName: string;
  companyProfile: string;
  companyLogo: string;
  hostName: string;
}

export async function createEvent(data: CreateEventInput) {
  return prisma.event.create({ data });
}
