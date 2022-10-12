import { Injectable } from '@nestjs/common';
import { CreateSocketioDto } from './dto/create-socketio.dto';
import { UpdateSocketioDto } from './dto/update-socketio.dto';

@Injectable()
export class SocketioService {
  create(createSocketioDto: CreateSocketioDto) {
    return 'This action adds a new socketio';
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
