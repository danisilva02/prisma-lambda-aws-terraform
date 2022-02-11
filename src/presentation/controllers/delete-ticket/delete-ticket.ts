import { Controller, HttpResponse, HttpRequest } from './delete-ticket-protocols';
import { DeleteTicket } from '../../../domain/usecases/delete-ticket';
import { success, badRequest } from '../../helpers/http-helper';

export class DeleteTicketController implements Controller {
  private readonly deleteTicket: DeleteTicket;

  constructor(deleteTicket: DeleteTicket) {
    this.deleteTicket = deleteTicket;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest?.body?.where) throw new Error('Where is required!');

      const create = await this.deleteTicket.delete(httpRequest.body);

      return success(create);
    } catch (error) {
      return badRequest(error);
    }
  }
}
