import { IsString, IsNotEmpty } from 'class-validator';

export class TestDto {
  @IsNotEmpty()
  @IsString()
  readonly module: string;

  @IsNotEmpty()
  readonly arrayRes: item[];
}

interface item {
  readonly res: string;
}
