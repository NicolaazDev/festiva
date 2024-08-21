import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../db/entities/user.entity';
import { PasswordReset } from '../db/entities/passwordreset.entity';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity, PasswordReset])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
