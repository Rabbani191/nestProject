import {
  INestApplication,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CatsModule } from './cats/cats.module';
import { logger } from './middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  //logger middleware configuration
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(CatsController);
  }

  // swagger configuration
  configureSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('Cat Crud')
      .setDescription('Cat crud operations using nest js')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}
