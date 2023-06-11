export default class ValidationError extends Error {
  statusCode: number;
  fields: Array<string>;

  constructor (message = `Bad Request`, fields = [], statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.fields = fields;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
