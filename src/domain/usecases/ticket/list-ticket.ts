import type { Prisma } from '.prisma/client';
import { TicketModel } from '../models/ticket';

export interface ListTicket {
  list: (ticket: ListTicket.Params) => Promise<ListTicket.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ListTicket {
  export type Params = Prisma.ticketFindManyArgs;

  export type Result = TicketModel[];
}
