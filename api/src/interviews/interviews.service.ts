import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Interview } from '@prisma/client'; // Prisma auto-generates this type

@Injectable()
export class InterviewsService {
  constructor(private prisma: PrismaService) {}

  // Add a new interview (OA or Interview)
  async createInterview(
    userId: number,
    company: string,
    stage: string,
    dueDate?: Date,       // optional
    scheduled?: Date,     // optional
  ): Promise<Interview> {
    return this.prisma.interview.create({
      data: {
        userId,
        company,
        stage,
        ...(dueDate ? { dueDate } : {}),
        ...(scheduled ? { scheduled } : {}),
      },
    });
  }

  // Get all interviews for a user
  async getInterviewsByUser(userId: number): Promise<Interview[]> {
    return this.prisma.interview.findMany({
      where: { userId },
    });
  }

  async getAllInterviews(): Promise<Interview[]> {
  return this.prisma.interview.findMany();
}

}
