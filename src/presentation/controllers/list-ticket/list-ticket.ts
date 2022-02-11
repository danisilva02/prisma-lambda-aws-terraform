import { Controller, HttpResponse, HttpRequest } from './list-ticket-protocols';
import { ListTicket } from '../../../domain/usecases/list-ticket';
import { success, badRequest } from '../../helpers/http-helper';

export class ListTicketController implements Controller {
  private readonly listTicket: ListTicket;

  constructor(listTicket: ListTicket) {
    this.listTicket = listTicket;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest?.body?.where) throw new Error('Where is required!');

      const create = await this.listTicket.list(httpRequest.body);

      return success(create);
    } catch (error) {
      return badRequest(error);
    }
  }
}
