import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { BooksModule } from 'src/books/books.module';
import { BooksService } from 'src/books/books.service';

@Module({
  providers: [ChatGateway, ChatService, BooksService],
  imports: [BooksModule],
})
export class ChatModule {}
