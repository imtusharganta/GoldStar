/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Interview } from '@prisma/client'; // Prisma auto-generates this type

@Injectable()
export class InterviewsService {
  constructor(private prisma: PrismaService) {}
  //---------------------------------------------------------------------------------------------------------
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
  //---------------------------------------------------------------------------------------------------------
  // Get all interviews for a user
  async getInterviewsByUser(userId: number): Promise<Interview[]> {
    return this.prisma.interview.findMany({
      where: { userId },
    });
  }

  //---------------------------------------------------------------------------------------------------------
  async getInterviewById(id: number): Promise<Interview> {
    const interview = await this.prisma.interview.findUnique({
      where: { id },
    });
    if (!interview) {
      throw new NotFoundException(`Interview with ID ${id} not found`);
    }
    return interview;
  }

  //---------------------------------------------------------------------------------------------------------
  //this gets all the interviews that are in the database
  async getAllInterviews(): Promise<Interview[]> {
  return this.prisma.interview.findMany();
  }
  //---------------------------------------------------------------------------------------------------------
  //this is what updates the interview details
  async updateInterview(id: number, data: Partial<Interview>): Promise<Interview> {
    try {
      return await this.prisma.interview.update({
        where: { id },
        data,
      });
    } catch (err) {
      throw new NotFoundException(`Interview with ID ${id} not found`);
    }
  }
  //---------------------------------------------------------------------------------------------------------
    async deleteInterview(id: number): Promise<Interview> {
    try {
      return await this.prisma.interview.delete({
        where: { id },
      });
    } catch (err) {
      throw new NotFoundException(`Interview with ID ${id} not found`);
    }
  }
}
