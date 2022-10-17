import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Redis MicroService 연결(PubSub/Sub기능 구현)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS, // transport유형 : 여기서는 Redis로 한다.
    options: {
      port: +process.env.REDIS_PORT, // Redis port 지정. 보통 redis서버는 포트가 6379이다
      host: process.env.REDIS_HOST, // redis 경로
      password: process.env.REDIS_PASSWORD || null, // redis 비밀번호(필요시)
    },
  });

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
    .setTitle('NestJS-MicroService-UseRedisPub/Sub-Example')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // Swagger Document의 문서를 api(/api-docs)로 설정할수 있게 셋팅
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.startAllMicroservices(); // 마이크로서비스 활성화
  await app.listen(+process.env.NESTJS_PORT);
  console.log('REDIS PORT : ', process.env.REDIS_PORT);
  console.log('REDIS HOST : ', process.env.REDIS_HOST);
  console.log('NestJS Port : ', process.env.NESTJS_PORT);
}
bootstrap();
