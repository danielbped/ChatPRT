import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { ConversationModule } from '../routes/conversation/conversation.module'
import { ConversationService } from '../routes/conversation/conversation.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Conversation from '../entity/conversation.entity'
import { mockConversationsList, mockCreateConversationResponse } from '../utils/Mocks'
import { StatusCodes } from 'http-status-codes'

describe('E2E Conversation', () => {
  let app: INestApplication
  let conversationService: ConversationService
  let conversationRepository: Repository<Conversation>

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConversationModule],
    })
      .overrideProvider(getRepositoryToken(Conversation))
      .useClass(Repository)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    conversationService = moduleFixture.get<ConversationService>(ConversationService)
    conversationRepository = moduleFixture.get<Repository<Conversation>>(getRepositoryToken(Conversation))
  })

  it('/POST conversation', async () => {
    jest.spyOn(conversationRepository, 'save').mockImplementation((conversation) => Promise.resolve(conversation as any))

    const response = await request(app.getHttpServer())
      .post('/conversation')
      .send({ user: mockConversationsList[0].user })

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toEqual({
      ...mockCreateConversationResponse,
      id: expect.any(String),
      user: {
        ...mockCreateConversationResponse.user,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }
    })
  })

  it('/GET conversation', async () => {
    jest.spyOn(conversationRepository, 'find').mockResolvedValue(mockConversationsList)

    const response = await request(app.getHttpServer())
      .get('/conversation/1')

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toEqual([
      ...mockConversationsList.map((conversation) => ({
        ...conversation,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        user: {
          ...conversation.user,
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
        },
        messages: [
          ...conversation.messages.map((message) => {
            return {
              ...message,
              updatedAt: expect.any(String),
              createdAt: expect.any(String),
              conversation: {
                ...message.conversation,
                updatedAt: expect.any(String),
                createdAt: expect.any(String),
                user: {
                  ...message.conversation.user,
                  updatedAt: expect.any(String),
                  createdAt: expect.any(String)
                },
              }
            }
          })
        ]
      }))
    ])
  })

  it('/DELETE conversation', async () => {
    jest.spyOn(conversationRepository, 'delete').mockResolvedValue(undefined)

    const response = await request(app.getHttpServer())
      .get('/conversation/1')

    expect(response.status).toBe(StatusCodes.OK)
  })

  afterAll(async () => {
    await app.close()
  })
})