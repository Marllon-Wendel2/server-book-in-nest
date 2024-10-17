import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';

@Module({
  imports: [UserModule, JwtModule, NodemailerModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
