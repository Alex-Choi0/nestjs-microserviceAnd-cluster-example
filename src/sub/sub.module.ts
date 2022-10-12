import { Module } from '@nestjs/common';
import { SubService } from './sub.service';
import { SubController } from './sub.controller';

@Module({
  imports:[],
  controllers: [SubController],
  providers: [SubService]
})
export class SubModule {}
