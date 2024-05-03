import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Conversation, { ICreateConversationDTO } from '../../entity/conversation.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async getConversationsByUserId(id: string): Promise<Conversation[]> {
    return this.conversationRepository.find({
      where: { user: { id } },
      relations: ['user', 'messages'],
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
        messages: true
      }
    })
  }

  async createConversation(conversation: ICreateConversationDTO): Promise<Conversation> {
    const newConversation = new Conversation(conversation)    

    return this.conversationRepository.save(newConversation)
  }

  async deleteConversation(id: string): Promise<void> {
    await this.conversationRepository.delete(id)
  }
}
