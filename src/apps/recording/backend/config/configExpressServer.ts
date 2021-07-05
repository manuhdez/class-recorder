import express, { Express, Router, json, urlencoded } from 'express';
import helmet from 'helmet';
import registerRoutes from '../routes';
import errorHandler from '../middlewares/errorhandler';
import handleRouteNotFound from '../middlewares/handleRouteNotFound';

export default function configExpressServer(): Express {
  const app = express();
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.frameguard({ action: 'deny' }));

  const router = Router();
  registerRoutes(router);
  app.use(router);
  app.use(errorHandler);
  app.use(handleRouteNotFound);

  return app;
}
