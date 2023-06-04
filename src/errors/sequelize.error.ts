export default class SequelizeError extends Error {
  details: object;

  constructor (error: any) {
    const message: string = error?.original?.message || error?.message;
    super(message);
    this.details = error?.original;
    Object.setPrototypeOf(this, SequelizeError.prototype);
  }
}
