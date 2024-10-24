import { Book } from './../books/schemas/book.schemas';
import { BooksService } from './../books/books.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  constructor(private readonly bookService: BooksService) {}

  async addMessage(id: string, autor: string, message: string) {
    try {
      await this.bookService.createComent(id, autor, message);
    } catch (error) {
      return error;
    }
  }

  async getAllMessages(): Promise<Book[]> {
    return await this.bookService.findAll();
  }
}
