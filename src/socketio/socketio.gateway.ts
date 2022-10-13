import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, ServerOptions, Socket } from 'socket.io';
import { CreateSocketioDto } from './dto/create-socketio.dto';
import { SocketioService } from './socketio.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketioGateway {
  @WebSocketServer()
  server: Server;
  serverOptions: ServerOptions;

  constructor(private readonly socketioService: SocketioService) {}

  // socketIO에서 chatroom방에 데이터를 보낸다.
  @SubscribeMessage('chatroom')
  create(
    @MessageBody() data: CreateSocketioDto,
    @ConnectedSocket() client: Socket,
  ) {
    // redis서버에 test라는 패턴으로 data를 publish한다.
    this.socketioService.PubSublishEvent('test', data);
  }

  // 해당방에 메세지를 전달한다.
  async sendBroadCast(room: string, broadCastMessage: any) {
    console.log(
      'DateTime : ',
      new Date(),
      ' sendBroadCast : ',
      room,
      ' broadCastMessage : ',
      broadCastMessage,
    );
    // 해당방(room)에 데이터(broadCastMessage)를 전달한다
    return this.server.emit(room, broadCastMessage);
  }
}
