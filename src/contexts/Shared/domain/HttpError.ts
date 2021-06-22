import httpStatus from 'http-status';

export default class HttpError extends Error {
  public readonly status: number;
  public readonly message: string;

  constructor(message: string = '', status: number = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
