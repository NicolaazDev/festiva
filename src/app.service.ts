import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new ConflictException('Method not implemented.');
  }
}
