import awsLambdaFastify from 'aws-lambda-fastify';
import fastify from 'fastify';
import init from './app';

import { Routes } from './routes';

const server = fastify({ logger: true });

server.register(init);

Routes.map(item => server.register(item));

const proxy = awsLambdaFastify(server);

exports.handler = proxy;
