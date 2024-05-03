import { ApiProperty } from '@nestjs/swagger'
import User from '../entity/user.entity'

export class ConversationSchemaBody {
  @ApiProperty({
    type: User,
    description: 'Usuário que participa da conversa.',
    nullable: false,
    example: {
      id: '42',
      firstName: 'Douglas',
      lastName: 'Adams',
      email: 'douglasadams@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })
  user: User
}

export class ConversationSchemaResponse extends ConversationSchemaBody {
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
  messages: []
}

export class ConversationByUserSchemaResponse {
  @ApiProperty({
    type: Array,
    example: [{
      id: '123456789',
      user: {
        id: '42',
        firstName: 'Douglas',
        lastName: 'Adams',
        email: 'douglasadams@example.com',
      },
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }]
  })
  data: ConversationSchemaResponse[]
}