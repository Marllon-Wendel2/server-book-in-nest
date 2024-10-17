import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schemas';

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;
  private readonly jwtService: JwtService;
  @InjectModel('User') private userModel: Model<User>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const token = await uuidv4().slice(0, 8);
    const link: string = `http://localhost:3000/email-confirmation/${token}`;

    const user = await this.userModel.findOne({ email: to });
    if (!user) {
      return { success: false, message: 'Usuário não encontrado.' };
    }

    if (user.emailConfirmed) {
      return { success: false, message: 'E-mail já confirmado' };
    }
    user.confimationToken = token;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html: `
        <html>
        <body>
          <p>Olá,</p>
          <p>Por favor, clique no link abaixo para confirmar seu e-mail:</p>
          <a href="${link}">Confirmar e-mail</a>
          <p>Se você não solicitou este e-mail, ignore esta mensagem.</p>
        </body>
        </html>
    `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('E-mail enviado: ', info.response);
      return { success: true, message: 'E-mail enviado com sucesso.' };
    } catch (error) {
      console.error('Erro ao enviar e-mail: ', error);
      return { success: false, message: 'Erro ao enviar e-mail.' };
    }
  }
}
