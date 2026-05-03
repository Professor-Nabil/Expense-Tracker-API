import * as argon2 from 'argon2';
import { prisma } from '../lib/prisma.js';

export class AuthService {
  async register(email: string, password: string) {
    const hashedPassword = await argon2.hash(password);
    
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }
}
