import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

import { IsNE, IsStr, MinL, MaxL } from './../../common/const/messages.const';

export class ResetPasswordDto {
  @IsNotEmpty({ message: IsNE })
  @IsString({ message: IsStr })
  public readonly token: string;

  @IsNotEmpty({ message: IsNE })
  @IsString({ message: IsStr })
  @MinLength(4, { message: `la contraseña ${MinL(4)}` })
  @MaxLength(45, { message: `la contraseña ${MaxL(45)}` })
  public readonly newPassword: string;
}
