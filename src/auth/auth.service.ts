import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { signInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: signInDto, res: Response): Promise<any> {
    const user = await this.usersService.findOne(signInDto.email);
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, role: user.role };
    console.log(' sign payload: ', payload);

    const token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 20,
    });
    //console.log(res.getHeaders()['set-cookie']);
    return res.json({ message: 'success' });
  }
}
