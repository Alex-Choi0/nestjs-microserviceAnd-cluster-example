import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateSocketioDto } from './dto/create-socketio.dto';

@Injectable()
export class SocketioService {
  constructor(@Inject('CHATTING_SERVICE') private client: ClientProxy) {}

  // 유저한테 받은 메세지를 redis로 publish함.
  async PubSublishEvent(pubsub: string, data: CreateSocketioDto) {
    data.time = new Date();
    // pubsub은 redis에 publish할 패턴명
    this.client.emit(pubsub, data);
  }
}
