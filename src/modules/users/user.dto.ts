import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
