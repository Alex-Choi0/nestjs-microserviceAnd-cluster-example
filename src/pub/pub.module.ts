import { Module } from '@nestjs/common';
import { PubService } from './pub.service';
import { PubController } from './pub.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        REDIS_PORT : Joi.number().default(6379),
        REDIS_HOST : Joi.string().required()
      }),
    }),
    ClientsModule.register([
    {
      name: 'CHATTING_SERVICE',transport: Transport.REDIS,
      options : {
        port : +process.env.REDIS_PORT,
        // port : 6379,
        host : process.env.REDIS_HOST
    }
    }
    ])
  ],
  controllers: [PubController],
  providers: [PubService]
})
export class PubModule {}