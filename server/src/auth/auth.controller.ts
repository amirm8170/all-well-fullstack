import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDTO } from './DTO/change-password.dto';
import { User } from './interfaces/user.interface';
import { Response } from 'express';

@Controller('v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //signup route
  @Post('/signup')
  async signup(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return await this.authService.signUp(createUserDTO);
  }

  //LOGIN route
  @Post('/login')
  async login(
    @Body() createUserDto: CreateUserDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    return await this.authService.login(createUserDto, res);
  }

  //this route is for send email to change password and user should send his email in body
  @Post('/email-change-password')
  async emailToChangePassword(@Body('email') email: string): Promise<string> {
    return await this.authService.emailToChangePassword(email);
  }

  //check id before redirect to the changePassword page.

  //check if id of query is correct so redirect to changePassword page.
  @Put('/change-password/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDTO,
  ): Promise<User> {
    return await this.authService.changePassword(changePasswordDto, id);
  }

  //this route is for check if id in params is valid or no. and if this id is valid so in client side, user can see change password page.
  @Get('/auth/:id')
  async checkUserId(@Param('id') id: string): Promise<{ id: string }> {
    return await this.authService.checkUserId(id);
  }

  //this route protected with jwt, for check that if token is valid or no.just with decorators. magic developing with Nest :)
  @UseGuards(AuthGuard())
  @Get('/auth')
  checkAuth(): string {
    return this.authService.checkAuth();
  }

  //this is routes handles logout and clear cookie.
  @Get('/logout')
  logout(@Res() res: Response): Response {
    return this.authService.logout(res);
  }
}
