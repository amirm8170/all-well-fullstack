import { ChangePasswordDTO } from './DTO/change-password.dto';
import { User } from './interfaces/user.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { CreateUserDTO } from './DTO/create-user.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Response } from 'express';

// in this file used two ways of create methods in class. signup and login are arrow function and others are normal.just for fun in test ;)
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    private mailerService: MailerService,
    private jwtService: JwtService,
    @InjectPinoLogger(AuthService.name) //use pinoLogger to log our application processes.
    private readonly logger: PinoLogger,
  ) {}

  //signup or create user
  signUp = async (createUserDto: CreateUserDTO): Promise<User> => {
    this.logger.info('signup section');
    //check if email was not registered before.
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new NotFoundException('you registered before!');
    }
    //hash password before save in db.
    const hashPassword = bcrypt.hashSync(createUserDto.password, 10);
    createUserDto.password = hashPassword;
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  };

  //LOGIN
  login = async (
    createUserDto: CreateUserDTO,
    res: Response,
  ): Promise<{ accessToken: string }> => {
    //log login section, easy...
    this.logger.info('login section');
    const { password, email } = createUserDto;
    // check if user's email there is in db or no.
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('invalid email!');
    }
    //check if password is valid.
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      throw new NotFoundException('invalid password!');
    }
    //generate jwt accessToken and return it.
    const payload = { email };
    const accessToken: string = await this.jwtService.sign(payload);
    res.cookie('token', accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: 3600 * 24,
    });
    return { accessToken };
  };

  //this route is for send email with baseUrl/:id to change password.
  async emailToChangePassword(email: string): Promise<string> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('invalid email!');
    } else {
      this.mailerService.sendMail({
        to: email,
        from: 'All-Well',
        subject: 'this is email verification test. ;)',
        template: 'index',
        context: { id: user.id },
        //TODO: it should send ejs file with baseUrl:/userId
      });
      return 'check your mailbox.';
    }
  }

  //change password with check id in params
  async changePassword(
    changePasswordDto: ChangePasswordDTO,
    id: string,
  ): Promise<User> {
    const { password, confirmPassword } = changePasswordDto;
    //first of all check if id has valid type or no and them check if there is  in db or no.
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new NotFoundException('invalid Id!');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('invalid user!');
    }
    // check if password and confirmPasswords are the same!
    if (password !== confirmPassword) {
      throw new NotFoundException('passwords are not the same!');
    }
    //hash password before save in db.
    const hashPassword = bcrypt.hashSync(password, 12);
    //update last password with hashPassword.
    return await this.userModel.findByIdAndUpdate(
      id,
      {
        $set: { password: hashPassword },
      },
      { new: true },
    );
  }

  // check if id is valid, then return that id as response.
  async checkUserId(id: string): Promise<{ id: string }> {
    const isValidId = mongoose.isValidObjectId(id);
    //check if type of id is correct or no!
    if (!isValidId) {
      throw new NotFoundException('invalid Id!');
    }
    //check if this id is valid in db or no.
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('invalid id!');
    }
    return { id };
  }

  // check if user has valid token from header or no and it handles in controller file with @UserGuards annotation.
  checkAuth(): string {
    return 'this user has valid token!';
  }

  //clear cookie and logout.
  logout(res: Response): Response {
    res.clearCookie('token');
    return res.status(200).json({ message: 'logged out!' });
  }
}
