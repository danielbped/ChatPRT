import { Test, TestingModule } from '@nestjs/testing'
import { LoginMiddleware } from './login.middleware'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ErrorMessage from '../utils/ErrorMessage'
import { Repository } from 'typeorm'
import User from '../entity/user.entity'
import PasswordHandler from '../helper/passwordHandler.helper'
import { mockLogin, mockUser } from '../utils/Mocks'

describe('LoginMiddleware', () => {
  let middleware: LoginMiddleware
  let mockUserRepository: Partial<Repository<User>>
  let passwordHandler: PasswordHandler

  passwordHandler = new PasswordHandler()

  const password = passwordHandler.encode(mockUser.password)

  beforeEach(async () => {
    jest.clearAllMocks()

    mockUserRepository = {
      findOne: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginMiddleware,
        { provide: 'UserRepository', useValue: mockUserRepository },
      ],
    }).compile()

    middleware = module.get<LoginMiddleware>(LoginMiddleware)
  })

  it('should return 400 if email or password is missing', async () => {
    const req = { body: {} } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.MissingRequiredParameters })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 404 if user is not found', async () => {
    const req = { body: mockLogin } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    mockUserRepository.findOne = jest.fn().mockResolvedValue(null)

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.UserNotFound })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 403 if password is wrong', async () => {
    const req = { body: mockLogin } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    mockUserRepository.findOne = jest.fn().mockResolvedValue(mockUser)

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.FORBIDDEN)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.WrongPassword })
    expect(next).not.toHaveBeenCalled()
  })

  it('should call next function if email and password are correct', async () => {
    const req = { body: mockLogin } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    mockUserRepository.findOne = jest.fn().mockResolvedValue({ ...mockUser, password})

    await middleware.use(req, res, next)

    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it('should handle internal server errors', async () => {
    const req = { body: mockLogin } as Request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    const next = jest.fn() as NextFunction

    mockUserRepository.findOne = jest.fn().mockRejectedValue(ErrorMessage.InternalServerError)

    await middleware.use(req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ message: ErrorMessage.InternalServerError })
    expect(next).not.toHaveBeenCalled()
  })
})
