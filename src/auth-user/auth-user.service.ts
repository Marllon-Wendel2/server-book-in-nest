import { Injectable } from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schemas';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthUserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async auth(
    authUserDto: AuthUserDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const user = await this.userModel.findOne({
        usuario: authUserDto.usuario,
      });
      if (!user) {
        return { success: false, message: 'Usúario não encontrado.' };
      } else {
        const isMatch = await bcrypt.compare(
          authUserDto.password,
          user.hashPassword,
        );
        console.log(isMatch);
        if (!isMatch) {
          return { success: false, message: 'Não foi possível autenticar.' };
        } else {
          return { success: true, message: 'Autenticado com sucesso.' };
        }
      }
    } catch (error) {
      const erroMenssage = (error as Error).message;
      return { success: false, message: erroMenssage };
    }
  }
}
