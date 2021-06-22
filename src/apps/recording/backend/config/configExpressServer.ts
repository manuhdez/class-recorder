import express, { Express, NextFunction, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import registerRoutes from '../routes';
import HttpError from '../../../../contexts/Shared/domain/HttpError';
import Logger from '../../../../contexts/Shared/domain/Logger';

export default function configExpressServer(logger?: Logger): Express {
  const router = Router();
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.frameguard({ action: 'deny' }));
  // app.use(compress());

  app.use(router);
  registerRoutes(router);

  router.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger?.error(err);
    res.status(err.status).json({
      success: false,
      error: err.message
    });
  });

  return app;
}
