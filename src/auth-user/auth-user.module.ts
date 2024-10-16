import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRECT_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService],
})
export class AuthUserModule {}
