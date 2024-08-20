import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

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
}
