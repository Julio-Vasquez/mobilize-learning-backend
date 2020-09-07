import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { IsStr, IsNE, MinL } from '../../@common/const/messages.const';

export class UrlDto {

  @IsNotEmpty({ message: IsNE })
  @IsString({ message: IsStr })
  @MinLength(2, { message: `La url ${MinL(2)}` })
  readonly url: string;
}
