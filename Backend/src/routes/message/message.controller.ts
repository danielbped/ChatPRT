import { Controller, Post, Request } from '@nestjs/common'
import Message from '../../entity/messages.entity'
import { MessageService } from './message.service'
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { StatusCodes } from 'http-status-codes'
import { MessageSchemaBody, MessageSchemaResponse } from '../../schemas/message.schema'

@ApiBearerAuth()
@ApiTags('Mensagens')
@Controller('message')
export class MessageController {
  constructor (
    private readonly messageService: MessageService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova mensagem' })
  @ApiBody({ type: MessageSchemaBody })
  @ApiCreatedResponse({ status: StatusCodes.CREATED, description: 'Criado com sucesso.', type: MessageSchemaResponse })
  @ApiResponse({ status: StatusCodes.UNAUTHORIZED, description: 'Usuário não autorizado.' })
  @ApiResponse({ status: StatusCodes.BAD_REQUEST, description: 'Dados inválidos.' })
  @ApiResponse({ status: StatusCodes.INTERNAL_SERVER_ERROR, description: 'Erro interno do sistema.' })
  createMessage(@Request() req): Promise<Message> {
    const { conversation, content } = req.body
    return this.messageService.createMessage({ conversation, content })
  }
}
