import { StatusCodes } from "http-status-codes"
import { NextFunction, Request, Response } from 'express'
import ErrorMessage from "../utils/ErrorMessage"
import { Injectable, NestMiddleware } from "@nestjs/common"
import Token from "../helper/token.helper"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import User from "../entity/user.entity"
import Conversation from "../entity/conversation.entity"

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  private token: Token

  public constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {
    this.token = new Token()
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const token = req.headers.authorization
      const parsedToken = token.split(' ')[1]

      if (!parsedToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessage.InvalidToken })
      }

      if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: ErrorMessage.IdNotFound })
      }

      const user = await this.userRepository.findOne({ where: { id } })
      const conversation = await this.conversationRepository.findOne({ where: { id }, relations: ['user'] })

      if (!user && !conversation) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: ErrorMessage.IdNotFound })
      }

      const loggedUser = this.token.compare(parsedToken)

      if (!loggedUser) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessage.Unauthorized })
      }

      const isAuthorized = user ? loggedUser.id === user.id : loggedUser.id === conversation.user.id

      if (!isAuthorized) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessage.Unauthorized })
      }
     return next()
    } catch (err: any) {
      console.error(err)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message || ErrorMessage.InternalServerError })
    }
  }
}