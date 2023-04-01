import { Document } from 'mongoose';

//interface for each user to handle types easier.
export interface User extends Document {
  readonly id: string;
  readonly email: string;
  readonly password: string;
}
