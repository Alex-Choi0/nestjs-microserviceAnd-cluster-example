import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PubSubController } from './pubsub.controller';
import { PubSubService } from './pubsub.service';

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
  controllers: [PubSubController],
  providers: [PubSubService],
})
export class PubSubModule {}
