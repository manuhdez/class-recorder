import { Router, Request, Response } from 'express';

export const register = (router: Router) => {
  router.get('/status', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
  });
};
