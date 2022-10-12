import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("REDIS PORT : ", +process.env.REDIS_PORT);
  console.log("REDIS HOST : ", process.env.REDIS_HOST);
  // Redis MicroService 연결(Pub/Sub기능 구현)
  app.connectMicroservice<MicroserviceOptions>({
    transport : Transport.REDIS,
    options : {
      port : +process.env.REDIS_PORT,
      host : process.env.REDIS_HOST
    }
  })

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('NestJS-MicroService-Example')
    .setVersion('1.1')
    .addBearerAuth()
    .build();

  // Swagger Document의 문서를 api(/api-docs)로 설정할수 있게 셋팅
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.startAllMicroservices()
  await app.listen(+process.env.NESTJS_PORT);
  console.log('NestJS Port : ', process.env.NESTJS_PORT);
}
bootstrap();
