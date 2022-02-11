import { Controller, HttpResponse, HttpRequest } from './update-ticket-protocols';
import { UpdateTicket } from '../../../domain/usecases/update-ticket';
import { success, badRequest } from '../../helpers/http-helper';

export class UpdateTicketController implements Controller {
  private readonly updateTicket: UpdateTicket;

  constructor(updateTicket: UpdateTicket) {
    this.updateTicket = updateTicket;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest?.body?.data) throw new Error('Data is required!');

      if (!httpRequest?.body?.where) throw new Error('Where is required!');

      const create = await this.updateTicket.update(httpRequest.body);

      return success(create);
    } catch (error) {
      return badRequest(error);
    }
  }
}
