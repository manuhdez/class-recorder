import { Request, Response } from 'express';

export default function errorHandler(err: Error, req: Request, res: Response) {
  console.log('error registered');
  res.statusCode = 500;
  res.json({ error: err.message });
}
