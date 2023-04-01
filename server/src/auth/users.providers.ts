import { userSchema } from './schemas/user.schema';
import { Connection } from 'mongoose';

//this provider used to create model with the schema. we can use @InjectSchema from @nestjs/mongoose too. but I didn't use this providers before and wanted to test it. ;)
export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', userSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
