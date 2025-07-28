export class GeneratedCodeError extends Error {
  constructor(fields: Pick<GeneratedCodeError, 'message'>) {
    super(fields.message);
    Object.assign(this, fields);
    this.name = 'GeneratedCodeError';
    Object.setPrototypeOf(this, GeneratedCodeError.prototype);
  }
}
