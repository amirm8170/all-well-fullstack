import { JwtStrategy } from './jwt.strategy';
import { MailModule } from '../mail/mail.module';
import { MongoModule } from '../mongo/mongo.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { usersProviders } from './users.providers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt.config';

@Module({
  imports: [
    MongoModule,
    MailModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...usersProviders, JwtStrategy],
})
export class AuthModule {}
