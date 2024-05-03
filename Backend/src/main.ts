import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cors from 'cors'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  const PORT = 3000

  const corsOptions = {
    origin: /(localhost)/,
    optionsSuccessStatus: 200,
    methods: 'GET, HEAD, PUT, POST, DELETE',
  }

  const config = new DocumentBuilder()
    .setTitle('ChatPRT')
    .setDescription('The ChatPRT API description')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  app.use(cors(corsOptions))

  await app.listen(PORT)
}
bootstrap()
