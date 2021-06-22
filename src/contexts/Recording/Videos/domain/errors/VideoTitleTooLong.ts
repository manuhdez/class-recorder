import HttpError from '../../../../Shared/domain/HttpError';
import httpStatus from 'http-status';

export default class VideoTitleTooLong extends HttpError {
  constructor(maxLength: number) {
    const message = `The title of a video cannot be longer than ${maxLength} characters`;
    super(message, httpStatus.BAD_REQUEST);
  }
}
