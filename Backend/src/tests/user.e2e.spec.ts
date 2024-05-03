import { INestApplication } from "@nestjs/common"
import { UserService } from "../routes/user/user.service"
import { Repository } from "typeorm"
import User from "../entity/user.entity"
import { getRepositoryToken } from "@nestjs/typeorm"
import { Test, TestingModule } from "@nestjs/testing"
import { UserModule } from "../routes/user/user.module"
import { StatusCodes } from "http-status-codes"
import * as request from 'supertest'
import { mockCreateUserResponse, mockLogin, mockLoginResponse, mockNewUser, mockUser } from "../utils/Mocks"

describe('E2E User', () => {
  let app: INestApplication
  let userService: UserService
  let userRepository: Repository<User>

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useClass(Repository)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    userService = moduleFixture.get<UserService>(UserService)
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User))
  })

  it('/POST user', async () => {
    jest.spyOn(userRepository, 'save').mockImplementation((user) => Promise.resolve(user as any))

    const response = await request(app.getHttpServer())
      .post('/user')
      .send(mockNewUser)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toEqual({
      ...mockCreateUserResponse,
      user: {
        ...mockCreateUserResponse.user,
        id: expect.any(String),
        password: null,
      },
      token: expect.any(String)
    })
  })

  it('/POST login', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser)
  
    const response = await request(app.getHttpServer())
      .post('/login')
      .send(mockLogin)
  
    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toEqual({
      token: expect.any(String),
      user: {
        ...mockLoginResponse.user,
        id: expect.any(String),
        password: null,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      },
    })
  })
})