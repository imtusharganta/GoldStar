import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],         // gives access to PrismaService
  controllers: [UsersController],  // registers your users routes
  providers: [UsersService],       // makes UsersService available
  exports: [UsersService],         // export if other modules need it later
})
export class UsersModule {}
