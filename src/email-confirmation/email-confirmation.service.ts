import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schemas';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async confirmEmail(token: string) {
    const user = await this.userModel.findOne({ confimationToken: token });

    if (!user) {
      return { success: false, message: 'Usúario não encontrado' };
    } else if (user.emailConfirmed) {
      return { success: false, message: 'E-mail já confirmado' };
    } else {
      user.emailConfirmed = true;
      await user.save();
      return { success: true, message: 'E-mail foi confirmado com sucesso!' };
    }
  }
}
