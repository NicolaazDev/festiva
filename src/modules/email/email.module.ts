import { Module, Global } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { config } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: configService.get<string>('SMTP_HOST'),
        port: +configService.get<number>('SMTP_PORT'),
        ignoreTLS: true,
        secure: false,
        auth: {
          user: configService.get<string>('SMTP_USERNAME'),
          pass: configService.get<string>('SMTP_PASSWORD'),
        },
      },
    }),
    ConfigModule,
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
