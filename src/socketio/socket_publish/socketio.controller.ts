import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SocketioGateway } from '../socketio.gateway';

@Controller('socketio')
export class SocketioController {
  constructor(private readonly socketioGateway: SocketioGateway) {}

  // Redis에서 test패턴을 Subscribe하고 해당 메세지가 들어오면 socketIO에 BroadCast한다.
  @EventPattern('test')
  async chattingSubScrib(data: Record<string, unknown>) {
    console.log('chattingSubScrib : ', data);
    // Redis의 test패턴에서 Sub한 데이터를 socketIO로 BroadCast한다.
    // 위 코드에서는 chatroom으로 고정한다.
    this.socketioGateway.sendBroadCast('chatroom', data);
    console.log('BroadCast Message from chattingSubScrib');
  }
}
