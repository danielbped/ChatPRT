import { Controller, Post, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserResponse, LoginResponse } from '../../interface/response.interface'
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserSchemaBody, UserSchemaResponse } from '../../schemas/user.schema'
import { StatusCodes } from 'http-status-codes'
import { LoginSchemaBody, LoginSchemaResponse } from '../../schemas/login.schema'

@ApiTags('Usuários')
@Controller()
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  @Post('user')
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({ type: UserSchemaBody })
  @ApiCreatedResponse({ status: StatusCodes.CREATED, description: 'Criado com sucesso.', type: UserSchemaResponse })
  @ApiResponse({ status: StatusCodes.BAD_REQUEST, description: 'Dados inválidos.' })
  create(@Request() req): Promise<CreateUserResponse> {
    const { firstName, lastName, email, password } = req.body
    
    return this.userService.create({ firstName, lastName, email, password })
  }

  @Post('login')
  @ApiOperation({ summary: 'Realiza o login do usuário' })
  @ApiBody({ type: LoginSchemaBody })
  @ApiCreatedResponse({ status: StatusCodes.CREATED, description: 'Login realizado com sucesso.', type: LoginSchemaResponse })
  @ApiResponse({ status: StatusCodes.BAD_REQUEST, description: 'Dados inválidos.' })
  @ApiResponse({ status: StatusCodes.NOT_FOUND, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: StatusCodes.FORBIDDEN, description: 'Senha inválida.' })
  login(@Request() req): Promise<LoginResponse> {
    const { email, password } = req.body
    
    return this.userService.login({ email, password })
  }
}
