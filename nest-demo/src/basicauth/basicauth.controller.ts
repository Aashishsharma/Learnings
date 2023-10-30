import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { BasicauthService } from './basicauth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class BasicAuthController {
  constructor(private authService: BasicauthService) {}

  // example request -
  // http://localhost:3000/auth/login
  // body -
  //   {
  //     "username": "ABC",
  //     "password": "PQR"
  // }

  // response -
  // {
  //     "message": "Unauthorized",
  //     "statusCode": 401
  // }

  //   body - {
  //     "username": "john",
  //     "password": "changeme"
  // }

  // response -
  // {
  //     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiam9obiIsImlhdCI6MTY5ODY2Mzc0MSwiZXhwIjoxNjk4NjYzODAxfQ.dVFSbm1QSfkIm7XTPc0d5d6fk354MgkMTO_uGvWvIKg"
  //}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  // http://localhost:3000/auth/profile
  // response -
  // {
  //     "message": "Unauthorized",
  //     "statusCode": 401
  // }

  // with headers
  // Authorization Type = Bearer JWT in postman
  // Token = access token from the login endpoint

  // Response
  // {
  //     "sub": 1,
  //     "username": "john",
  //     "iat": 1698664346,
  //     "exp": 1698664406
  // }

  // token expires in 60 sec - see auth.module.ts for this setting

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
