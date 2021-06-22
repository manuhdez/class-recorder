import { Router, Request, Response, NextFunction } from 'express';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const videoGetController = container.get('Apps.controllers.VideoGetController');
  router.get('/videos', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await videoGetController.run(req, res);
    } catch (e) {
      next(e);
    }
  });

  const videoPostController = container.get('Apps.controllers.VideoPostController');
  router.post('/videos', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await videoPostController.run(req, res);
    } catch (e) {
      next(e);
    }
  });
};
