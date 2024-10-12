import { Injectable } from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthUserService {
  auth(id: string, authUserDto: AuthUserDto): Promise {
    ;
  }
}
