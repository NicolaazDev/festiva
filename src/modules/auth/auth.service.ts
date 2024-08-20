import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthResponseDto } from './auth.dto';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';

import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { addHours, isAfter } from 'date-fns';

import { generateVerificationCode } from 'src/utils/generatorCode';

import { UserEntity } from '../db/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private jwtExpirationTime: number;
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {
    this.jwtExpirationTime = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }
  async signIn(email: string, password: string): Promise<AuthResponseDto> {
    const findUser = await this.usersService.findByEmail(email);

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

  async verifyCode(code: string) {
    const user = await this.usersRepository.findOne({
      where: { verificationCode: code },
    });

    if (!user) {
      throw new NotFoundException('Código de verificação não encontrado');
    }

    const currentTime = new Date();

    if (isAfter(currentTime, user.verificationCodeExpires)) {
      throw new NotFoundException('Código de verificação expirado');
    }

    if (user.verificationCode === '000000') {
      throw new ConflictException('Código já verificado');
    }

    user.isConfirmed = true;
    user.verificationCode = '000000';
    await this.usersRepository.save(user);

    throw new HttpException('Email verificado', HttpStatus.OK);
  }

  async generateVerificationCode(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const verificationCode = generateVerificationCode();
    const expiresAt = addHours(new Date(), 1);

    user.verificationCode = verificationCode;
    user.verificationCodeExpires = expiresAt;

    await this.usersService.updateUser(user.id, user);

    await this.emailService.sendVerificationEmail(
      user.email,
      verificationCode,
      user.username,
    );
  }
}
