import { Injectable } from '@nestjs/common'
import Message, { ICreateMessageDTO } from '../../entity/messages.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { OpenAiProvider } from '../../provider/OpenAI.provider'

@Injectable()
export class MessageService {
  private openAIProvider: OpenAiProvider

  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {
    this.openAIProvider = new OpenAiProvider()
  }

  async createMessage(message: ICreateMessageDTO): Promise<Message> {
    const response = await this.openAIProvider.use(message.content)
    
    const newMessage = new Message({ ...message, response })

    return this.messageRepository.save(newMessage)
  }
}
