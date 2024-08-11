import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';

import { AuthController } from './modules/auth/auth.controller';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DynamooseModule.forRoot({
      aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
