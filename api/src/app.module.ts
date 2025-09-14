import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 👇 import your feature modules
import { UsersModule } from './users/users.module';
import { InterviewsModule } from './interviews/interviews.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, InterviewsModule, PrismaModule], // 👈 hook them in
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
