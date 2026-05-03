import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'Validation error', details: err.issues });
  }

  res.status(500).json({ error: 'Internal server error', details: err.message });
};
