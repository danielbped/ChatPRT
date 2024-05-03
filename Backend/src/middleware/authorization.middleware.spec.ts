import { StatusCodes } from "http-status-codes"
import { NextFunction, Request, Response } from 'express'
import { Repository } from "typeorm"
import { AuthorizationMiddleware } from '../middleware/authorization.middleware'
import ErrorMessage from "../utils/ErrorMessage"
import User from "../entity/user.entity"
import Conversation from "../entity/conversation.entity"
import { mockConversationId, mockInvalidToken, mockUser, mockUserId } from "../utils/Mocks"
import Token from "../helper/token.helper"

describe('AuthorizationMiddleware', () => {
  let middleware: AuthorizationMiddleware
  let userRepositoryMock: Repository<User>
  let conversationRepositoryMock: Repository<Conversation>
  let token: Token

  token = new Token()
  const validToken = `Bearer ${token.generate(mockUser)}`

  beforeEach(() => {
    jest.clearAllMocks()

    userRepositoryMock = {
      findOne: jest.fn(),
    } as unknown as Repository<User>

    conversationRepositoryMock = {
      findOne: jest.fn(),
    } as unknown as Repository<Conversation>

    middleware = new AuthorizationMiddleware(userRepositoryMock, conversationRepositoryMock)
  })

  it('should return unauthorized if token is invalid', async () => {
    const req = { headers: { authorization: mockInvalidToken }, params: {  } } as unknown as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.InvalidToken })
  })

  it('should return bad request if id is not provided', async () => {
    const req = { headers: { authorization: validToken }, params: {  } } as unknown as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.IdNotFound })
  })

  it('should return not found if user or conversation is not found', async () => {
    userRepositoryMock.findOne = jest.fn().mockResolvedValueOnce(null)
    conversationRepositoryMock.findOne = jest.fn().mockResolvedValueOnce(null)

    const req = { params: { id: mockConversationId }, headers: { authorization: validToken } } as unknown as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.IdNotFound })
  })

  it('should return unauthorized if conversations does not belongs to logged user', async () => {
    conversationRepositoryMock.findOne = jest.fn().mockResolvedValueOnce({ user: { id: `${mockUserId}2` } })

    const req = { params: { id: mockConversationId }, headers: { authorization: validToken } } as unknown as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.Unauthorized })
  })

 it('should return unauthorized if user does not match logged user', async () => {
    userRepositoryMock.findOne = jest.fn().mockResolvedValueOnce({ id: `${mockUserId}2` })

    const req = { params: { id: mockConversationId }, headers: { authorization: validToken } } as unknown as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.Unauthorized })
  })

  it('should call next if user matches logged user', async () => {
    userRepositoryMock.findOne = jest.fn().mockResolvedValueOnce({ id: mockUserId })

    const req = { params: { id: mockConversationId }, headers: { authorization: validToken } } as unknown as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  it('should call next if conversation belongs to logged user', async () => {
    conversationRepositoryMock.findOne = jest.fn().mockResolvedValueOnce({ user: { id: mockUserId } })

    const req = { params: { id: mockConversationId }, headers: { authorization: validToken } } as unknown as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(next).toHaveBeenCalled()
  })
})
