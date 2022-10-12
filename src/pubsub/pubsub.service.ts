import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PubSubService {
  constructor(@Inject('CHATTING_SERVICE') private client: ClientProxy) {}

  async PubSublishEvent(user: string, chat: string) {
    this.client.emit('test', { user, chat });
  }
}
