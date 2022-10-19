import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SocketioGateway } from './socketio.gateway';
import { SocketioService } from './socketio.service';
import { SocketioController } from './socket_publish/socketio.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        REDIS_PORT: Joi.number().default(6379),
        REDIS_HOST: Joi.string().required(),
      }),
    }),
    // Redis에 Publish하기 위한 셋팅
    ClientsModule.register([
      {
        name: 'CHATTING_SERVICE',
        transport: Transport.REDIS,
        options: {
          port: +process.env.REDIS_PORT,
          // port : 6379,
          host: process.env.REDIS_HOST,
          password: process.env.REDIS_PASSWORD || null,
        },
      },
    ]),
  ],
  providers: [SocketioGateway, SocketioService],
  controllers: [SocketioController],
})
export class SocketioModule {}
