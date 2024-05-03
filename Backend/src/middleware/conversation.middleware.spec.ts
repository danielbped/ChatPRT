import { Test, TestingModule } from '@nestjs/testing'
import { ConversationMiddleware } from './conversation.middleware'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ErrorMessage from '../utils/ErrorMessage'
import { Repository } from 'typeorm'
import Token from '../helper/token.helper'
import User from '../entity/user.entity'
import { mockUser, mockUserId } from '../utils/Mocks'

describe('ConversationMiddleware', () => {
  let middleware: ConversationMiddleware
  let mockUserRepository: Partial<Repository<User>>
  let token: Token

  token = new Token()
  const validToken = `Bearer ${token.generate(mockUser)}`

  beforeEach(async () => {
    jest.clearAllMocks()

    mockUserRepository = {
      findOne: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationMiddleware,
        { provide: 'UserRepository', useValue: mockUserRepository },
      ],
    }).compile()

    middleware = module.get<ConversationMiddleware>(ConversationMiddleware)
  })

  it('should return 400 if user is missing', async () => {
    const req = { body: {}, headers: { authorization: validToken } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.MissingRequiredParameters })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 400 if user is not found', async () => {
    const req = { body: { user: mockUserId }, headers: { authorization: validToken } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    mockUserRepository.findOne = jest.fn().mockResolvedValue(null)

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.ConversationNotFound })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 401 if token user does not match', async () => {
    const req = { body: { user: mockUserId }, headers: { authorization: validToken } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    const mockUser = { id: `${mockUserId}2` } as User
    mockUserRepository.findOne = jest.fn().mockResolvedValue(mockUser)

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.Unauthorized })
    expect(next).not.toHaveBeenCalled()
  })

  it('should call next function if token user matches', async () => {
    const req = { body: { user: mockUserId }, headers: { authorization: validToken } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    const mockUser = { id: mockUserId } as User
    mockUserRepository.findOne = jest.fn().mockResolvedValue(mockUser)

    await middleware.use(req, res, next)

    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it('should handle internal server errors', async () => {
    const req = { body: { user: mockUserId }, headers: { authorization: validToken } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    mockUserRepository.findOne = jest.fn().mockRejectedValue(new Error(ErrorMessage.InternalServerError))

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.InternalServerError })
    expect(next).not.toHaveBeenCalled()
  })
})
