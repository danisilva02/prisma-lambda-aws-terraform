import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { AddTicketRepository, UpdateTicketRepository, ListTicketRepository, DeleteTicketRepository } from '../../infra/db';

import { AddTicketController, UpdateTicketController, ListTicketController, DeleteTicketController } from '../../presentation/controllers';

const TicketsRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.post('/ticket/create', {}, async (request, reply) => {
    const result = await new AddTicketController(new AddTicketRepository()).handle(request);
    reply.status(result.statusCode).send(result.body);
  });

  server.post('/ticket/update', {}, async (request, reply) => {
    const result = await new UpdateTicketController(new UpdateTicketRepository()).handle(request);
    reply.status(result.statusCode).send(result.body);
  });

  server.post('/ticket/list', {}, async (request, reply) => {
    const result = await new ListTicketController(new ListTicketRepository()).handle(request);
    reply.status(result.statusCode).send(result.body);
  });

  server.post('/ticket/delete', {}, async (request, reply) => {
    const result = await new DeleteTicketController(new DeleteTicketRepository()).handle(request);
    reply.status(result.statusCode).send(result.body);
  });
};

export default fp(TicketsRoutes);
