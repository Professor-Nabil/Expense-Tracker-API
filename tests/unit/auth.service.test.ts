import { describe, it, expect, vi, beforeEach } from "vitest";
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

    // Note: This test will fail until we implement the service
    const service = new AuthService();
    const result = await service.register("test@test.com", "password123");

    expect(result).toEqual(mockUser);
  });
});
