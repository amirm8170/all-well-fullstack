import { JwtModuleAsyncOptions } from '@nestjs/jwt';

//for use env file to store secret, we have to use asyncOption to config our jwt module.
export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    };
  },
};
