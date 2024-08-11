import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTime: number;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }
  signIn(username: string, password: string): AuthResponseDto {
    const findUser = this.usersService.findUser(username);

    if (!findUser || !compareSync(password, findUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: findUser.id, username: findUser.username };

    const token = this.jwtService.sign(payload);

    return {
      token,
      expireIn: this.jwtExpirationTime,
    };
  }
}
