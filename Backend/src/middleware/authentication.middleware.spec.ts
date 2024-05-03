import { Test, TestingModule } from '@nestjs/testing'
import { AuthenticationMiddleware } from './authentication.middleware'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ErrorMessage from '../utils/ErrorMessage'
import { mockInvalidToken, mockValidToken } from '../utils/Mocks'

describe('AuthenticationMiddleware', () => {
  let middleware: AuthenticationMiddleware

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationMiddleware],
    }).compile()

    middleware = module.get<AuthenticationMiddleware>(AuthenticationMiddleware)
  })

  it('should return 401 if token is missing', async () => {
    const req = { headers: {} } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.TokenNotFound })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 401 if token is invalid', async () => {
    const req = { headers: { authorization: mockInvalidToken } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.InvalidToken })
    expect(next).not.toHaveBeenCalled()
  })

  it('should call next function if token is valid', async () => {
    const req = { headers: { authorization: mockValidToken } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
})
