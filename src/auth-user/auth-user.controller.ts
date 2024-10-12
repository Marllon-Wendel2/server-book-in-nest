import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post(':id')
  create(@Body() authUserDto: AuthUserDto, @Param('id') id: string) {
    return this.authUserService.auth(authUserDto);
  }
}
