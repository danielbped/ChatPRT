import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { HealthService } from '../routes/health/health.service'
import { HealthModule } from '../routes/health/health.module'

describe('E2E Health', () => {
  let app: INestApplication
  let healthService: HealthService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()

    healthService = moduleRef.get<HealthService>(HealthService)
  })

  it('/GET health', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({
        message: healthService.getHealth().message,
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
