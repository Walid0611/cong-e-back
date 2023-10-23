import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter<SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'walios.major06@gmail.com',
        pass: 'Wa123456789',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'walios.major06@gmail.com',
      to: 'walid.meftah97@gmail.com',  
      subject: 'Leave Request Submitted',
      text: 'A leave request has been submitted by an employee. Please review and approve it.',
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
