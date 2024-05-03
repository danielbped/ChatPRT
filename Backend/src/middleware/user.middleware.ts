import { StatusCodes } from "http-status-codes"
import { UserValidator } from "../helper/validator.helper"
import { NextFunction, Request, Response } from 'express'
import ErrorMessage from "../utils/ErrorMessage"
import { Injectable, NestMiddleware } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import User from "../entity/user.entity"
import { Repository } from "typeorm"

@Injectable()
export class UserMiddleware implements NestMiddleware {
  private validator: UserValidator

  public constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.validator = new UserValidator()
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password } = req.body

      if (!firstName || !lastName || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.MissingRequiredParameters,
        })
      }

      const userExists = await this.userRepository.findOne({ where: { email } })

      if (userExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.UserAlreadyExists,
        })
      }

      const validFirstName = this.validator.validateName(firstName)
      const validLastName = this.validator.validateName(lastName)
      const validName = validFirstName && validLastName
  
      if (!validName) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.InvalidName,
        })
      }
  
      if (!this.validator.validateEmail(email)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.InvalidEmail,
        })
      }
  
      if (!this.validator.validatePassword(password)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.InvalidPassword,
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