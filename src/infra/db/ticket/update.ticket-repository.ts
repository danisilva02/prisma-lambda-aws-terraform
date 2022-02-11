import DbInstance from '../instance';
import { UpdateTicket } from '../../../domain/usecases/ticket/update-ticket';

export class UpdateTicketRepository implements UpdateTicket {
  async update(data: UpdateTicket.Params): Promise<UpdateTicket.Result> {
    const result = await DbInstance()
      ?.ticket?.update(data)
      .finally(() => DbInstance()?.$disconnect());
    return result;
  }
}
