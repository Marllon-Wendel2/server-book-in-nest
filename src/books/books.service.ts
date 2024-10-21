import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Book } from './entities/book.schemas';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(
    createBookDto: CreateBookDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const createdUser = new this.bookModel(createBookDto);
      await createdUser.save();
      return { success: true, message: 'Livro criado com sucesso' };
    } catch (error) {
      const erroMenssage = error as Error;
      return { success: false, message: erroMenssage.message };
    }
  }

  async findAll() {
    try {
      const books = await this.bookModel.find();
      return books;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${(error as Error).message}`);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.bookModel.findById(id).exec();
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao buscar usuário: ${(error as Error).message}`,
      };
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      await this.bookModel.updateOne({ _id: id }, updateBookDto);
      return { success: true, message: 'Atualizado com sucesso' };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao buscar livro: ${(error as Error).message}`,
      };
    }
  }

  async remove(id: string) {
    try {
      await this.bookModel.deleteOne({ _id: id });
      return { success: true, message: 'Deletado com sucesso' };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao buscar usuário: ${(error as Error).message}`,
      };
    }
  }
}
