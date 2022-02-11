import dotenv from 'dotenv';
dotenv.config();

import fastify, { FastifyInstance } from 'fastify';
import { Routes } from './routes';

export const init = (): FastifyInstance => {
  const app = fastify({ trustProxy: true, logger: true });

  if (process.env.SLS_STAGE !== 'production') {
    Routes.map(item => app.register(item));
  }

  return app;
};

if (require.main === module) {
  init().listen(3000, (err: Error) => {
    if (err) console.error(err);
    console.log('server listening on 3000');
  });
}

export default init;
