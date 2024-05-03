import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { MessageModule } from '../routes/message/message.module'
import { MessageService } from '../routes/message/message.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Message from '../entity/messages.entity'
import { OpenAiProvider } from '../provider/OpenAI.provider'
import { StatusCodes } from 'http-status-codes'
import { mockMessage, mockNewMessage, mockResponse } from '../utils/Mocks'

describe('E2E Message', () => {
  let app: INestApplication
  let messageService: MessageService
  let messageRepository: Repository<Message>
  let openAiProvider: OpenAiProvider

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MessageModule],
    })
      .overrideProvider(getRepositoryToken(Message))
      .useClass(Repository)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    messageService = moduleFixture.get<MessageService>(MessageService)
    messageRepository = moduleFixture.get<Repository<Message>>(getRepositoryToken(Message))
    openAiProvider = moduleFixture.get<OpenAiProvider>(OpenAiProvider)
  })

  it('/POST message', async () => {
    jest.spyOn(messageRepository, 'save').mockImplementation((message) => Promise.resolve(message as any))

    const mockCreate = jest.fn().mockImplementation(async () => (
      { choices: [ { message: { content: mockResponse } } ] })
    )

    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => 
        ({ chat: { completions: { create: mockCreate } } }) )
    })

    const response = await request(app.getHttpServer())
      .post('/message')
      .send(mockNewMessage)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toEqual({
      ...mockMessage,
      response: expect.any(String),
      id: expect.any(String),
      conversation: {
        ...mockMessage.conversation,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        user: {
          ...mockMessage.conversation.user,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        messages: expect.arrayContaining(
          mockMessage.conversation.messages.map((message) => ({
            ...message,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            conversation: {
              ...message.conversation,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              user: {
                ...message.conversation.user,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              },
            },
          }))
        ),
      },
    })
  })

  afterAll(async () => {
    await app.close()
  })
})