import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { SocketioService } from './socketio.service';
import { CreateSocketioDto } from './dto/create-socketio.dto';
import { UpdateSocketioDto } from './dto/update-socketio.dto';
import { EventPattern } from '@nestjs/microservices';

@WebSocketGateway()
export class SocketioGateway {
  constructor(private readonly socketioService: SocketioService) {}

  @SubscribeMessage('createSocketio')
  create(@MessageBody() createSocketioDto: CreateSocketioDto) {
    return this.socketioService.create(createSocketioDto);
  }
}
