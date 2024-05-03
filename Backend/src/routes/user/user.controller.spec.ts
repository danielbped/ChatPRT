import { Test } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import User from '../../entity/user.entity'
import { mockNewUser, mockLogin, mockLoginResponse, mockCreateUserResponse } from '../../utils/Mocks'
import { Request } from 'express'

describe('UserController', () => {
  let userController: UserController
  let userService: UserService

  beforeEach(async () => {
    jest.clearAllMocks()

    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile()

    userService = moduleRef.get<UserService>(UserService)
    userController = moduleRef.get<UserController>(UserController)
  })

  describe('createUser', () => {
    it('should create a new user', async () => {
      const request = { body: mockNewUser } as Partial<Request>

      jest.spyOn(userService, 'create').mockResolvedValue(mockCreateUserResponse)

      expect(await userController.create(request)).toBe(mockCreateUserResponse)
      expect(userService.create).toHaveBeenCalled()
      expect(userService.create).toHaveBeenCalledWith(mockNewUser)
    })
  })

  describe('login', () => {
    it('should return a token', async () => {
      const request = { body: mockLogin } as Partial<Request>

      jest.spyOn(userService, 'login').mockResolvedValue(mockLoginResponse)

      expect(await userController.login(request)).toBe(mockLoginResponse)
      expect(userService.login).toHaveBeenCalled()
      expect(userService.login).toHaveBeenCalledWith(mockLogin)
    })
  })
})