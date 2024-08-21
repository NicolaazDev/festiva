import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendVerificationEmail(email: string, code: string, username: string) {
    const templateSource = fs.readFileSync('src/templates/index.html', 'utf8');
    const template = handlebars.compile(templateSource);

    const htmlToSend = template({ email, code });

    const mailOptions = {
      from: 'johanhenrique18@gmail.com',
      to: email,
      subject: 'Confirme seu Email',
      html: htmlToSend,
    };

    try {
      await this.mailerService.sendMail(mailOptions);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Erro ao enviar email de verificação');
    }
  }

  async sendPasswordResetEmail(email: string, code: string) {
    const templateSource = fs.readFileSync(
      'src/templates/indexReset.html',
      'utf8',
    );
    const template = handlebars.compile(templateSource);

    const productionUrl = await this.configService.get('PRODUCTION_URL');

    const url = `${productionUrl}/auth/reset-password?token=${code}`;

    const htmlToSend = template({ url });

    const mailOptions = {
      from: 'johanhenrique18@gmail.com',
      to: email,
      subject: 'Confirme seu Email',
      html: htmlToSend,
    };

    try {
      await this.mailerService.sendMail(mailOptions);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Erro ao enviar email de verificação');
    }
  }
}
