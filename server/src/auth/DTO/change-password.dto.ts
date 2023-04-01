import { IsNotEmpty, IsString } from 'class-validator';

//data transfer object to use our input better and export it easily.
// and also use pipe validation to validate data before do something with that.
export class ChangePasswordDTO {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
