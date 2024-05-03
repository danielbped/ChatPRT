import { Test } from '@nestjs/testing'
import { MessageController } from './message.controller'
import { MessageService } from './message.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Request } from 'express'
import { mockMessage, mockNewMessage } from '../../utils/Mocks'
import Message from '../../entity/messages.entity'

describe('MessageController', () => {
  let messageController: MessageController
  let messageService: MessageService

  beforeEach(async () => {
    jest.clearAllMocks()

    const moduleRef = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(Message),
          useClass: Repository,
        },
      ],
    }).compile()

    messageService = moduleRef.get<MessageService>(MessageService)
    messageController = moduleRef.get<MessageController>(MessageController)
  })

  describe('createConversation', () => {
    it('should create a message', async () => {      
      const request = { body: mockNewMessage } as Partial<Request>

      const result = {
        ...mockMessage,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      jest.spyOn(messageService, 'createMessage').mockResolvedValue(result)

      expect(await messageController.createMessage(request)).toBe(result)
      expect(messageService.createMessage).toHaveBeenCalled()
      expect(messageService.createMessage).toHaveBeenCalledWith(mockNewMessage)
    })
  })
})
