import type { Prisma } from '.prisma/client';
import { TicketModel } from '../models/ticket';

export interface DeleteTicket {
  delete: (ticket: DeleteTicket.Params) => Promise<DeleteTicket.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DeleteTicket {
  export type Params = Prisma.ticketDeleteArgs;

  export type Result = TicketModel;
}
