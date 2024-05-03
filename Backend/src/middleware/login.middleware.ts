import { StatusCodes } from "http-status-codes"
import { NextFunction, Request, Response } from 'express'
import ErrorMessage from "../utils/ErrorMessage"
import { Injectable, NestMiddleware } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import User from "../entity/user.entity"
import { Repository } from "typeorm"
import PasswordHandler from "../helper/passwordHandler.helper"

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  private passwordHandler: PasswordHandler

  public constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.passwordHandler = new PasswordHandler()
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
  
      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.MissingRequiredParameters,
        })
      }

      const user = await this.userRepository.findOne({ where: { email } })

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ErrorMessage.UserNotFound,
        })
      }

      const validPassword = await this.passwordHandler.compare(password, user.password)

      if (!validPassword) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ErrorMessage.WrongPassword,
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