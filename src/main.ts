import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS - apenas seu domínio pode fazer requisições
  app.enableCors({
    origin: [
      'http://localhost:5173', // Vite dev
      'http://localhost:3000', // React dev
      'https://gabrielfvf7.github.io', // Seu site em produção
      'http://localhost:4173', // Vite preview
    ],
    credentials: true,
    methods: ['GET', 'POST'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
