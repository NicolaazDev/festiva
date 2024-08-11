import { IsNotEmpty, IsString } from 'class-validator';

export class AuthResponseDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  expireIn: number;
}
