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

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');
    
    const valid = await argon2.verify(user.password, password);
    if (!valid) throw new Error('Invalid credentials');
    
    return user;
  }
}
