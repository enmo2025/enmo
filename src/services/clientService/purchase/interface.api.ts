import { Event, Purchase, User } from '@prisma/client';

export interface PurchaseExtend extends Purchase {
  user: User;
  event: Event;
}
