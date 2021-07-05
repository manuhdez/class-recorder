import { Request, Response } from 'express';

export default function handleRouteNotFound(req: Request, res: Response): void {
  res.status(404).json({ success: false, error: `Route ${req.path} does not exists.` });
}
