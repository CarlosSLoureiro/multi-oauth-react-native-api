export default class GenericError extends Error {
  statusCode: number;

  constructor (message = `Internal Server Error`, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, GenericError.prototype);
  }
}
