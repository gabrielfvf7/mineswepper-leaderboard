import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EnvironmentVariables } from './config/environment.validation';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: async (config: Record<string, unknown>) => {
        const validatedConfig = plainToInstance(EnvironmentVariables, config, {
          enableImplicitConversion: true,
        });
        const errors = await validate(validatedConfig, {
          skipMissingProperties: false,
        });
        if (errors.length > 0) {
          throw new Error(
            `Configuration validation failed: ${errors.map((e) => Object.values(e.constraints || {}).join(', ')).join('; ')}`,
          );
        }
        return validatedConfig;
      },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'leaderboard.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // APENAS para desenvolvimento
    }),
    ScoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
