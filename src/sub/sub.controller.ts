import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { SubService } from './sub.service';

@Controller()
export class SubController {
  constructor(private readonly subService: SubService) {}

  @EventPattern('chatting')
  async chattingSubScrib(data: Record<string, unknown>) {
    console.log("chattingSubScrib : ", data)
  }
  
}
