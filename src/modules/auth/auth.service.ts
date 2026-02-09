import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

export interface UserPayload {
  sub: string;
  userName: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email, true);

    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (!isAuthenticated)
      throw new UnauthorizedException('O email ou a senha está incorreto.');

    const payload: UserPayload = {
      sub: user.id,
      userName: user.name,
      role: user.role,
    };

    return {
      user,
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register(data: CreateUserDto, userPassword: string) {
    await this.userService.create(data);
    return this.login(data.email, userPassword);
  }
}
