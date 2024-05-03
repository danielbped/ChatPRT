import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { config } from 'dotenv'
import { HealthController } from './routes/health/health.controller'
import { HealthService } from './routes/health/health.service'
import { UserController } from './routes/user/user.controller'
import { UserService } from './routes/user/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './routes/user/user.module'
import User from './entity/user.entity'
import { UserMiddleware } from './middleware/user.middleware'
import { LoginMiddleware } from './middleware/login.middleware'
import { ConversationController } from './routes/conversation/conversation.controller'
import Message from './entity/messages.entity'
import Conversation from './entity/conversation.entity'
import { ConversationModule } from './routes/conversation/conversation.module'
import { MessageModule } from './routes/message/message.module'
import { ConversationService } from './routes/conversation/conversation.service'
import { MessageController } from './routes/message/message.controller'
import { MessageService } from './routes/message/message.service'
import { AuthenticationMiddleware } from './middleware/authentication.middleware'
import { AuthorizationMiddleware } from './middleware/authorization.middleware'
import { MessageMiddleware } from './middleware/message.middleware'
import { ConversationMiddleware } from './middleware/conversation.middleware'
import { HealthModule } from './routes/health/health.module'

config()

const {
  MYSQL_DB_USER,
  MYSQL_DB_PASSWORD,
  MYSQL_DB_NAME,
  MYSQL_DB_HOST,
  MYSQL_DB_PORT
} = process.env

@Module({
  imports: [
    UserModule,
    ConversationModule,
    MessageModule,
    HealthModule,
    TypeOrmModule.forFeature([
      User,
      Message,
      Conversation
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: MYSQL_DB_HOST,
      port: Number(MYSQL_DB_PORT),
      username: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      database: MYSQL_DB_NAME,
      entities: [
        User,
        Message,
        Conversation
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [
    HealthController,
    UserController,
    ConversationController,
    MessageController,
  ],
  providers: [
    HealthService,
    UserService,
    MessageService,
    ConversationService,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST })

    consumer.apply(LoginMiddleware)
      .forRoutes({ path: 'login', method: RequestMethod.POST})

    consumer.apply(AuthenticationMiddleware)
      .forRoutes(
        'conversation',
        { path: 'message', method: RequestMethod.POST}
      )

    consumer.apply(AuthorizationMiddleware)
      .exclude({ path: 'conversation', method: RequestMethod.POST })
        .forRoutes('conversation/:id')

    consumer.apply(ConversationMiddleware)
      .forRoutes({ path: 'conversation', method: RequestMethod.POST })

    consumer.apply(MessageMiddleware)
      .forRoutes({ path: 'message', method: RequestMethod.POST})
  }
}