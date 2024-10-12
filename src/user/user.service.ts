import { User } from './../schemas/user.schemas';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/user/dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ success: boolean; message: string }> {
    const { password, ...userData } = createUserDto;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      const newUser = new this.userModel({
        ...userData,
        hashPassword,
        salPassword: salt,
      });
      const createdUser = new this.userModel(newUser);
      await createdUser.save();
      return { success: true, message: 'Usuario inserido com sucesso' };
    } catch (error) {
      const erroMenssage = error as Error;
      return { success: false, message: erroMenssage.message };
    }
  }

  async getUser(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${(error as Error).message}`);
    }
  }

  async getUserById(
    userId: string,
  ): Promise<
    { success: boolean; user: User } | { success: boolean; message: string }
  > {
    try {
      const user = await this.userModel.findById(userId).exec();
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao buscar usuário: ${(error as Error).message}`,
      };
    }
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.userModel.updateOne({ _id: id }, updateUserDto);
      return { success: true, message: 'Atualizado com sucesso' };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao buscar usuário: ${(error as Error).message}`,
      };
    }
  }

  async deleteUser(id: string): Promise<{ success: boolean; message: string }> {
    try {
      await this.userModel.deleteOne({ _id: id });
      return { success: true, message: 'Deletado com sucesso' };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao buscar usuário: ${(error as Error).message}`,
      };
    }
  }
}
