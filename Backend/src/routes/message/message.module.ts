
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageService } from './message.service'
import { MessageController } from './message.controller'
import Message from '../../entity/messages.entity'
import { OpenAiProvider } from '../../provider/OpenAI.provider'

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService, OpenAiProvider],
  controllers: [MessageController],
})
export class MessageModule {}