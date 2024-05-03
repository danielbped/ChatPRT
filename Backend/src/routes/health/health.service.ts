import { Injectable } from '@nestjs/common'
import { HealthResponse } from '../../interface/response.interface'

@Injectable()
export class HealthService {
  getHealth(): HealthResponse {
    return {
      message: 'OK'
    }
  }
}
