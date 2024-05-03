import { Test } from '@nestjs/testing'
import { HealthController } from './health.controller'
import { HealthService } from './health.service'
import { mockHealthResponse } from '../../utils/Mocks'

describe('HealthController', () => {
  let healthController: HealthController
  let healthService: HealthService

  beforeEach(async () => {
    jest.clearAllMocks()

    const moduleRef = await Test.createTestingModule({
        controllers: [HealthController],
        providers: [HealthService],
      }).compile()

    healthService = moduleRef.get<HealthService>(HealthService)
    healthController = moduleRef.get<HealthController>(HealthController)
  })

  describe('getHealth', () => {
    it('should return "OK" when aplication is running', async () => {
      jest.spyOn(healthService, 'getHealth').mockImplementation(() => mockHealthResponse)

      expect(healthController.getHealth()).toBe(mockHealthResponse)
    })
  })
})