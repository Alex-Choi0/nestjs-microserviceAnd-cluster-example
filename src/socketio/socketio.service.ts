import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateSocketioDto } from './dto/create-socketio.dto';
import { UpdateSocketioDto } from './dto/update-socketio.dto';

@Injectable()
export class SocketioService {
  constructor(@Inject('CHATTING_SERVICE') private client: ClientProxy) {}

  // 유저한테 받은 메세지를 redis로 publish함.
  async PubSublishEvent(pubsub: string, data: any) {
    this.client.emit(pubsub, data);
  }

  create(dto: CreateSocketioDto) {
    return dto;
  }

  findAll() {
    return `This action returns all socketio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socketio`;
  }

  update(id: number, updateSocketioDto: UpdateSocketioDto) {
    return `This action updates a #${id} socketio`;
  }

  remove(id: number) {
    return `This action removes a #${id} socketio`;
  }
}
