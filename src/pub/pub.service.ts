import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PubService {
  constructor(@Inject('CHATTING_SERVICE') private client: ClientProxy){}

  async publishEvent(user : string, chat : string) {
    this.client.emit('chatting', {user, chat});
  }  
}
