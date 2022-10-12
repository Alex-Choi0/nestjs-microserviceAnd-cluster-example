import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {


  @EventPattern('chatting')
  async subScribRedis(data: Record<string, unknown>) {
    console.log("subScribtion")
    console.log(data);
  }
}
