export class InvalidParamError extends Error {
  constructor(paraName: string) {
    super(`Invalid param: ${paraName}`);
    this.name = 'InvalidParamError';
  }
}
