import * as mongoose from 'mongoose';

//for connect to DB we can use @InjectConnection() too, but I didn't use this provide way before, so I decided to test it with your test application ;).
export const mongoProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_URI),
  },
];
