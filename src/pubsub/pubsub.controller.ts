import { Controller, Get, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PubSubService } from './pubsub.service';

@ApiTags('PubSub/Sub API')
@Controller()
export class PubSubController {
  constructor(private readonly PubSubService: PubSubService) {}

  @Get('/PubSublish-event')
  @ApiOperation({
    summary: '채팅내용을 PubSublish',
    description:
      '채팅내용을 작성해서 redis로 PubSublish하면 해당 redis를 subscrib하는 모든 서버에 데이터가 전달됩니다.',
  })
  @ApiQuery({
    name: 'user',
    description: '채팅을 작성하는 유저 이름',
    type: String,
    example: 'alex',
  })
  @ApiQuery({
    name: 'chat',
    description: '채팅내용을 작성',
    type: String,
    example: 'Hello World',
  })
  async PubSublishEvent(
    @Query('user') user: string,
    @Query('chat') chat: string,
  ) {
    this.PubSubService.PubSublishEvent(user, chat);
  }

  @EventPattern('test')
  async chattingSubScrib(data: Record<string, unknown>) {
    console.log('chattingSubScrib : ', data);
  }
}
