import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.enableCors();
  // Call the configureSwagger method
  const appModule = app.get(AppModule);
  appModule.configureSwagger(app);

  await app.listen(3000);
}
bootstrap();
