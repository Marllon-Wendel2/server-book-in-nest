import { Book } from './../books/schemas/book.schemas';
import { BooksService } from './../books/books.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  constructor(private readonly bookService: BooksService) {}

  addMessage(message: string) {}

  async getAllMessages(): Promise<Book[]> {
    return await this.bookService.findAll();
  }
}
