
import { Body, Controller, Get, Post ,Res,Req,UseGuards,Request } from '@nestjs/common';
import { Response } from "express";
// auth
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { RefreshJwtGuard } from './guard/refresh-jwt-auth.guard';

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { GoogleGuardPrueba } from './guard/google-oauth-prueba.guard';
import { GoogleJwtGuard } from './guard/google-oauth-verify.guard';


@ApiTags('auth')
@Controller('auth')
export class AuthController {

    
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterAuthDto,
  ) {
    return this.authService.register(registerDto);
  }
  
  @Post('login')
  login(
    @Body()
    loginDto: LoginAuthDto, @Res({ passthrough: true }) response: Response
  ) {
    const data = this.authService.login(loginDto);
    return data;
  }

  @UseGuards(RefreshJwtGuard)
  //@ApiBearerAuth()
  @Post('refresh')
  refresh(@Request() req) {
    console.log("llega a controller 03")
    const data = this.authService.refreshToken(req.user);
    return data;
  }
  
  @Get('google')
  @UseGuards(GoogleGuardPrueba)
  async googleAuth(@Req() req) { 
  }

  @Get('google/callback')
  @UseGuards(GoogleGuardPrueba)
  googleAuthRedirect(@Req() req) {

    return req.data
  }
  

  @Post('google/verify')
  @UseGuards(GoogleJwtGuard)
  googleAuthVerify(@Request() req) {  
    console.log(req.user)
    const data = this.authService.GoogleLoginToken(req.user);
    return data;
  }

}
