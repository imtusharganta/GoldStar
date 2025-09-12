import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, name: string) {
    return this.prisma.user.create({
      data: { email, name },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
