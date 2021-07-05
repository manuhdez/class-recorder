import { NextFunction, Request, Response } from 'express';
import HttpError from '../../../../contexts/Shared/domain/HttpError';
import container from '../dependency-injection';

export default function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
  const logger = process.env.NODE_ENV !== 'test' ? container.get('Shared.Logger') : null;
  logger?.error(err.message ?? err);

  res.status(err.status).json({
    success: false,
    error: err.message
  });
}
