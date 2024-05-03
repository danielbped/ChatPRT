import { ApiProperty } from '@nestjs/swagger'
import User from '../entity/user.entity'

export class LoginSchemaBody {
  @ApiProperty({
    type: String,
    description: 'E-mail do usuário.',
    nullable: false,
    example: 'douglasadams@email.com'
  })
  email: string
  @ApiProperty({
    type: String,
    description: 'Senha do usuário.',
    nullable: false,
    minLength: 8,
    example: 's3nh4_f0rt3'
  })
  password: string
}

export class LoginSchemaResponse {
  @ApiProperty({
    type: String,
    example: 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ'
  })
  token: string
  @ApiProperty({
    type: User,
    description: 'Usuário logado.',
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