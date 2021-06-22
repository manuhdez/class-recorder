import HttpError from '../../../../Shared/domain/HttpError';
import httpStatus from 'http-status';

export default class InvalidVideoTitleFormat extends HttpError {
  constructor() {
    const message = 'The video title has to be of type String.';
    super(message, httpStatus.BAD_REQUEST);
  }
}
