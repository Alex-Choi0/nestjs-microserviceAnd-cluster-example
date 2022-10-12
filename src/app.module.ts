import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PubSubModule } from './pubsub/pubsub.module';
import { SocketioModule } from './socketio/socketio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        NESTJS_PORT: Joi.number().default(3000), // NestJS env에서 설정하는 포트. default는 3000
        REDIS_PORT: Joi.number().default(6379),
        REDIS_HOST: Joi.string().required(),
      }),
    }),
    SocketioModule,
    PubSubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
