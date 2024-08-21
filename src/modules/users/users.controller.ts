import { Body, Controller, Post, Put, Param, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  createUser(@Body() user: UserDto) {
    return this.usersService.create(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userDto: UserDto) {
    return await this.usersService.updateUser(id, userDto);
  }
}
