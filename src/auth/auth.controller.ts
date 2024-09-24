import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto, signInSchema } from './dto/sign-in.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  @UsePipes(new ZodValidationPipe(signInSchema))
  signIn(@Body() signInDto: signInDto, @Response() res) {
    return this.authService.signIn(signInDto, res);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
