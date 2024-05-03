import { Test, TestingModule } from '@nestjs/testing'
import { MessageMiddleware } from './message.middleware'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ErrorMessage from '../utils/ErrorMessage'
import { Repository } from 'typeorm'
import Conversation from '../entity/conversation.entity'
import Token from '../helper/token.helper'
import { mockConversationId, mockNewMessage, mockUser, mockUserId } from '../utils/Mocks'

describe('MessageMiddleware', () => {
  let middleware: MessageMiddleware
  let mockConversationRepository: Partial<Repository<Conversation>>
  let token: Token

  token = new Token()
  const validToken = `Bearer ${token.generate(mockUser)}`

  beforeEach(async () => {
    mockConversationRepository = {
      findOne: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageMiddleware,
        { provide: 'ConversationRepository', useValue: mockConversationRepository },
      ],
    }).compile()

    middleware = module.get<MessageMiddleware>(MessageMiddleware)
  })

  it('should return 400 if conversation or content is missing', async () => {
    const req = { body: {}, headers: { authorization: validToken }  } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.MissingRequiredParameters })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 400 if conversation is not found', async () => {
    const req = { body: mockNewMessage, headers: { authorization: validToken } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    mockConversationRepository.findOne = jest.fn().mockResolvedValue(null)

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.ConversationNotFound })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 401 if logged user is not the owner of the conversation', async () => {
    const req = { body: mockNewMessage, headers: { authorization: validToken } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    const mockConversation = { user: { id: `${mockUserId}2` } } as Conversation
    mockConversationRepository.findOne = jest.fn().mockResolvedValue(mockConversation)

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.Unauthorized })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 400 if content length is lower than 2', async () => {
    const req = { body: { conversation: mockConversationId, content: 'aa' }, headers: { authorization: validToken } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    const mockConversation = { user: mockUser } as Conversation
    mockConversationRepository.findOne = jest.fn().mockResolvedValue(mockConversation)

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.InvalidContent })
    expect(next).not.toHaveBeenCalled()
  })

  it('should call next function if all checks pass', async () => {
    const req = { body: mockNewMessage, headers: { authorization: validToken } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    const mockConversation = { user: mockUser } as Conversation
    mockConversationRepository.findOne = jest.fn().mockResolvedValue(mockConversation)

    await middleware.use(req, res, next)

    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it('should handle internal server errors', async () => {
    const req = { body: mockNewMessage, headers: { authorization: validToken } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    mockConversationRepository.findOne = jest.fn().mockRejectedValue(ErrorMessage.InternalServerError)

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.InternalServerError })
    expect(next).not.toHaveBeenCalled()
  })
})
