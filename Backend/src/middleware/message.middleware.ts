import { StatusCodes } from "http-status-codes"
import { NextFunction, Request, Response } from 'express'
import ErrorMessage from "../utils/ErrorMessage"
import { Injectable, NestMiddleware } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import Conversation from "../entity/conversation.entity"
import Token from "../helper/token.helper"

@Injectable()
export class MessageMiddleware implements NestMiddleware {
  private token: Token

  public constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {
    this.token = new Token()
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { conversation, content } = req.body
      
      const token = req.headers.authorization
      const parsedToken = token.split(' ')[1]

      if (!conversation || !content) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.MissingRequiredParameters,
        })
      }

      const conversationExists = await this.conversationRepository
        .findOne({ where: { id: conversation }, relations: ['user'] })

      if (!conversationExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.ConversationNotFound,
        })
      }

      const loggedUser = this.token.compare(parsedToken)
      
      if (!loggedUser) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessage.Unauthorized })
      }

      if (loggedUser.id !== conversationExists.user.id) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: ErrorMessage.Unauthorized,
        })
      }
  
      if (content.length <= 2) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.InvalidContent,
        })
      }
  
      return next()
    } catch (err: any) {
      console.error(err)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message || ErrorMessage.InternalServerError })
    }
  }
}