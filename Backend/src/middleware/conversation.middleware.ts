import { StatusCodes } from "http-status-codes"
import { NextFunction, Request, Response } from 'express'
import ErrorMessage from "../utils/ErrorMessage"
import { Injectable, NestMiddleware } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import Token from "../helper/token.helper"
import User from "../entity/user.entity"

@Injectable()
export class ConversationMiddleware implements NestMiddleware {
  private token: Token

  public constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.token = new Token()
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.body
      
      const token = req.headers.authorization
      const parsedToken = token.split(' ')[1]

      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.MissingRequiredParameters,
        })
      }

      const userExists = await this.userRepository.findOne({ where: { id: user } })

      if (!userExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.ConversationNotFound,
        })
      }

      const loggedUser = this.token.compare(parsedToken)

      if (!loggedUser) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessage.Unauthorized })
      }

      if (loggedUser.id !== userExists.id) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: ErrorMessage.Unauthorized,
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