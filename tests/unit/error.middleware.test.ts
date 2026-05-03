import { describe, it, expect, vi } from 'vitest';
import { errorMiddleware } from '../../src/middlewares/error.middleware.js';
import { ZodError } from 'zod';

describe('ErrorMiddleware', () => {
  it('should handle Zod errors', () => {
    const error = new ZodError([{ code: 'custom', path: ['title'], message: 'Required' } as any]);
    const req = {} as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();

    errorMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Validation error' }));
  });
});
