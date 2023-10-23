import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post('send')
  async sendEmail(@Body() data) {
    const { to, subject, text } = data;
    return await this.emailService.sendEmail(to, subject, text);
  }
}
