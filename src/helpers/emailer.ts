import { createTransport } from 'nodemailer';

const secure_configuration = JSON.parse(process.env.EMAILER_CONFIG||'{}');

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: secure_configuration.EMAIL_USERNAME,
        pass: secure_configuration.PASSWORD,
        clientId: secure_configuration.CLIENT_ID,
        clientSecret: secure_configuration.CLIENT_SECRET,
        refreshToken: secure_configuration.REFRESH_TOKEN
    }
});

export class MailConfigurations {
  from;
  to;
  subject;
  html;
  attachments;
  constructor(from: string, to: string, subject: string, html: string, attachments = []) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.html = html;
    this.attachments = attachments;
  }
}

export function sendMail(mailConfigurations: MailConfigurations) {
  transporter.sendMail(mailConfigurations, function (error: any, info: any) {
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(info);
  });
};