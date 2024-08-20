import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UserDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @IsString()
  @IsOptional()
  verificationCode?: string;

  @IsOptional()
  @IsString()
  verificationCodeExpires?: Date;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  isConfirmed?: boolean;

  @IsString()
  @IsOptional()
  verificationCode?: string;

  @IsDateString()
  @IsOptional()
  verificationCodeExpires?: Date;
}
