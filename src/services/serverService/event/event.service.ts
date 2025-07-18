import { prisma } from '~/lib/server/db';

export interface CreateEventInput {
  title: string;
  description: string;
  eventBanner: string;
  content: string;
  participantFee: number;
  date: Date;
  location: string;
  companyName: string;
  companyProfile: string;
  companyLogo: string;
  hostName: string;
}

export async function getEvents(skip: number, limit: number) {
  return prisma.event.findMany({
    skip,
    take: limit,
  });
}

export async function getEventById(id: string) {
  return prisma.event.findUnique({ where: { id } });
}

export async function createEvent(data: CreateEventInput) {
  return prisma.event.create({ data });
}

export async function updateEvent(id: string, data: CreateEventInput) {
  return prisma.event.update({ where: { id }, data });
}

export async function deleteEvent(id: string) {
  return prisma.event.delete({ where: { id } });
}
