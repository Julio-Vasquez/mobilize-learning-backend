import { IsString, IsNotEmpty, IsMongoId, MinLength } from 'class-validator';
import { IsStr, IsNE, MinL } from '../../@common/const/messages.const';

export class GetModuleDto {
  @IsNotEmpty({ message: IsNE })
  @IsString({ message: IsStr })
  @IsMongoId({ message: 'No es un ObjectId valido de mongoDB' })
  readonly _id: string;

  @IsNotEmpty({ message: IsNE })
  @IsString({ message: IsStr })
  @MinLength(2, { message: `La url ${MinL(2)}` })
  readonly url: string;
}
