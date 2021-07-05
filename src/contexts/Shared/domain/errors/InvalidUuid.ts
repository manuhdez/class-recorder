import HttpError from '../HttpError';
import httpStatus from 'http-status';

export default class InvalidUuid extends HttpError {
  constructor() {
    const message = 'The given id has not a valid uuid format.';
    const statusCode = httpStatus.BAD_REQUEST;
    super(message, statusCode);
  }
}
