import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';

import { v4 as uuidv4 } from 'uuid';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDto) {
    const userHasExists = await this.usersRepository.findOne({
      where: { username: user.username },
    });

    if (userHasExists) {
      throw new ConflictException('Usuário já existente');
    }

    const dbUser = new UserEntity();
    dbUser.id = uuidv4();
    dbUser.username = user.username;
    dbUser.hashPassword = hashSync(user.password, 10);

    const { id, username } = await this.usersRepository.save(dbUser);

    return { id, username };
  }

  async findUser(username: string): Promise<UserDto | null> {
    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      password: user.hashPassword,
    };
  }
}
