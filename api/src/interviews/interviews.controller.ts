import {Controller, Post, Get, Patch, Delete, Body, Param, ParseIntPipe,} from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { Interview } from '@prisma/client';

@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  //---------------------------------------------------------------------------------------------------------
  // Create a new interview or OA
  @Post()
  async createInterview(
    @Body()
    body: {
      userId: number;
      company: string;
      stage: string;
      dueDate?: Date;
      scheduled?: Date;
    },
  ): Promise<Interview> {
    return this.interviewsService.createInterview(
      body.userId,
      body.company,
      body.stage,
      body.dueDate ? new Date(body.dueDate) : undefined,
      body.scheduled ? new Date(body.scheduled) : undefined,
    );
  }

  //---------------------------------------------------------------------------------------------------------
  // Get all interviews for a specific user
  @Get('user/:userId')
  async getInterviewsByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Interview[]> {
    return this.interviewsService.getInterviewsByUser(userId);
  }

  //---------------------------------------------------------------------------------------------------------
  // Get a single interview by ID
  @Get(':id')
  async getInterviewById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Interview> {
    return this.interviewsService.getInterviewById(id);
  }

  //---------------------------------------------------------------------------------------------------------
  // Get all interviews in the database
  @Get()
  async getAll(): Promise<Interview[]> {
    return this.interviewsService.getAllInterviews();
  }

  //---------------------------------------------------------------------------------------------------------
  // Update an interview
  @Patch(':id')
  async updateInterview(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Interview>,
  ): Promise<Interview> {
    return this.interviewsService.updateInterview(id, data);
  }

  //---------------------------------------------------------------------------------------------------------
  // Delete an interview
  @Delete(':id')
  async deleteInterview(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Interview> {
    return this.interviewsService.deleteInterview(id);
  }
}
