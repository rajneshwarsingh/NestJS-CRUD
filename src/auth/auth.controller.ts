/*
 * @file: auth.controller.ts
 * @description:  It contain controller funcations layer for auth.controller.
 * @author: Rajneshwar Singh
 */

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDTO, signInDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() payload: signUpDTO) {
    return this.authService.signUp(payload);
  }

  @Post('signIn')
  signIn(@Body() payload: signInDTO) {
    return this.authService.signIn(payload);
  }
}
