import { Injectable } from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schemas';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async auth(
    authUserDto: AuthUserDto,
  ): Promise<
    | { success: boolean; message: string }
    | { success: boolean; message: string; token: string }
  > {
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
          const token = await this.generatesJWT(user);
          return { success: true, message: 'Autenticado com sucesso.', token };
        }
      }
    } catch (error) {
      const erroMenssage = (error as Error).message;
      return { success: false, message: erroMenssage };
    }
  }

  async generatesJWT(user: User) {
    const payload = { usuario: user.usuario };
    return this.jwtService.sign(payload);
  }
}
