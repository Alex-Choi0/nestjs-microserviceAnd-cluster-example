import { Controller, Get, Query } from '@nestjs/common';
import { EventPattern} from '@nestjs/microservices';
import { PubService } from './pub.service';

import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("Pub/Sub API")
@Controller()
export class PubController {
  constructor(private readonly PubService: PubService) {}

  @Get("/publish-event")
  @ApiOperation({
    summary : "채팅내용을 publish",
    description : "채팅내용을 작성해서 redis로 publish하면 해당 redis를 subscrib하는 모든 서버에 데이터가 전달됩니다." 
  })
  @ApiQuery({
    name : 'user',
    description : '채팅을 작성하는 유저 이름',
    type : String,
    example : 'alex'
  })
  @ApiQuery({
    name : 'chat',
    description : '채팅내용을 작성',
    type : String,
    example : 'Hello World'
  })
  async publishEvent(@Query('user') user : string, @Query('chat') chat : string) {
    this.PubService.publishEvent(user, chat);
  }

  @EventPattern({cmd : 'chatting'})
  async chattingSubScrib(data: Record<string, unknown>) {
    console.log("chattingSubScrib : ", data)
  }
  
}
