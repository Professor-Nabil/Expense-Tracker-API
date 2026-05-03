import { describe, it, expect, vi, beforeEach } from "vitest";
vi.mock("argon2", () => ({
  verify: vi.fn(),
  hash: vi.fn(),
}));

import * as argon2 from "argon2";
import { AuthService } from "../../src/services/auth.service.js";
import { prisma } from "../../src/lib/prisma.js";

vi.mock("../../src/lib/prisma", () => ({
  prisma: {
    user: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should register a new user", async () => {
    const mockUser = {
      id: "uuid",
      email: "test@test.com",
      password: "hashedpassword",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vi.mocked(prisma.user.create).mockResolvedValue(mockUser);

    const service = new AuthService();
    const result = await service.register("test@test.com", "password123");

    expect(result).toEqual(mockUser);
  });

  it("should return a user on successful login", async () => {
    const mockUser = {
      id: "uuid",
      email: "test@test.com",
      password: "hashedpassword",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser);
    vi.mocked(argon2.verify).mockResolvedValue(true);

    const service = new AuthService();
    const result = await service.login("test@test.com", "password123");

    expect(result).toEqual(mockUser);
  });
});

  it('should throw error for invalid credentials (wrong password)', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: 'u1', password: 'hashedpassword' } as any);
    vi.mocked(argon2.verify).mockResolvedValue(false);

    const service = new AuthService();
    await expect(service.login('test@test.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
  });

  it('should throw error if user not found', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

    const service = new AuthService();
    await expect(service.login('nonexistent@test.com', 'password123')).rejects.toThrow('Invalid credentials');
  });
