import { Controller, Delete, Get, Post, Request } from '@nestjs/common'
import { ConversationService } from './conversation.service'
import Conversation from '../../entity/conversation.entity'
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ConversationByUserSchemaResponse, ConversationSchemaBody, ConversationSchemaResponse } from '../../schemas/conversation.schema'
import { StatusCodes } from 'http-status-codes'

@ApiBearerAuth()
@ApiTags('Conversas')
@Controller('conversation')
export class ConversationController {
  constructor (
    private readonly conversationService: ConversationService
  ) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Buscar conversas pelo id do usuário' })
  @ApiCreatedResponse({ status: StatusCodes.OK, description: 'Sucesso.' })
  @ApiResponse({ status: StatusCodes.UNAUTHORIZED, description: 'Usuário não autorizado.', type: ConversationByUserSchemaResponse })
  @ApiResponse({ status: StatusCodes.NOT_FOUND, description: 'Usuário não encontrada.' })
  @ApiResponse({ status: StatusCodes.BAD_REQUEST, description: 'Dados inválidos.' })
  getConversationsByUserId(@Request() req): Promise<Conversation[]> {
    const { id } = req.params
    return this.conversationService.getConversationsByUserId(id)
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova conversa' })
  @ApiBody({ type: ConversationSchemaBody })
  @ApiCreatedResponse({ status: StatusCodes.CREATED, description: 'Criado com sucesso.', type: ConversationSchemaResponse })
  @ApiResponse({ status: StatusCodes.UNAUTHORIZED, description: 'Usuário não autorizado.' })
  @ApiResponse({ status: StatusCodes.BAD_REQUEST, description: 'Dados inválidos.' })
  createConversation(@Request() req): Promise<Conversation> {
    const { user } = req.body
    return this.conversationService.createConversation({ user })
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deletar uma conversa' })
  @ApiCreatedResponse({ status: StatusCodes.OK, description: 'Deletado com sucesso.' })
  @ApiResponse({ status: StatusCodes.UNAUTHORIZED, description: 'Usuário não autorizado.' })
  @ApiResponse({ status: StatusCodes.BAD_REQUEST, description: 'Dados inválidos.' })
  @ApiResponse({ status: StatusCodes.NOT_FOUND, description: 'Conversa não encontrada.' })
  deleteConversation(@Request() req): Promise<void> {
    const { id } = req.params
    return this.conversationService.deleteConversation(id)
  }
}
