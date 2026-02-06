import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class EnvironmentVariables {
  @IsOptional()
  @IsString()
  API_SECRET_KEY?: string;

  @IsOptional()
  @IsString()
  PORT?: string;

  @IsOptional()
  @IsString()
  DB_NAME?: string;

  @IsOptional()
  @IsString()
  DB_SYNCHRONIZE?: string;

  @IsOptional()
  @IsString()
  CORS_ORIGINS?: string;

  @IsOptional()
  @IsString()
  NODE_ENV?: string;
}
