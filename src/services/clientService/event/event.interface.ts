import { Event, Partner } from '@prisma/client';

export interface EventDetail extends Event {
  partner: Partner;
}
