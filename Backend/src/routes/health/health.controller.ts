import { Controller, Get } from '@nestjs/common'
import { HealthService } from './health.service'
import { HealthResponse } from '../../interface/response.interface'
import { ApiResponse } from '@nestjs/swagger'
import { StatusCodes } from 'http-status-codes'
import { HealthSchema } from '../../schemas/health.schema'

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiResponse({
    status: StatusCodes.OK,
    description: 'Retorna uma mensagem de "OK" caso a API esteja funcionando',
    type: HealthSchema
  })
  @Get()
  getHealth(): HealthResponse {
    return this.healthService.getHealth()
  }
}
