import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

//configure nodeMailer module with ejs template for send dynamic mail..
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'amirmabood94040@gmail.com',
          pass: 'fzbuynjhbecwkjgi', //it should be store in env file. TODO
        },
      },
      template: {
        dir: join(__dirname, '..', '..', 'templates'),
        adapter: new EjsAdapter(),
        options: { strict: false },
      },
    }),
  ],
})
export class MailModule {}
