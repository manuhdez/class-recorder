import Controller from '../Controller';
import { Request, Response } from 'express';

export default class StatusController implements Controller {
  async run(req: Request, res: Response): Promise<void> {
    res.status(200).json({ status: 'OK' });
  }
}
