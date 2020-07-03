import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumberString,
  IsEnum,
  IsISO8601,
  IsEmail,
} from 'class-validator';
import {
  IsStr,
  IsNE,
  MinL,
  MaxL,
  IsNb,
  IsDt,
} from '../../@common/const/messages.const';

import { Genders } from '../../@common/enums/gender.enum';
import { TypeDocs } from '../../@common/enums/typedoc.enum';

export class SignUpDto {
  @IsNotEmpty({ message: IsNE })
  @IsNumberString({}, { message: IsNb })
  @MinLength(6, { message: `El Nombre ${MinL(6)}` })
  @MaxLength(14, { message: `El Nombre ${MaxL(14)}` })
  public readonly identification: number;

  @IsNotEmpty({ message: IsNE })
  @IsString({ message: IsStr })
  @MinLength(3, { message: `El Nombre ${MinL(3)}` })
  @MaxLength(45, { message: `El Nombre ${MaxL(45)}` })
  public readonly name: string;

  @IsNotEmpty({ message: IsNE })
  @IsString({ message: IsStr })
  @MinLength(3, { message: `El Apellido ${MinL(3)}` })
  @MaxLength(45, { message: `El Apellido ${MaxL(45)}` })
  public readonly lastName: string;

  @IsNotEmpty({ message: IsNE })
  @IsString({ message: IsStr })
  @IsEnum(Genders, { message: 'Genero no valido' })
  public readonly gender: Genders;

  @IsISO8601({}, { message: IsDt })
  @IsNotEmpty({ message: IsNE })
  public readonly birthDate: string;

  @IsNotEmpty({ message: IsNE })
  @IsString({ message: IsStr })
  @IsEnum(TypeDocs, { message: 'Tipo de Documento no valido' })
  public readonly typeDoc: TypeDocs;

  @IsNotEmpty({ message: IsNE })
  @IsString({ message: IsStr })
  @MinLength(4, { message: `El usuario ${MinL(4)}` })
  @MaxLength(45, { message: `El usuario ${MaxL(45)}` })
  public readonly userName: string;

  @IsNotEmpty({ message: IsNE })
  @IsString({ message: IsStr })
  @MinLength(4, { message: `La contraseña ${MinL(4)}` })
  @MaxLength(60, { message: `La contraseña ${MaxL(45)}` })
  public readonly password: string;

  @IsNotEmpty({ message: IsNE })
  @IsEmail({}, { message: 'No es un Email Valido' })
  public readonly email: string;
}
