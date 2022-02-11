import DbInstance from '../instance';
import { AddTicket } from '../../../domain/usecases/ticket/add-ticket';
export class AddTicketRepository implements AddTicket {
  async add(data: AddTicket.Params): Promise<AddTicket.Result> {
    const result = await DbInstance()
      ?.ticket?.create(data)
      .finally(() => DbInstance()?.$disconnect());
    return result;
  }
}
