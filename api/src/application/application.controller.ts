import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from '@prisma/client'; // <-- Use Prisma type, no need for manual interface

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationsService: ApplicationService) {}

  // Create new application
  @Post()
  async createApplication(
    @Body()
    body: {
      userId: number;
      company: string;
      position: string;
      status: string;
      appliedDate?: Date;
    },
  ): Promise<Application> {
    return this.applicationsService.createApplication(
      body.userId,
      body.company,
      body.position,
      body.status,
      body.appliedDate ? new Date(body.appliedDate) : undefined,
    );
  }

  // Get all applications for a user
  @Get('user/:userId')
  async getApplicationsByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Application[]> {
    return this.applicationsService.getApplicationsByUser(userId);
  }

  // Get single application by ID
  @Get(':id')
  async getApplicationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Application> {
    return this.applicationsService.getApplicationById(id);
  }

  // Get all applications
  @Get()
  async getAll(): Promise<Application[]> {
    return this.applicationsService.getAllApplications();
  }

  // Update application
  @Patch(':id')
  async updateApplication(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Application>,
  ): Promise<Application> {
    return this.applicationsService.updateApplication(id, data);
  }

  // Delete application
  @Delete(':id')
  async deleteApplication(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Application> {
    return this.applicationsService.deleteApplication(id);
  }
}
