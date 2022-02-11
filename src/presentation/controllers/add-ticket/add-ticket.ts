import { Controller, HttpResponse, HttpRequest } from './add-ticket-protocols';
import { AddTicket } from '../../../domain/usecases/ticket/add-ticket';
import { success, badRequest } from '../../helpers/http-helper';

export class AddTicketController implements Controller {
  private readonly addTicket: AddTicket;

  constructor(addTicket: AddTicket) {
    this.addTicket = addTicket;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest?.body?.data) throw new Error('Data is required!');

      const create = await this.addTicket.add(httpRequest.body);

      return success(create);
    } catch (error) {
      return badRequest(error);
    }
  }
}
