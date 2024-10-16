import { Controller, Post, Body } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post()
  create(@Body() authUserDto: AuthUserDto) {
    return this.authUserService.auth(authUserDto);
  }
}
