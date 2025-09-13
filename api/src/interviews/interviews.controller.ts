import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { Interview } from '@prisma/client';

@Controller('interviews') // all routes start with /interviews
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  // Create a new interview or OA
  @Post()
  async createInterview(
    @Body()
    body: {
      userId: number;
      company: string;
      stage: string;
      dueDate?: Date;      // optional
      scheduled?: Date;    // optional
    },
  ): Promise<Interview> { // promise is used because we have to wait for the database to respond, only then does it return the interview details
    return this.interviewsService.createInterview(
      body.userId,
      body.company,
      body.stage,
      body.dueDate ? new Date(body.dueDate) : undefined,
      body.scheduled ? new Date(body.scheduled) : undefined,
    );
  }

  // Get all interviews for a specific userIs
  @Get(':userId')
  async getInterviewsByUser(
    @Param('userId') userId: string,
  ): Promise<Interview[]> {
    return this.interviewsService.getInterviewsByUser(Number(userId));
  }

  //this gets all interviews in the database
  @Get()
  async getAll(): Promise<Interview[]> {
    return this.interviewsService.getAllInterviews();
  }


}
