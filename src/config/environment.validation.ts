import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  API_SECRET_KEY: string;

  @IsOptional()
  @IsString()
  PORT?: string;

  @IsOptional()
  @IsString()
  NODE_ENV?: string;
}
