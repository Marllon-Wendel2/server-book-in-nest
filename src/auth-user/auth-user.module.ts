import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthUserController],
  providers: [AuthUserService],
})
export class AuthUserModule {}
