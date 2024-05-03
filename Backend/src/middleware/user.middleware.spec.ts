import { Test, TestingModule } from '@nestjs/testing'
import { UserMiddleware } from './user.middleware'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ErrorMessage from '../utils/ErrorMessage'
import { Repository } from 'typeorm'
import User from '../entity/user.entity'
import { mockNewUser, mockWrongEmail, mockWrongName, mockWrongPassword } from '../utils/Mocks'

describe('UserMiddleware', () => {
  let middleware: UserMiddleware
  let mockUserRepository: Partial<Repository<User>>

  beforeEach(async () => {
    mockUserRepository = {
      findOne: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserMiddleware,
        { provide: 'UserRepository', useValue: mockUserRepository },
      ],
    }).compile()

    middleware = module.get<UserMiddleware>(UserMiddleware)
  })

  it('should return 400 if any required parameter is missing', async () => {
    const req = { body: {} } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.MissingRequiredParameters })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 400 if user already exists', async () => {
    const req = { body: mockNewUser } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    mockUserRepository.findOne = jest.fn().mockResolvedValue(mockNewUser)

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.UserAlreadyExists })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 400 if name is invalid', async () => {
    const req = { body: { ...mockNewUser, firstName: mockWrongName } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.InvalidName })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 400 if email is invalid', async () => {
    const req = { body: { ...mockNewUser, email: mockWrongEmail } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.InvalidEmail })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 400 if password is invalid', async () => {
    const req = { body: { ...mockNewUser, password: mockWrongPassword } } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.InvalidPassword })
    expect(next).not.toHaveBeenCalled()
  })

  it('should call next function if all checks pass', async () => {
    const req = { body: mockNewUser } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    mockUserRepository.findOne = jest.fn().mockResolvedValue(null)

    await middleware.use(req, res, next)

    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it('should handle internal server errors', async () => {
    const req = { body: mockNewUser } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    mockUserRepository.findOne = jest.fn().mockRejectedValue(new Error(ErrorMessage.InternalServerError))

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.InternalServerError })
    expect(next).not.toHaveBeenCalled()
  })
})
