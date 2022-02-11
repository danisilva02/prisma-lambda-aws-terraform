export class ServerError extends Error {
  constructor() {
    super('Internal serve error');
    this.name = 'ServerError';
  }
}
