import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';

import { v4 as uuidv4 } from 'uuid';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];
  create(user: UserDto) {
    user.id = uuidv4();
    user.password = hashSync(user.password, 10);

    this.users.push(user);
    console.log(this.users);
  }

  findUser(username: string): UserDto | null {
    return this.users.find((user) => user.username === username);
  }
}
