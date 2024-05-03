import { ApiProperty } from '@nestjs/swagger'
import Conversation from '../entity/conversation.entity'

export class MessageSchemaBody {
  @ApiProperty({
    type: String,
    description: 'Conteúdo da mensagem a ser enviada',
    minLength: 3,
    nullable: false,
    example: 'Qual é a resposta para a vida, o universo e tudo mais?'
  })
  content: string
  @ApiProperty({
    type: Conversation,
    description: 'Conversation em que a mensagem está inserida.',
    nullable: false,
    example: {
      id: '123456789',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        id: '42',
        firstName: 'Douglas',
        lastName: 'Adams',
        email: 'douglasadams@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }
  })
  conversation: Conversation
}

export class MessageSchemaResponse extends MessageSchemaBody {
  @ApiProperty({
    type: String,
    example: '123456789'
  })
  id: string
  @ApiProperty({
    type: Date,
    example: new Date()
  })
  createdAt: Date
  @ApiProperty({
    type: Date,
    example: new Date()
  })
  updatedAt: Date
}