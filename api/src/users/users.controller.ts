import { Controller, Get, Post, Body } from '@nestjs/common'; //controllers handle incoming requests and return responses
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  // creating a new user
  @Post()
  create(@Body() body: { email: string; name: string }) {
    return this.usersService.createUser(body.email, body.name);
  }

  // getting the user details
  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }
}
