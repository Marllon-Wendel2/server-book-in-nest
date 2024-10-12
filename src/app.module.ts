import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthUserModule } from './auth-user/auth-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_CONNECT_STRING, {
      dbName: 'club-livros',
    }),
    UserModule,
    AuthUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
