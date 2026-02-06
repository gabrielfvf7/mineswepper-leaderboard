import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const defaultOrigins = [
    'http://localhost:5173', // Vite dev
    'http://localhost:3000', // React dev
    'https://gabrielfvf7.github.io', // Seu site em produção
    'http://localhost:4173', // Vite preview
  ];
  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)
    : defaultOrigins;

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
