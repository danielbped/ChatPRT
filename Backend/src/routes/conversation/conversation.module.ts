
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConversationService } from './conversation.service'
import { ConversationController } from './conversation.controller'
import Conversation from '../../entity/conversation.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Conversation])],
  providers: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}