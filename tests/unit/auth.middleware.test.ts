import { describe, it, expect, vi } from 'vitest';
import { authMiddleware } from '../../src/middlewares/auth.middleware.js';
import jwt from 'jsonwebtoken';

describe('AuthMiddleware', () => {
  it('should return 401 if no token is provided', () => {
    const req = { headers: {} } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Unauthorized' }));
  });

  it('should call next if token is valid', () => {
    vi.spyOn(jwt, 'verify').mockReturnValue({ id: 'user-1' } as any);
    const req = { headers: { authorization: 'Bearer valid-token' } } as any;
    const res = {} as any;
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ id: 'user-1' });
  });
});
