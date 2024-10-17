import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule, UserModule],
  providers: [NodemailerModule, NodemailerService],
  exports: [NodemailerService, NodemailerModule],
})
export class NodemailerModule {}
