import DbInstance from '../instance';
import { ListTicket } from '../../../domain/usecases/ticket/list-ticket';

export class ListTicketRepository implements ListTicket {
  async list(data: ListTicket.Params): Promise<ListTicket.Result> {
    const result = await DbInstance()
      ?.ticket?.findMany(data)
      .finally(() => DbInstance()?.$disconnect());
    return result;
  }
}
