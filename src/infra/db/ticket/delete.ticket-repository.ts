import DbInstance from '../instance';
import { DeleteTicket } from '../../../domain/usecases/ticket/delete-ticket';

export class DeleteTicketRepository implements DeleteTicket {
  async delete(data: DeleteTicket.Params): Promise<DeleteTicket.Result> {
    const result = await DbInstance()
      ?.ticket?.delete(data)
      .finally(() => DbInstance()?.$disconnect());
    return result;
  }
}
