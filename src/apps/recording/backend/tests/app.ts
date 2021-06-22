import { Express } from 'express';
import configExpressServer from '../config/configExpressServer';

export default function getTestApp(): Express {
  return configExpressServer();
}
