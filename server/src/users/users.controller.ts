import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('register')
  async register(@Body() post) {
    return await this.userService.create(post);
  }
  @Get('list')
  async getData() {
    return await this.userService.findAll();
  }
}
