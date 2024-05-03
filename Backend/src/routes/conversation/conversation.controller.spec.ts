import { Test } from '@nestjs/testing'
import { ConversationController } from './conversation.controller'
import { ConversationService } from './conversation.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import Conversation from '../../entity/conversation.entity'
import { Repository } from 'typeorm'
import { Request } from 'express'
import { mockConversationId, mockConversationsList, mockNewConversation, mockUserId } from '../../utils/Mocks'

describe('ConversationController', () => {
  let conversationController: ConversationController
  let conversationService: ConversationService

  beforeEach(async () => {
    jest.clearAllMocks()

    const moduleRef = await Test.createTestingModule({
      controllers: [ConversationController],
      providers: [
        ConversationService,
        {
          provide: getRepositoryToken(Conversation),
          useClass: Repository,
        },
      ],
    }).compile()

    conversationService = moduleRef.get<ConversationService>(ConversationService)
    conversationController = moduleRef.get<ConversationController>(ConversationController)
  })

  describe('getConversationsByUserId', () => {
    it('should return a list of conversations of a specific user', async () => {
      const request = { params: { id: mockUserId } } as Partial<Request>

      jest.spyOn(conversationService, 'getConversationsByUserId').mockResolvedValue(mockConversationsList)

      expect(await conversationController.getConversationsByUserId(request)).toBe(mockConversationsList)
      expect(conversationService.getConversationsByUserId).toHaveBeenCalled()
      expect(conversationService.getConversationsByUserId).toHaveBeenCalledWith(mockUserId)
    })
  })

  describe('createConversation', () => {
    it('should create a conversation', async () => {
      const request = { body: mockNewConversation } as Partial<Request>
      const mockConversation = mockConversationsList[0]

      jest.spyOn(conversationService, 'createConversation').mockResolvedValue(mockConversation)

      expect(await conversationController.createConversation(request)).toBe(mockConversation)
      expect(conversationService.createConversation).toHaveBeenCalled()
      expect(conversationService.createConversation).toHaveBeenCalledWith(mockNewConversation)
    })
  })

  describe('deleteConversation', () => {
    it('should delete a conversation', async () => {
      const request = { params: { id: mockConversationId } } as Partial<Request>
      jest.spyOn(conversationService, 'deleteConversation').mockResolvedValue()

      expect(await conversationController.deleteConversation(request)).toBeUndefined()
      expect(conversationService.deleteConversation).toHaveBeenCalled()
      expect(conversationService.deleteConversation).toHaveBeenCalledWith(mockConversationId)
    })
  })
})
