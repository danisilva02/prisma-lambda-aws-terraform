import type { Prisma } from '.prisma/client';
import { TicketModel } from '../../models/ticket';

export interface AddTicket {
  add: (ticket: AddTicket.Params) => Promise<AddTicket.Result>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AddTicket {
  export type Params = Prisma.ticketCreateArgs;

  export type Result = TicketModel;
}
