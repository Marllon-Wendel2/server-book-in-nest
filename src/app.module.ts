import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthUserModule } from './auth-user/auth-user.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { NodemailerService } from './nodemailer/nodemailer.service';
import { NodemailerModule } from './nodemailer/nodemailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_CONNECT_STRING, {
      dbName: 'club-livros',
    }),
    UserModule,
    AuthUserModule,
    EmailConfirmationModule,
    NodemailerModule,
  ],
  controllers: [AppController],
  providers: [AppService, NodemailerService],
})
export class AppModule {}
