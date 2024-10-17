import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schemas';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly nodemailerService: NodemailerService,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  @Post('send')
  async sendEmailForConfirmation(
    @Body('email') email: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
  ) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return { success: false, message: 'E-mail não cadastrado!' };
    } else {
      return await this.nodemailerService.sendMail(email, subject, text);
    }
  }

  @Get(':token')
  async confirmEmail(@Param('token') token: string) {
    return this.emailConfirmationService.confirmEmail(token);
  }
}
