import { INestApplication, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CatsService } from './cats/services/cats.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {

  configureSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('Your API Title')
      .setDescription('Your API Description')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}
