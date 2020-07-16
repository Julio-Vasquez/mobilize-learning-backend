import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { IsStr, IsNE, MinL, MaxL } from '../../@common/const/messages.const';

export class CertificateDto {
  @IsNotEmpty({ message: IsNE })
  @IsString({ message: IsStr })
  @MinLength(4, { message: `El usuario ${MinL(4)}` })
  @MaxLength(45, { message: `El usuario ${MaxL(45)}` })
  public readonly userName: string;
}
