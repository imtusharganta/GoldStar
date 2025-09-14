/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Application } from '@prisma/client'; // <-- Use Prisma's generated type

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  // Create a new application
  async createApplication(
    userId: number,
    company: string,
    position: string,
    status: string,
    appliedDate?: Date,
  ): Promise<Application> {
    return await this.prisma.application.create({
      data: {
        userId,
        company,
        position,
        status,
        ...(appliedDate ? { appliedDate } : {}),
      },
    });
  }

  // Get all applications for a user
  async getApplicationsByUser(userId: number): Promise<Application[]> {
    return await this.prisma.application.findMany({ where: { userId } });
  }

  // Get a single application by ID
  async getApplicationById(id: number): Promise<Application> {
    const app = await this.prisma.application.findUnique({ where: { id } });
    if (!app) throw new NotFoundException(`Application with ID ${id} not found`);
    return app;
  }

  // Get all applications
  async getAllApplications(): Promise<Application[]> {
    return await this.prisma.application.findMany();
  }

  // Update application   
  async updateApplication(id: number, data: Partial<Application>): Promise<Application> {
    try {
      return await this.prisma.application.update({
        where: { id },
        data,
      });
    } catch {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
  }

  // Delete application
  async deleteApplication(id: number): Promise<Application> {
    try {
      return await this.prisma.application.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
  }
}
