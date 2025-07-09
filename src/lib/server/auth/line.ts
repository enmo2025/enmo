import { Line } from 'arctic';

export const line = new Line(
  process.env.LINE_CLIENT_ID!,
  process.env.LINE_CLIENT_SECRET!,
  process.env.LINE_REDIRECT_URI!
);
