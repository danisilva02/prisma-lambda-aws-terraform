import type { Prisma } from '.prisma/client';
import { TicketModel } from '../models/ticket';

export interface UpdateTicket {
  update: (ticket: UpdateTicket.Params) => Promise<UpdateTicket.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UpdateTicket {
  export type Params = Prisma.ticketUpdateArgs;

  export type Result = TicketModel;
}
